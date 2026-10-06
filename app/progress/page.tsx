"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {BottomNav} from "@/components/bottom-nav";
import {defaultStudent,loadStudent,Student} from "@/lib/student-store";
export default function Progress(){const[s,setS]=useState<Student>(defaultStudent);useEffect(()=>setS(loadStudent()),[]);
return <main className="shell"><header className="pageHead"><h1>Progress</h1><p>Learning history, not arcade points.</p></header>
<section className="progressHero"><span>Classes completed</span><strong>{s.sessions}</strong><p>Current position · {s.currentVerse}</p></section>
<section className="card"><div><span className="eyebrow">Revision</span><h3>Weak passage</h3><p>78:12 · repeat next class</p></div><Link href="/class">Practice</Link></section>
<section className="card"><div><span className="eyebrow">Attendance</span><h3>{s.streak} study days</h3><p>Keep the routine steady.</p></div></section><BottomNav/></main>}