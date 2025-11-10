"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [messages, setMessages] = useState<{ id: string; content: string;name:string; createdAt: string }[]>([]);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
    const[name,setName]=useState("");




  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/messages", {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.status === 200) {
        const data = await res.json();
        setMessages(data.messages);
        setName(data.name);
        setAuthorized(true);
      } else {
        alert("Wrong password!");
      }
    } catch (err) {
      console.error(err);
    }
  }






 async function handleDeleteMessage(id: string) {
    if (!confirm("Delete this message?"))
       return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete message");
      }
    } catch (err) {
      console.error(err);
    }
  }



  if (!authorized) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 bg-black text-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-white bg-transparent text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-black text-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">All Messages</h1>

      <ul className="space-y-4">
        {messages.length === 0 ? (
          <li className="text-center text-gray-300">No messages yet</li>
        ) : (
          messages.map((msg) => (
            <li
              key={msg.id}
              className="border border-white/40 p-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              <p className="text-lg">{msg.content}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
              <p className="mt-1 font-semibold text-gray-300">By: {msg.name}</p>

              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="mt-3 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition-all duration-200"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
