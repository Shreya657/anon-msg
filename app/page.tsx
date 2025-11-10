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
   <div className="max-w-3xl mx-auto mt-22 p-6 bg-black text-white rounded-2xl shadow-lg">
  <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6 pb-10">
    Anonymous Message Board ♾️
  </h1>

  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
    <input
      type="text"
      placeholder="Enter your pseudo name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full border-2 border-white rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
    />

    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Type your message here..."
      className="w-full border-2 border-white rounded-xl p-3 text-base h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
    />

    <button
      type="submit"
      disabled={loading}
      className={`w-28 mx-auto text-black bg-white font-medium py-2 rounded-xl transition-all duration-200 ${
        loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-black hover:bg-gray-800"
      }`}
    >
      {loading ? "Sending..." : "Send"}
    </button>
  </form>
</div>

  );
}
