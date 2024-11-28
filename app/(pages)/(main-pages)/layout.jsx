'use client'
import Nav from "../../components/nav"
import localFont from "next/font/local"
import "../../globals.css"
import { useEffect, useState } from "react";
import {auth, app} from '../../firebase/config'
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";


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
  const db = getFirestore(app);
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const getData = async(uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUserName(docSnap.data().name);
  }


  useEffect(() => {
    if (user) {
      const uid = user.uid;
      getData(uid);
    } else {
      router.push("/login")
    }
  }, [])

  return (
      <section>
        <Nav name = {userName}/>
        <div className="content">{children}</div>
      </section>
  )


}
