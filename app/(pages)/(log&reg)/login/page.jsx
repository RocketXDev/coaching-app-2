"use client";
import "../auth.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import {auth} from "../../../firebase/config";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import {errorInvalidPswd, errorInvalidEmail, errorMissingPswd, errorOther} from "../error-codes"


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(error ? 'password-icon' : 'password-icon-error');
    const router = useRouter();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            router.push('/home');
        })
        .catch((error) => {
            setErrorCode(error.code);
            console.log(errorCode);
        })
    }

    const handleForgotPassword = () => {

        const sendResetPassword = (e) => {
            e.preventDefault();
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setForgotPassword(!forgotPassword);
                router.push('/login')
            })
            .catch((error) => {
                setErrorCode(error.code);
                setError(false);
                console.log(errorCode);
            })
        }

        return (
            <div className="reset-password-wrapper">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" name="email" type="email"></input>
                </div>
                <div className="password-info reset-password">
                    <button className=" log_reg-button" onClick={(e)=> {sendResetPassword(e)}} >Send reset password link</button>
                    <a onClick={()=> {setForgotPassword(!forgotPassword)}} className="password-restore-link">Come back to log in</a>
                </div>
            </div>
 
        )
    }

    return (
        <div className="reg-main">
            <div className="form-container">
                <div className="main-logo-login">
                    <img src="/images/logo_transparent.png" alt="logo" />
                </div>
                {forgotPassword ?
                    <form className="forgot-password-window" method="POST">
                        {handleForgotPassword()}
                    </form>:
                    <form className="initial-login" method="POST">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" name="email" type="email"></input>
                        </div>
                        {errorCode === errorInvalidEmail ? <div className="error-msg">Invalid Email</div> : ""}
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type={showPassword ? "text" : "password"}></input>
                            <img onClick={()=>{setShowPassword(!showPassword)}} className={passwordIcon} src="/images/hide.png" alt="show-password-icon" />
                        </div>
                        {(errorCode === errorMissingPswd || errorCode === errorInvalidPswd) ?  <div className="error-msg">Invalid Password</div> : ''}
                        <div className="password-info">
                            <a onClick={()=> {setForgotPassword(!forgotPassword)}} className="password-restore-link">Forgot password?</a>
                        </div>
                        <div className="login-info">
                        <button className="log_reg-button" onClick={()=>{handleLogin()}} type="button"> Log in</button>
                        <div className="register-link">New here? 
                                        <Link
                                            href="/register"
                                            className="link">
                                            Create account
                                        </Link>
                        </div>
                        </div>

                    </form>
                } 

            </div>
            <div className="background-img-login">
            </div>
        </div>
    )
}