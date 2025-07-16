"use client";
import axios from "axios";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AddNotePopup({ setAddingVisible }) {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingVisible(false);
    try {
      let userId, username, profileURL;
      if (session?.user) {
        userId = session.user.slackId;
        username = session.user.name;
        profileURL = session.user.image;
      }
      const response = await axios.post("/api/notes/add", {
        title,
        desc,
        userId,
        username,
        profileURL,
      });
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div
        className="absolute h-screen w-full top-0 left-0 bg-black/[.5]"
        onClick={() => setAddingVisible(false)}
      ></div>
      <div className="w-10/12 h-fit md:w-2/3 md:h-1/2 lg:w-1/2 lg:h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 px-12 py-6 rounded-xl text-black">
        <form className="h-full w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="mx-auto flex gap-2 place-items-center pb-4">
            <img
              src="https://me.micahrl.com/blog/sparkles-emoji-dot-ico/sparkles.svg"
              alt=""
              className="h-8"
            />
            <h1 className="font-bold text-xl md:text-2xl lg:text-2xl">
              Make a wish
            </h1>
            <img
              src="https://me.micahrl.com/blog/sparkles-emoji-dot-ico/sparkles.svg"
              alt=""
              className="h-8"
            />
          </div>
          <label htmlFor="noteTitleInput" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name=""
            id="noteTitleInput"
            autoComplete="off"
            className="h-10 border-2 border-slate-400 rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="noteDescInput" className="font-bold">
            Description
          </label>
          <textarea
            name=""
            id="noteDescInput"
            className="h-35 border-2 border-slate-400 rounded mb-4 resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="flex rounded px-4 my-2 h-10 w-fit mx-auto font-bold text-black text-lg border border-slate-400 cursor-pointer bg-slate-100 hover:scale-105 transition-all"
          />
        </form>
      </div>
    </>
  );
}
