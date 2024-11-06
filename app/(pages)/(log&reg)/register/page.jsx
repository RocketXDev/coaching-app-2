'use client'
import Link from "next/link";
import "../reg.css";
import { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../firebase/config";
import { useRouter } from "next/navigation";
import {errorExistingUser, errorInvalidPswd, errorInvalidEmail, errorMissingPswd} from "../error-codes";



export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorCode, setErrorCode] = useState("");

    const router = useRouter();

    const handleRegistration = () => {
        createUserWithEmailAndPassword(auth, email, password)
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
                <div className="main-logo-register">
                    <img src="/images/logo_transparent.png" alt="logo" />
                </div>
            <div className="form-container form-container-register">
                <form>
                    {/* <div>
                        <label htmlFor="name">Name:</label>
                        <input autoComplete="off" id="name" name="name" type="text"></input>
                    </div> */}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input autoComplete="off" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" name="email" type="email"></input>
                    </div>
                    {(errorCode === errorExistingUser) ? <div className="error-msg">Invalid Email</div> : ""}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type="password"></input>
                    </div>
                    {(errorCode === errorMissingPswd || errorCode === errorInvalidPswd) ? <div className="error-msg">Invalid Password</div> : ""}
                    <div className="login-info">
                        <button className="log_reg-button" onClick={()=>{handleRegistration()}} type="button"> Register</button>
                        <div className="register-link">Already registered? 
                                        <Link
                                            href="/login"
                                            className="link">
                                            Login
                                        </Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="background-img-register"></div>
        </div>
    )
}