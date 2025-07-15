"use client";
import Navbar from "./navbar";
import Note from "./note";

export default function Home() {
  return (
    <div className="h-screen bg-[url(https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg)] bg-no-repeat bg-cover">
      <Navbar />
      <div
        className="m-auto h-10/12 w-11/12 p-6 bg-[url(https://img.freepik.com/premium-vector/seamless-background-with-corkboard-texture-corkboard-pinning-notes-todo-lists-photos_314759-1706.jpg)] rounded-xl shadow-2xl/100 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <div className="flex justify-center place-items-center h-12 w-12 absolute bottom-5 right-5 rounded-xl bg-amber-50 shadow-2xl/100 cursor-pointer hover:scale-110 transition-all">
          <img
            className="h-6"
            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
