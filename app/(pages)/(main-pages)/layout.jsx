'use client'
import Nav from "../../components/nav"
import localFont from "next/font/local"
import "../../globals.css"
import { useEffect, useState } from "react";
import profileImg from "../../../public/images/profile.jpeg"
import {auth} from '../../firebase/config'
import { useRouter } from "next/navigation";


const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function MainLayout({ children }) {

  const user = auth.currentUser;

  const router = useRouter();

  useEffect(() => {
    if (user) {
    } else {
      router.push("/login")
    }
  }, [])

  return (
      <section>
        <Nav/>
        <div className="content">{children}</div>
      </section>
  )


}
