"use client";
import axios from "axios";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AddNotePopup({
  setAddingVisible,
  getNotes,
  setInfoPopupVisible,
  setInfoPopupText,
  setInfoPopupSuccess,
}) {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSlackMessage = async (
    userId: string,
    noteId: string,
    imageURL: string,
    productLink: string
  ) => {
    try {
      const response = await axios.post("/api/slack/postMessage", {
        title,
        desc,
        userId,
        noteId,
        imageURL,
        productLink,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formData = new FormData();
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const preformattedDesc = desc.split(linkRegex);
  let links: any = [];

  preformattedDesc.forEach((section) => {
    if (linkRegex.test(section)) {
      links.push(section);
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (title.length > 0 && desc.length > 0 && !formSubmitted) {
      setFormSubmitted(true);
      try {
        let userId, username, profileURL;
        if (session?.user) {
          userId = session.user.slackId;
          username = session.user.name;
          profileURL = session.user.image;
        }

        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("userId", userId);
        if (username) {
          formData.append("username", username);
        }
        if (profileURL) {
          formData.append("profileURL", profileURL);
        }
        if (file) {
          formData.append("file", file);
        }

        const response = await axios.post("/api/notes/add", formData);
        getNotes();
        setAddingVisible(false);
        sendSlackMessage(
          userId,
          response.data._id.toString(),
          response.data.imageURL,
          links[0]
        );
        setInfoPopupVisible(true);
        setInfoPopupSuccess(true);
        setInfoPopupText("Added note successfully");
        setFormSubmitted(false);
        console.log(response);
      } catch (err) {
        console.error(err);
        setInfoPopupVisible(true);
        setInfoPopupSuccess(false);
        setInfoPopupText("Error adding note");
      }
    } else if (formSubmitted) {
      setInfoPopupVisible(true);
      setInfoPopupSuccess(false);
      setInfoPopupText("Don't spam");
    } else {
      setInfoPopupVisible(true);
      setInfoPopupSuccess(false);
      setInfoPopupText("Please provide a title and description");
    }
  };
  return (
    <>
      <div
        className="absolute h-screen w-full top-0 left-0 bg-black/[.5]"
        onClick={() => setAddingVisible(false)}
      ></div>
      <div className="w-10/12 h-fit md:w-2/3 md:h-1/2 lg:w-1/2 lg:h-1/2 min-h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 px-12 py-6 rounded-xl text-black">
        <form
          className="h-full min-h-fit w-full flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mx-auto flex gap-2 place-items-center pb-4">
            <div className="relative h-8 aspect-square">
              <Image
                src="https://me.micahrl.com/blog/sparkles-emoji-dot-ico/sparkles.svg"
                alt=""
                className="h-full"
                fill
              />
            </div>
            <h1 className="font-bold text-xl md:text-2xl lg:text-2xl">
              Make a wish
            </h1>
            <div className="relative h-8 aspect-square">
              <Image
                src="https://me.micahrl.com/blog/sparkles-emoji-dot-ico/sparkles.svg"
                alt=""
                className="h-full"
                fill
              />
            </div>
          </div>
          <label htmlFor="noteTitleInput" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name=""
            id="noteTitleInput"
            autoComplete="off"
            maxLength={50}
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
            maxLength={200}
            className="h-35 min-h-30 border-2 mb-3 border-slate-400 rounded resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="file"
            id="noteImageInput"
            onChange={(e) => setFile(e.target.files[0])}
            className="font-bold cursor-pointer underline decoration-slate-400 decoration-2"
          />
          <input
            type="submit"
            value={formSubmitted ? "Loading..." : "Submit"}
            className="flex rounded px-4 my-2 h-10 w-fit mx-auto font-bold text-black text-lg border border-slate-400 cursor-pointer bg-slate-100 hover:scale-105 transition-all"
          />
        </form>
      </div>
    </>
  );
}
