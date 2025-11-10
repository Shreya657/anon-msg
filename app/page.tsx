"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const[content,setContent]=useState("")
  const[loading,setLoading]=useState(false);
  const[name,setName]=useState("");
 

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    if(!content.trim()){
      return;
    }
    setLoading(true);
    try{
      const res=await fetch("/api/admin/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({content,name})
      })

      const data=await res.json()

      if(!data.error){
        setContent("");
        setName("")
        
      }else{
        alert(data.error);
      }
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }
  return (
 <div className="min-h-screen flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-lg bg-black text-white rounded-2xl shadow-2xl p-6 sm:p-10 backdrop-blur-md bg-opacity-90">
    <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
      Anonymous Message Board ♾️
    </h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        type="text"
        placeholder="Enter your pseudo name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border-2 border-white/60 rounded-xl p-3 text-base bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here..."
        className="w-full border-2 border-white/60 rounded-xl p-3 text-base h-32 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-white"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-32 mx-auto text-black bg-white font-semibold py-2 rounded-xl transition-all duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "hover:bg-gray-200 hover:scale-105"
        }`}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  </div>
</div>


  );
}
