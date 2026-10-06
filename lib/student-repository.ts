import {supabaseBrowser} from "./supabase";
import {defaultStudent,Student} from "./student-store";
import {QuranClassType} from "./class-types";

export async function getCurrentStudent():Promise<Student>{
 const sb=supabaseBrowser(); if(!sb) return defaultStudent;
 const {data:{user}}=await sb.auth.getUser(); if(!user) return defaultStudent;
 const {data}=await sb.from("students").select("id,name,age,preferred_language,learning_mode,current_surah,current_ayah,current_page,current_juz").eq("profile_id",user.id).limit(1).maybeSingle();
 if(!data) return {...defaultStudent,id:""};
 const {count}=await sb.from("lesson_sessions").select("id",{count:"exact",head:true}).eq("student_id",data.id).eq("status","completed");
 return {id:data.id,name:data.name,age:data.age??defaultStudent.age,language:data.preferred_language,mode:data.learning_mode,currentVerse:`${data.current_surah??78}:${data.current_ayah??11}`,currentPage:data.current_page??582,currentJuz:data.current_juz??30,streak:count??0,sessions:count??0};
}

export async function upsertCurrentStudent(s:Student){
 const sb=supabaseBrowser(); if(!sb) return null;
 const {data:{user}}=await sb.auth.getUser(); if(!user) return null;
 const [surah,ayah]=s.currentVerse.split(":").map(Number);
 const payload={profile_id:user.id,name:s.name,age:s.age,preferred_language:s.language,learning_mode:s.mode,current_surah:surah,current_ayah:ayah,current_page:s.currentPage,current_juz:s.currentJuz};
 if(s.id){return (await sb.from("students").update(payload).eq("id",s.id).select().single()).data}
 return (await sb.from("students").insert(payload).select().single()).data;
}

export async function completeCurrentSession(studentId:string,classType:QuranClassType,stepCount:number){
 const sb=supabaseBrowser(); if(!sb||!studentId) return;
 await sb.from("lesson_sessions").insert({
  student_id:studentId,
  class_type:classType,
  status:"completed",
  ended_at:new Date().toISOString(),
  lesson_plan:{target:"78:11-15",class_type:classType},
  summary:{mock_recitation:true,steps_completed:stepCount}
 });
 if(classType==="sabaq"||classType==="hifz"){
  await sb.from("students").update({current_surah:78,current_ayah:12}).eq("id",studentId);
 }
}