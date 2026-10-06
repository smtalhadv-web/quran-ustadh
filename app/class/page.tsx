"use client";
import {useEffect,useMemo,useState} from "react";
import {useRouter} from "next/navigation";
import {BottomNav} from "@/components/bottom-nav";
import {QuranAyah,QuranService} from "@/lib/quran-service";
import {defaultStudent,Student} from "@/lib/student-store";
import {completeCurrentSession,getCurrentStudent} from "@/lib/student-repository";
import {getQuranClass,QuranClassConfig} from "@/lib/class-types";

type Phase="ready"|"listening"|"checking"|"mistake"|"corrected";

export default function ClassPage(){
 const router=useRouter();
 const [ayah,setAyah]=useState<QuranAyah|null>(null);
 const [phase,setPhase]=useState<Phase>("ready");
 const [student,setStudent]=useState<Student>(defaultStudent);
 const [classConfig,setClassConfig]=useState<QuranClassConfig>(getQuranClass("sabaq"));
 const [step,setStep]=useState(0);
 const [hidden,setHidden]=useState(false);
 const [selectedWord,setSelectedWord]=useState<string|null>(null);

 useEffect(()=>{
  const mode=new URLSearchParams(window.location.search).get("mode");
  setClassConfig(getQuranClass(mode));
  QuranService.getAyah("78:11").then(setAyah);
  getCurrentStudent().then(setStudent);
 },[]);

 const isHifz=classConfig.id==="hifz"||classConfig.id==="sabaq";
 const isWordMode=classConfig.id==="word_by_word"||classConfig.id==="nazirah";
 const message=useMemo(()=>{
  if(phase==="listening") return "سن رہا ہوں…";
  if(phase==="checking") return "تلاوت چیک کی جا رہی ہے…";
  if(phase==="mistake") return "یہ حصہ ایک مرتبہ دوبارہ پڑھیں۔";
  if(phase==="corrected") return "ماشاء اللہ، اب آگے بڑھیں۔";
  return classConfig.ustadhIntro;
 },[phase,classConfig]);

 const record=()=>{
  setPhase("listening");
  setTimeout(()=>{setPhase("checking");setTimeout(()=>setPhase("mistake"),900)},900);
 };
 const nextStep=()=>{setPhase("ready");setStep(v=>Math.min(v+1,classConfig.steps.length-1))};
 const finish=async()=>{
  if(!student.id){router.push("/login");return}
  await completeCurrentSession(student.id,classConfig.id,step+1);
  router.push("/progress");
 };

 return <main className="classShell">
  <header className="classHead">
   <div><span>{classConfig.title}</span><b>Surah An-Naba · 11</b></div>
   <button onClick={()=>router.push("/learn")}>Classes</button>
  </header>

  <div className="stepTrack">
   {classConfig.steps.map((label,i)=><div key={label} className={i===step?"step active":i<step?"step doneStep":"step"}><span>{i+1}</span><small>{label}</small></div>)}
  </div>

  <section className="teacher"><span>Ustadh · {classConfig.urduTitle}</span><p dir="rtl">{message}</p></section>

  <section className="mushaf classMushaf">
   <div className="ayahNo">١١</div>
   <div className="arabic">
    {ayah?.words.map((w,i)=>{
      const conceal=hidden&&isHifz&&i>0;
      const error=phase==="mistake"&&i===1;
      const corrected=phase==="corrected"&&i===1;
      const selected=selectedWord===w.id;
      return <button key={w.id} onClick={()=>isWordMode&&setSelectedWord(w.id)} className={"word "+(conceal?"hiddenWord ":"")+(error?"error ":"")+(corrected?"done ":"")+(selected?"selected ":"")}>{conceal?"••••":w.text}</button>
    })}
   </div>
  </section>

  {(isHifz||isWordMode)&&<div className="modeTools">
   {isHifz&&<button onClick={()=>setHidden(v=>!v)}>{hidden?"Show Quran":"Hide for Hifz"}</button>}
   {isWordMode&&<span>{selectedWord?"Selected word: "+selectedWord:"Tap a word to practice it"}</span>}
  </div>}

  <div className="lessonControls">
   <button onClick={()=>ayah?.audio&&new Audio(ayah.audio).play()}>▶ Reference</button>
   {phase==="mistake"
    ?<button className="mic" onClick={()=>setPhase("corrected")}>Repeat ✓</button>
    :<button className="mic" onClick={record}>🎙 {phase==="listening"?"Listening…":"Recite"}</button>}
   <button onClick={nextStep}>Next Step</button>
  </div>

  <button className="finishClass" onClick={finish}>Complete {classConfig.title} Class</button>
  <small className="mockLabel">Class structure and progress saving are real. Speech evaluation is still simulated until the Quran alignment engine is connected.</small>
  <BottomNav/>
 </main>
}