"use client";
import "../reg.css";
import Link from "next/link";
import { useState } from "react";
import {auth} from "../../../firebase/config";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            router.push('/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
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
                        <input required value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" name="email" type="email"></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type="password"></input>
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
            </div>
            <div className="background-img-login">
            </div>
        </div>
    )
}