import localFont from "next/font/local"
import "../../globals.css";
import Register from "./register/page";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

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

export default function LoginAndRegistrationLayout({ children }) {
  return (
      <section>
        <div>{children}</div>
      </section>
  )
}
