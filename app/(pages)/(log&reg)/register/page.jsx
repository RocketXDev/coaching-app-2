'use client'
import Link from "next/link";
import "../auth.css";
import { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth, app} from "../../../firebase/config";
import { useRouter } from "next/navigation";
import {errorExistingUser, errorInvalidPswd, errorInvalidEmail, errorMissingPswd, errorMissingEmail} from "../error-codes";
import { doc, setDoc, getFirestore, Timestamp } from "firebase/firestore"; 
import Alert from "../../../components/Alert";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState('password-icon password-icon-reg');
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
        if (userName != '') {
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
    }

    const throwError = (errorMsg) => {

        return (
            <div className="alert alert-reg">
                <Alert name={errorMsg}/>
            </div>
        )

    }

    return (
        <div className="reg-main">
                <div className="main-logo-register">
                    <img src="/images/logo_transparent.png" alt="logo" />
                </div>
                {errorCode === errorExistingUser ? throwError("User with this email already exists") : ""}
                {(errorCode === errorInvalidEmail || errorCode === errorMissingEmail) ? throwError("Invalid or missing email") : ""}
                {userName === '' ? throwError("Name cannot be empty") : ""}
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
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" name="password" type={showPassword ? "text" : "password"}></input>
                            <img onClick={()=>{setShowPassword(!showPassword)}} className={passwordIcon} src="/images/hide.png" alt="show-password-icon" />
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