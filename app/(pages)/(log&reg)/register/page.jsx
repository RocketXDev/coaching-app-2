'use client'
import Link from "next/link";
import "../auth.css";
import { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth, app} from "../../../firebase/config";
import { useRouter } from "next/navigation";
import {errorExistingUser, errorInvalidPswd, errorInvalidEmail, errorMissingPswd} from "../error-codes";
import { doc, setDoc, getFirestore, Timestamp } from "firebase/firestore"; 

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const db = getFirestore(app);

    const createUserAccount = async(userUid) => {
        const docRef = await setDoc(doc(db, "users", userUid), {
            uid: userUid,
            name: userName,
            email: email,
            creationDate: Timestamp.now()
        }, {merge: true});
    }

    const handleRegistration = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            createUserAccount(user.uid);
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
                <div>
                        <label htmlFor="name">Name:</label>
                        <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} id="name" name="name" type="text"></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" name="email" type="email"></input>
                    </div>
                    {(errorCode === errorExistingUser) ? <div className="error-msg">Invalid Email</div> : ""}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type={showPassword ? "text" : "password"}></input>
                        <img onClick={()=>{setShowPassword(!showPassword)}} className="password-icon password-icon-reg" src="/images/hide.png" alt="show-password-icon" />
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