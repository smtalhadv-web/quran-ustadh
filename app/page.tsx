"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {BottomNav} from "@/components/bottom-nav";
import {defaultStudent,loadStudent,Student} from "@/lib/student-store";
export default function Home(){
 const [s,setS]=useState<Student>(defaultStudent);
 useEffect(()=>setS(loadStudent()),[]);
 return <main className="shell">
  <header className="top"><div><small>السلام عليكم</small><h1>{s.name}</h1></div><div className="avatar">{s.name[0]}</div></header>
  <section className="hero">
   <span className="eyebrow">Today's Quran Class</span>
   <h2>Surah An-Naba</h2><p>Sabaq · Ayah 11–15</p>
   <div className="lessonGrid"><div><b>Sabqi</b><span>Ayah 1–10</span></div><div><b>Manzil</b><span>Surah Al-Mulk</span></div></div>
   <Link className="primary" href="/class">Start Quran Class</Link>
  </section>
  <section className="stats"><div><b>{s.streak}</b><span>Day streak</span></div><div><b>{s.sessions}</b><span>Classes</span></div><div><b>7:00 PM</b><span>Next class</span></div></section>
  <section className="card"><div><span className="eyebrow">Continue Quran</span><h3>Juz {s.currentJuz} · Page {s.currentPage}</h3></div><Link href="/quran">Open</Link></section>
  <section className="card"><div><span className="eyebrow">Revision Due</span><h3>1 weak ayah</h3><p>Review before new Sabaq</p></div><Link href="/class">Review</Link></section>
  <BottomNav/>
 </main>
}