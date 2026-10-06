import type {Metadata,Viewport} from "next";
import "./globals.css";
export const metadata:Metadata={title:"Quran Ustadh AI",description:"A Quran teacher who remembers me.",manifest:"/manifest.webmanifest"};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#0b5d4b"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}