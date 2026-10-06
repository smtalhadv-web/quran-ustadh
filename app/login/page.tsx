"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
import {supabaseBrowser} from "@/lib/supabase";
export default function LoginPage(){
 const router=useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [name,setName]=useState(""); const [mode,setMode]=useState<"login"|"signup">("login"); const [msg,setMsg]=useState("");
 async function submit(e:FormEvent){e.preventDefault();const sb=supabaseBrowser();if(!sb){setMsg("Supabase is not configured.");return}
 setMsg("Please wait...");
 if(mode==="signup"){const {error}=await sb.auth.signUp({email,password,options:{data:{display_name:name||"Student"}}});if(error){setMsg(error.message);return}setMsg("Account created. Check your email if confirmation is enabled.");}
 else {const {error}=await sb.auth.signInWithPassword({email,password});if(error){setMsg(error.message);return}router.push("/");router.refresh();}
 }
 return <main className="shell"><header className="pageHead"><h1>{mode==="login"?"Sign in":"Create account"}</h1><p>Your Quran progress stays with your account.</p></header>
 <form className="formCard" onSubmit={submit}>{mode==="signup"&&<label>Name<input value={name} onChange={e=>setName(e.target.value)} required/></label>}
 <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
 <label>Password<input type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} required/></label>
 <button className="primary" type="submit">{mode==="login"?"Sign in":"Create account"}</button>
 <button type="button" onClick={()=>setMode(mode==="login"?"signup":"login")}>{mode==="login"?"Create an account":"I already have an account"}</button>
 {msg&&<p>{msg}</p>}</form></main>
}