'use client'
import Nav from "../../components/Nav";
import localFont from "next/font/local"
import "../../globals.css"
import { Suspense, useEffect, useState } from "react";
import {auth, app} from '../../firebase/config'
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import LoadingPage from "../../components/LoadingPage";
import "../(main-pages)/css/homePage.css";
import "../(main-pages)/css/schedulePage.css";


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
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      setLoadPage(true);
      getName(uid);
    } else {
      router.push("/login");
    }
  }, [])

  const getName = async(uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUserName(docSnap.data().name);
  }

  return (
      <section>
        {loadPage ?
        <Suspense fallback = {<LoadingPage />}>
          <>
            <Nav name = {userName}/>
            <div className="content">{children}</div>
          </>
        </Suspense> :
        <LoadingPage/>
        } 
      </section>
  )


}
