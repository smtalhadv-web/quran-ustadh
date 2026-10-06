"use client";
import {FormEvent,useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import {BottomNav} from "@/components/bottom-nav";
import {defaultStudent,loadStudent,saveStudent} from "@/lib/student-store";
export default function Onboarding(){
 const router=useRouter(); const [s,setS]=useState(defaultStudent);
 useEffect(()=>setS(loadStudent()),[]);
 function submit(e:FormEvent){e.preventDefault();saveStudent(s);router.push("/")}
 return <main className="shell"><header className="pageHead"><h1>Student Profile</h1><p>Your Ustadh will remember this progress.</p></header>
 <form className="formCard" onSubmit={submit}>
  <label>Name<input value={s.name} onChange={e=>setS({...s,name:e.target.value})}/></label>
  <label>Age<input type="number" value={s.age} onChange={e=>setS({...s,age:Number(e.target.value)})}/></label>
  <label>Language<select value={s.language} onChange={e=>setS({...s,language:e.target.value as typeof s.language})}><option>Urdu</option><option>English</option><option>Arabic</option></select></label>
  <label>Learning mode<select value={s.mode} onChange={e=>setS({...s,mode:e.target.value as typeof s.mode})}><option>Nazirah</option><option>Hifz</option><option>Both</option></select></label>
  <button className="primary" type="submit">Save Profile</button>
 </form><BottomNav/></main>
}