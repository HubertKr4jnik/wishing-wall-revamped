"use client";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="h-screen bg-[url(https://img.freepik.com/free-photo/dark-brown-wood-texture-background-with-design-space_53876-160410.jpg)] bg-no-repeat bg-cover">
      <Navbar />
      <div className="m-auto h-10/12 w-11/12 bg-[url(https://img.freepik.com/premium-vector/seamless-background-with-corkboard-texture-corkboard-pinning-notes-todo-lists-photos_314759-1706.jpg)] rounded-xl shadow-2xl/100 border-4 border-stone-700"></div>
    </div>
  );
}
