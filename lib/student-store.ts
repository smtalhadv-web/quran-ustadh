export type Student={id:string;name:string;age:number;language:"Urdu"|"English"|"Arabic";mode:"Nazirah"|"Hifz"|"Both";currentVerse:string;currentPage:number;currentJuz:number;streak:number;sessions:number};
const KEY="quran-ustadh-student-v2";
export const defaultStudent:Student={id:"local-student",name:"Hamdan",age:7,language:"Urdu",mode:"Both",currentVerse:"78:11",currentPage:582,currentJuz:30,streak:0,sessions:0};
export function loadStudent():Student{if(typeof window==="undefined")return defaultStudent;try{return {...defaultStudent,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return defaultStudent}}
export function saveStudent(s:Student){localStorage.setItem(KEY,JSON.stringify(s))}
export function completeSession(s:Student){const next={...s,sessions:s.sessions+1,streak:s.streak+1,currentVerse:"78:12"};saveStudent(next);return next}