"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="p-4 w-11/12 flex mx-auto justify-center place-items-center">
        <span className="px-4 py-2 h-11">Loading...</span>
      </div>
    );
  }

  if (status === "authenticated") {
    console.log(session.user);
    return (
      <div className="flex flex-row p-6 w-11/12 mx-auto justify-between place-items-center">
        <div className="flex flex-row gap-2 text-xl font-bold place-items-center">
          <img
            className="h-11 rounded-full shadow-2xl/100"
            src={session.user?.image}
            alt="Profile Picture"
          />
          <p className="text-shadow-lg">{session.user?.name}</p>
        </div>
        <button
          className="flex rounded px-3 py-2 h-10 gap-2 text-black text-lg cursor-pointer bg-slate-200 hover:scale-105 transition-all"
          onClick={() => signOut()}
        >
          <p className="hidden md:block lg:block">Sign Out</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7046/7046204.png"
            alt=""
          />
        </button>
      </div>
    );
  } else {
    return (
      <div className="p-4 w-11/12 mx-auto justify-center place-items-center">
        <button
          className="flex felx-row rounded px-4 py-2 h-11 text-black text-xl cursor-pointer gap-2 bg-gray-50 hover:scale-105 transition-all"
          onClick={() => signIn("slack")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
            alt="Slack Logo"
          />
          <p>Sign In</p>
        </button>
      </div>
    );
  }
}
