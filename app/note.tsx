"use client";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface NoteProps {
  noteId: string;
  title: string;
  desc: string;
  username: string;
  userId: string;
  profileURL: string;
  _likes: number;
  _likedBy: Array<string>;
  _imageURL: string;
  setInfoPopupVisible: Function;
  setInfoPopupText: Function;
  setInfoPopupSuccess: Function;
  getNotes: Function;
}

export default function Note({
  noteId,
  title,
  desc,
  username,
  userId,
  profileURL,
  _likes,
  _likedBy,
  _imageURL,
  setInfoPopupVisible,
  setInfoPopupText,
  setInfoPopupSuccess,
  getNotes,
}: NoteProps) {
  const { data: session, status } = useSession();
  const [rotaion, setRotation] = useState("rotate-[0deg]");
  const [imageURL, setImageURL] = useState(_imageURL);
  const [isLiking, setIsLiking] = useState(false);

  const generateRotation = () => {
    let random = Math.floor(Math.random() * 100);
    if (random <= 33) {
      setRotation("rotate-[-0.5deg]");
    }
    if (random > 33 && random <= 66) {
      setRotation("rotate-[0.5deg]");
    }
  };

  useEffect(() => {
    generateRotation();
  }, []);

  const [likedBy, setLikedBy] = useState(_likedBy);
  const [heartImageURL, setHeartImageURL] = useState(
    "https://cdn-icons-png.flaticon.com/512/2589/2589197.png"
  );

  const [likes, setLikes] = useState(_likes);

  useEffect(() => {
    if (session?.user && likedBy.includes((session?.user as any).slackId)) {
      setHeartImageURL(
        "https://cdn-icons-png.flaticon.com/512/2589/2589054.png"
      );
    } else {
      setHeartImageURL(
        "https://cdn-icons-png.flaticon.com/512/2589/2589197.png"
      );
    }
  }, [session?.user, likedBy]);

  const handleLikeUpdate = async () => {
    if (isLiking) {
      return;
    }
    setIsLiking(true);
    if (status === "authenticated") {
      const userId = (session?.user as any).slackId;
      const response = await axios.post("/api/notes/like", {
        noteId,
        userId,
      });
      setLikes(response.data.likes);
      setLikedBy(response.data.likedBy);
      setIsLiking(false);
    } else {
      setInfoPopupVisible(true);
      setInfoPopupSuccess(false);
      setInfoPopupText("Please Sign in to like");
    }
  };
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const preformattedDesc = desc.split(linkRegex);

  const handleNoteDelete = async () => {
    try {
      const response = await axios.post("/api/notes/delete", {
        noteId,
      });
      getNotes();
      setInfoPopupVisible(true);
      setInfoPopupSuccess(true);
      setInfoPopupText("Successfully deleted note");
    } catch (err) {
      setInfoPopupVisible(true);
      setInfoPopupSuccess(false);
      setInfoPopupText("Error deleting note");
      console.error(err);
    }
  };
  return (
    <div
      className={`relative max-w-full md:max-w-[45%] lg:max-w-[45%] min-w-1/6 min-h-fit max-h-fit my-auto bg-amber-200 text-black p-4 shadow-xl/50 resize-x overflow-auto flex-auto ${rotaion} hover:scale-102 ease-in-out transition-all`}
      onMouseEnter={() => generateRotation()}
    >
      {session?.user.slackId === userId ||
      session?.user.slackId === "U07Q4K6RHM5" ? (
        <div className="absolute h-5 aspect-square z-[1] top-3 right-3">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2891/2891771.png"
            alt="Profile Picture"
            className="h-full hover:scale-110 cursor-pointer transition-all"
            fill
            onClick={handleNoteDelete}
          />
        </div>
      ) : null}
      <div
        className={`relative h-30 mask-b-to-90% bg-center bg-contain bg-no-repeat`}
        style={{ backgroundImage: `url(${imageURL})` }}
      ></div>
      <h2 className="font-bold text-xl wrap-anywhere">{title}</h2>
      <p className="pb-2 wrap-anywhere">
        {preformattedDesc.map((section, index) => {
          if (linkRegex.test(section)) {
            return (
              <a
                key={index}
                href={section}
                target="_blank"
                className="text-blue-600 underline"
              >
                {section}
              </a>
            );
          } else {
            return section;
          }
        })}
      </p>
      <div className="flex flex-row justify-between place-items-center gap-x-4">
        <div className="flex flex-row gap-2 justify-center place-items-center">
          <div className="relative h-10 aspect-square">
            <Image
              src={profileURL}
              alt="Profile Picture"
              className="h-full rounded-full"
              fill
            />
          </div>
          <p className="flex place-items-center">{username}</p>
        </div>
        <div className="flex flex-row gap-1 justify-center place-items-center">
          <p className="text-xl">{likes}</p>
          <div className="relative h-7 aspect-square">
            <Image
              src={heartImageURL}
              alt="Profile Picture"
              className="h-full hover:scale-110 transition-all cursor-pointer"
              fill
              onClick={handleLikeUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
