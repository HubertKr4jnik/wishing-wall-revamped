"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

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
    return (
      <div className="flex flex-row p-6 w-11/12 mx-auto justify-between place-items-center">
        <div className="flex flex-row gap-2 text-xl font-bold place-items-center">
          <div className="relative h-11 aspect-square">
            <Image
              src={session.user?.image as any}
              alt="Profile Picture"
              className="h-full rounded-full shadow-2xl/100"
              fill
            />
          </div>
          <p className="text-shadow-lg">{session.user?.name}</p>
        </div>
        <button
          className="flex rounded px-3 py-2 h-10 gap-2 text-black text-lg cursor-pointer bg-slate-100 hover:scale-105 transition-all"
          onClick={() => signOut()}
        >
          <p className="hidden md:block lg:block">Sign Out</p>
          <div className="relative h-full aspect-square">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/7046/7046204.png"
              alt=""
              className="h-full"
              fill
            />
          </div>
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
          <div className="relative h-full aspect-square">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
              alt="Slack Logo"
              className="h-full"
              fill
            />
          </div>
          <p>Sign In</p>
        </button>
      </div>
    );
  }
}
