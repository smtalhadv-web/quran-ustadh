export type QuranClassType="nazirah"|"hifz"|"sabaq"|"sabqi"|"manzil"|"revision"|"recitation"|"word_by_word";
export type QuranClassConfig={
 id:QuranClassType;
 title:string;
 urduTitle:string;
 description:string;
 badge:string;
 steps:string[];
 ustadhIntro:string;
};
export const QURAN_CLASSES:QuranClassConfig[]=[
 {id:"nazirah",title:"Nazirah",urduTitle:"ناظرہ",description:"Read accurately from the Mushaf with guided correction.",badge:"Reading",steps:["Listen","Word reading","Phrase reading","Full ayah","Final check"],ustadhIntro:"آج ہم ناظرہ پڑھیں گے۔ پہلے آیت سنیں، پھر دیکھ کر آہستہ آہستہ پڑھیں۔"},
 {id:"hifz",title:"Hifz",urduTitle:"حفظ",description:"Memorize new Quran with listen, repeat, hide and recall.",badge:"Memorization",steps:["Listen twice","Repeat phrases","Read while looking","Partial hide","Full hide","Memory recitation"],ustadhIntro:"آج ہم نیا سبق یاد کریں گے۔ پہلے آیت دو مرتبہ سنیں، پھر میرے ساتھ دہرائیں۔"},
 {id:"sabaq",title:"Daily Sabaq",urduTitle:"روزانہ سبق",description:"Learn today's new memorization passage.",badge:"New lesson",steps:["Previous sabaq","New ayah listen","Phrase repetition","Combine ayah","Recite from memory","Final sabaq"],ustadhIntro:"آج پہلے کل کا سبق سنیں گے، پھر نیا سبق شروع کریں گے۔"},
 {id:"sabqi",title:"Sabqi",urduTitle:"سبقی",description:"Review recent memorized lessons before they become weak.",badge:"Recent revision",steps:["Warm-up","Continuous recitation","Weak ayahs","Repeat errors","Final run"],ustadhIntro:"اب سبقی سنائیں۔ کوشش کریں بغیر رکے مسلسل پڑھیں۔"},
 {id:"manzil",title:"Manzil",urduTitle:"منزل",description:"Long-term Quran revision for older memorized portions.",badge:"Long revision",steps:["Start passage","Fluency check","Weak passage review","Second run","Complete manzil"],ustadhIntro:"اب منزل سنائیں۔ رفتار معتدل رکھیں اور جہاں شک ہو وہاں رک کر دوبارہ پڑھیں۔"},
 {id:"revision",title:"Revision",urduTitle:"دہرائی",description:"Adaptive review of due and weak ayahs.",badge:"Smart review",steps:["Due ayahs","Weak words","Weak ayahs","Mixed test","Review complete"],ustadhIntro:"آج ہم کمزور آیات اور الفاظ کی دہرائی کریں گے۔"},
 {id:"recitation",title:"Recitation Practice",urduTitle:"تلاوت کی مشق",description:"Practice fluent Quran recitation with live listening.",badge:"Practice",steps:["Prepare","Recite","Check pauses","Repeat difficult part","Finish"],ustadhIntro:"آج آزاد تلاوت کی مشق کریں گے۔ بسم اللہ پڑھ کر شروع کریں۔"},
 {id:"word_by_word",title:"Word by Word",urduTitle:"لفظ بہ لفظ",description:"Learn difficult words one by one with focused repetition.",badge:"Foundation",steps:["Select word","Listen","Repeat","Verify","Next word","Full ayah"],ustadhIntro:"آج لفظ بہ لفظ پڑھیں گے۔ ہر لفظ پہلے سنیں، پھر واضح طور پر دہرائیں۔"}
];
export function getQuranClass(id:string|null|undefined){
 return QURAN_CLASSES.find(c=>c.id===id)??QURAN_CLASSES[2];
}