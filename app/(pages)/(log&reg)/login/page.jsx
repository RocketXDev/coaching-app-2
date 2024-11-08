"use client";
import "../reg.css";
import Link from "next/link";
import { useState } from "react";
import {auth} from "../../../firebase/config";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import {errorInvalidPswd, errorInvalidEmail, errorMissingPswd, errorOther} from "../error-codes"


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorCode, setErrorCode] = useState("");

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

    return (
        <div className="reg-main">
            <div className="form-container">
                <div className="main-logo-login">
                    <img src="/images/logo_transparent.png" alt="logo" />
                </div>
                <form method="POST">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" name="email" type="email"></input>
                    </div>
                    {errorCode === errorInvalidEmail ? <div className="error-msg">Invalid Email</div> : ""}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type="password"></input>
                    </div>
                    {(errorCode === errorMissingPswd || errorCode === errorInvalidPswd) ? <div className="error-msg">Invalid Password</div> : ""}
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
            </div>
            <div className="background-img-login">
            </div>
        </div>
    )
}