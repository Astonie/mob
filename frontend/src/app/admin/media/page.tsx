"use client";
import { useState } from "react";
export default function MediaAdmin(){
  const [msg,setMsg]=useState<string|null>(null);
  async function upload(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); const fd=new FormData(e.currentTarget); const t=localStorage.getItem("cms_token"); if(!t){setMsg("Not auth");return;}
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/media/upload`,{method:"POST",headers:{Authorization:`Bearer ${t}`,Accept:"application/json"},body:fd});
    const j=await res.json(); if(!res.ok){setMsg(JSON.stringify(j));return;} setMsg(`Uploaded ${j.data.original_name} → ${j.data.path}`);
  }
  return <div><h1 className="font-serif text-xl font-bold">Media Library</h1><p className="text-sm text-slate-600 mt-1">Upload validates mime (jpg/png/webp/pdf/doc) max 10MB → MediaAsset (public disk) with folder, alt, metadata.</p><form onSubmit={upload} className="mt-4 border bg-white p-4 flex gap-2"><input name="file" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" className="flex-1 border px-3 py-2 text-sm" required/><input name="folder" placeholder="folder" defaultValue="general" className="border px-3 py-2 text-sm"/><button className="h-10 px-5 bg-slate-900 text-white text-sm">Upload</button></form>{msg&&<div className="mt-4 text-sm border p-3 bg-slate-50">{msg}</div>}<div className="mt-6 border border-dashed p-8 text-center text-sm text-slate-500">Media grid would list from GET /api/v1/admin/media (not yet paginated UI) — storage via S3/MinIO compatible.</div></div>;
}
