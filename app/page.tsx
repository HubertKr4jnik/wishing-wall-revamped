"use client";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Note from "./note";
import AddNote from "./addNote";
import axios from "axios";
import InfoPopup from "./infoPopup";

export default function Home() {
  const [addingVisible, setAddingVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await axios.get("/api/notes/getAll");
      setNotes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="h-screen bg-[url(https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg)] bg-no-repeat bg-cover">
      <Navbar />
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 md:flex-wrap lg:flex-wrap content-start m-auto h-10/12 w-11/12 p-6 bg-[url(https://img.freepik.com/premium-vector/seamless-background-with-corkboard-texture-corkboard-pinning-notes-todo-lists-photos_314759-1706.jpg)] rounded-xl shadow-2xl/100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              noteKey={note._id}
              title={note.title}
              desc={note.desc}
              username={note.username}
              profileURL={note.profileURL}
            />
          );
        })}
        <div
          className="flex justify-center place-items-center h-12 w-12 absolute bottom-5 right-5 rounded-xl bg-slate-100 shadow-2xl/100 cursor-pointer hover:scale-110 transition-all"
          onClick={() => setAddingVisible(true)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            alt=""
            className="h-6"
          />
        </div>
      </div>
      {addingVisible ? <AddNote setAddingVisible={setAddingVisible} /> : null}
    </div>
  );
}
