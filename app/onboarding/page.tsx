"use client";
import {FormEvent,useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import {BottomNav} from "@/components/bottom-nav";
import {defaultStudent} from "@/lib/student-store";
import {getCurrentStudent,upsertCurrentStudent} from "@/lib/student-repository";

export default function Onboarding(){
 const router=useRouter(); const [s,setS]=useState(defaultStudent); const [saving,setSaving]=useState(false);
 useEffect(()=>{getCurrentStudent().then(setS)},[]);
 async function submit(e:FormEvent){e.preventDefault();setSaving(true);const saved=await upsertCurrentStudent(s);setSaving(false);if(!saved){router.push("/login");return}router.push("/")}
 return <main className="shell"><header className="pageHead"><h1>Student Profile</h1><p>Your Ustadh will remember this progress.</p></header>
 <form className="formCard" onSubmit={submit}>
  <label>Name<input value={s.name} onChange={e=>setS({...s,name:e.target.value})}/></label>
  <label>Age<input type="number" value={s.age} onChange={e=>setS({...s,age:Number(e.target.value)})}/></label>
  <label>Language<select value={s.language} onChange={e=>setS({...s,language:e.target.value as typeof s.language})}><option>Urdu</option><option>English</option><option>Arabic</option></select></label>
  <label>Learning mode<select value={s.mode} onChange={e=>setS({...s,mode:e.target.value as typeof s.mode})}><option>Nazirah</option><option>Hifz</option><option>Both</option></select></label>
  <button className="primary" type="submit" disabled={saving}>{saving?"Saving…":"Save Profile"}</button>
 </form><BottomNav/></main>
}