"use client";
import Link from "next/link";
import {BottomNav} from "@/components/bottom-nav";
import {QURAN_CLASSES} from "@/lib/class-types";

export default function LearnPage(){
 return <main className="shell">
  <header className="pageHead"><h1>Quran Classes</h1><p>Choose the class your Ustadh should teach now.</p></header>
  <section className="classGrid">
   {QURAN_CLASSES.map(c=><Link key={c.id} className="classCard" href={"/class?mode="+c.id}>
    <div><span className="classBadge">{c.badge}</span><h2>{c.title}</h2><strong dir="rtl">{c.urduTitle}</strong><p>{c.description}</p></div>
    <span className="classArrow">›</span>
   </Link>)}
  </section>
  <BottomNav/>
 </main>
}