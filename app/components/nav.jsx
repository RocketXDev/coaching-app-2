import Image from "next/image";
import Link from "next/link";
import "../components/nav.css";
import "../globals.css";
import { signOut } from "firebase/auth";
import {auth} from '../firebase/config';
import { useRouter } from "next/navigation";

export default function Nav(props) {

    const router = useRouter();

    const handleSignOut = () => {
        signOut(auth).then(()=>{
            router.push('/login');
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <nav className="nav">
            <div className="nav-logo">
                <img src="/images/logo_transparent.png" alt="logo" />
            </div>
            <div className="profile-wrapper-main">
                <div className="profile">
                    <div className="profile-pic-wrapper">
                        <Image 
                            className="profile-pic"
                            src="/images/def-profile-male.png" 
                            alt="profile-pic" 
                            width="60"
                            height="75"
                        />
                    </div>
                    <div className="">{props.name}</div>
                </div>
                <div className="menu">
                    <ul className="menu-options">
                        <Link className="link" href="/home">
                            <li className="option">
                                Home
                            </li>
                        </Link>
                        <Link className="link" href="/schedule">
                            <li className="option">
                                Schedule
                            </li>
                        </Link>
                        <Link className="link" href="/billing">
                            <li className="option">
                                Billing
                            </li>
                        </Link>
                        <Link className="link" href="/settings">
                            <li className="option">
                                Settings
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className="sign-out">
                <button className="sign_out-button" onClick={()=>{handleSignOut()}} type="button">Sign out</button>
            </div>
        </nav>
    )
}