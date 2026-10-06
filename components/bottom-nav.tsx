"use client";
import Link from "next/link";
export function BottomNav(){return <nav className="bottomNav" aria-label="Main navigation">
 {[
  ["/","Home"],["/quran","Quran"],["/learn","Learn"],["/progress","Progress"],["/onboarding","Profile"]
 ].map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
 </nav>}