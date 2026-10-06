"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {supabaseBrowser} from "@/lib/supabase";
export function AccountBar(){const[signed,setSigned]=useState(false);
 useEffect(()=>{const sb=supabaseBrowser();sb?.auth.getUser().then(({data})=>setSigned(Boolean(data.user)))},[]);
 async function logout(){const sb=supabaseBrowser();await sb?.auth.signOut();location.href="/login"}
 return signed?<button onClick={logout}>Sign out</button>:<Link href="/login">Sign in</Link>
}