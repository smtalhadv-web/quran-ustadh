"use client";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import {BottomNav} from "@/components/bottom-nav";
import {QuranAyah,QuranService} from "@/lib/quran-service";
import {defaultStudent,Student} from "@/lib/student-store";
import {completeCurrentSession,getCurrentStudent} from "@/lib/student-repository";

type Phase="ready"|"listening"|"checking"|"mistake"|"corrected";
export default function ClassPage(){
 const router=useRouter();const [ayah,setAyah]=useState<QuranAyah|null>(null);const [phase,setPhase]=useState<Phase>("ready");const [student,setStudent]=useState<Student>(defaultStudent);
 useEffect(()=>{QuranService.getAyah("78:11").then(setAyah);getCurrentStudent().then(setStudent)},[]);
 const record=()=>{setPhase("listening");setTimeout(()=>{setPhase("checking");setTimeout(()=>setPhase("mistake"),900)},900)};
 const finish=async()=>{if(!student.id){router.push("/login");return}await completeCurrentSession(student.id);router.push("/progress")};
 const message={ready:"پہلے آیت سنیں، پھر بسم اللہ پڑھ کر شروع کریں۔",listening:"سن رہا ہوں…",checking:"تلاوت چیک کی جا رہی ہے…",mistake:"یہ حصہ ایک مرتبہ دوبارہ پڑھیں۔",corrected:"ماشاء اللہ، اب پوری آیت دوبارہ سنائیں۔"}[phase];
 return <main className="classShell">
  <header className="classHead"><div><span>Today's class</span><b>Surah An-Naba · 11</b></div><button onClick={finish}>End</button></header>
  <section className="teacher"><span>Ustadh</span><p dir="rtl">{message}</p></section>
  <section className="mushaf classMushaf"><div className="arabic">{ayah?.words.map((w,i)=><span key={w.id} className={phase==="mistake"&&i===1?"word error":phase==="corrected"&&i===1?"word done":"word"}>{w.text}</span>)}</div></section>
  <div className="lessonControls">
   <button onClick={()=>ayah?.audio&&new Audio(ayah.audio).play()}>▶ Reference</button>
   {phase==="mistake"?<button className="mic" onClick={()=>setPhase("corrected")}>Repeat word ✓</button>:<button className="mic" onClick={record}>🎙 {phase==="listening"?"Listening…":"Recite"}</button>}
   <button onClick={finish}>Complete</button>
  </div>
  <small className="mockLabel">Recitation evaluation is still simulated; saved session data is real.</small>
  <BottomNav/>
 </main>
}