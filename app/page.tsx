"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Note from "./note";
import AddNotePopup from "./addNotePopup";
import axios from "axios";
import InfoPopup from "./infoPopup";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const [addingVisible, setAddingVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [infoPopupVisible, setInfoPopupVisible] = useState(false);
  const [infoPopupText, setInfoPopupText] = useState("");
  const [infopopupSuccess, setInfoPopupSuccess] = useState(true);

  const getNotes = async () => {
    try {
      const response = await axios.get("/api/notes/getAll");
      setNotes(response.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="h-svh bg-[url(https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg)] bg-no-repeat bg-cover">
      <Navbar />
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 md:flex-wrap lg:flex-wrap m-auto h-10/12 w-11/12 px-8 py-6 bg-[url(https://img.freepik.com/premium-vector/seamless-background-with-corkboard-texture-corkboard-pinning-notes-todo-lists-photos_314759-1706.jpg)] rounded-xl shadow-2xl/100 overflow-y-auto md:justify-center lg:justify-center [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {notes.map((note: any) => {
          return (
            <Note
              key={note._id}
              noteId={note._id}
              title={note.title}
              desc={note.desc}
              username={note.username}
              userId={note.userId}
              profileURL={note.profileURL}
              _likes={note.likes}
              _likedBy={note.likedBy}
              _imageURL={note.imageURL}
              setInfoPopupVisible={setInfoPopupVisible}
              setInfoPopupText={setInfoPopupText}
              setInfoPopupSuccess={setInfoPopupSuccess}
              getNotes={getNotes}
            />
          );
        })}
        {status === "authenticated" ? (
          <div
            className="flex justify-center place-items-center h-12 w-12 absolute bottom-5 right-5 rounded-xl bg-slate-100 shadow-2xl/100 cursor-pointer hover:scale-110 transition-all"
            onClick={() => setAddingVisible(true)}
          >
            <div className="relative h-6 aspect-square">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                alt=""
                className="h-full"
                fill
              />
            </div>
          </div>
        ) : null}
      </div>
      {addingVisible ? (
        <AddNotePopup
          setAddingVisible={setAddingVisible}
          getNotes={getNotes}
          setInfoPopupVisible={setInfoPopupVisible}
          setInfoPopupText={setInfoPopupText}
          setInfoPopupSuccess={setInfoPopupSuccess}
        />
      ) : null}
      {infoPopupVisible ? (
        <InfoPopup
          text={infoPopupText}
          success={infopopupSuccess}
          setInfoPopupVisible={setInfoPopupVisible}
        />
      ) : null}
    </div>
  );
}
