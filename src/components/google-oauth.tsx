"use client";
import { useEffect, useState } from "react";

export const GoogleOAuth = () => {
  const [events, setEvents] = useState([])
  const [click, setClick] = useState(false)

  useEffect(() => {
    require("preline");
  }, []);

  useEffect(() => {

    if(!click) return

    const authWithGoogle = async () => {
      const response = await fetch('/api/google')
      if(response.ok){
        console.log("fetch ok");
      }
      const jsonData = await response.json();
      location.href = jsonData.authorizeUrl
    }

    authWithGoogle()

  }, [click]);

  return (
    <div className="p-5">

      <button
        type="button"
        onClick={() => setClick(true)}
        className="py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-blue-500">
        Google OAuth 認証する
      </button>
    </div>
  );
};
