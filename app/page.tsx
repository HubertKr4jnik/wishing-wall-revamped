// import Image from "next/image";
"use client";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Home() {
  const {data: session, status} = useSession()

  if (status === "loading") {
    return <span>Loading...</span>
  }

  if (status === "authenticated") {
    return (
      <>
        <p>Logged in as {session.user?.name}</p>
        <input type="button" value="Logout" onClick={() => signOut()}/>
      </>
    )
  }
  else{
    return <input type="button" value="Sign In" onClick={() => signIn("slack")}/>
  }
}
