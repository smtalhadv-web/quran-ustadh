"use client";
import {useEffect,useState} from "react";
import {BottomNav} from "@/components/bottom-nav";
import {QuranAyah,QuranService} from "@/lib/quran-service";
export default function Quran(){
 const [ayah,setAyah]=useState<QuranAyah|null>(null);const [selected,setSelected]=useState<string>();
 useEffect(()=>{QuranService.getAyah("78:11").then(setAyah)},[]);
 return <main className="shell"><header className="pageHead"><h1>Quran</h1><p>Surah An-Naba · 78:11</p></header>
 <section className="mushaf"><div className="ayahNo">١١</div><div className="arabic">{ayah?.words.map(w=><button key={w.id} onClick={()=>setSelected(w.id)} className={selected===w.id?"word selected":"word"}>{w.text}</button>)}</div></section>
 <section className="player"><button onClick={()=>ayah?.audio&&new Audio(ayah.audio).play()}>▶ Listen to Ayah</button><span>{selected?"Word selected":"Tap a word"}</span></section>
 <BottomNav/></main>
}