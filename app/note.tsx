"use client";
import axios from "axios";
import { use, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Note({
  noteId,
  title,
  desc,
  username,
  profileURL,
  _likes,
  _likedBy,
}) {
  const { data: session, status } = useSession();
  const [rotaion, setRotation] = useState("rotate-[0deg]");
  const generateRotation = () => {
    let random = Math.floor(Math.random() * 100);
    if (random <= 33) {
      setRotation("rotate-[-0.5deg]");
    }
    if (random > 33 && random <= 66) {
      setRotation("rotate-[0.5deg]");
    }
  };
  generateRotation();

  const [likedBy, setLikedBy] = useState(_likedBy);

  let heartImageURL = "https://cdn-icons-png.flaticon.com/512/2589/2589197.png";
  if (likedBy.includes(session?.user.slackId)) {
    heartImageURL = "https://cdn-icons-png.flaticon.com/512/2589/2589054.png";
  }

  const [likes, setLikes] = useState(_likes);
  const handleLikeUpdate = async (e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/2589/2589054.png";
    const userId = session?.user.slackId;
    const response = await axios.post("/api/notes/like", {
      noteId,
      userId,
    });
    setLikes(response.data.likes);
  };
  return (
    <div
      className={`min-w-fit max-w-full min-h-fit max-h-full bg-amber-200 text-black p-4 shadow-xl/50 resize-x overflow-auto flex-auto ${rotaion} hover:scale-102 ease-in-out transition-all`}
      onMouseEnter={() => generateRotation()}
    >
      <h2 className="font-bold text-xl">{title}</h2>
      <p className="pb-3 wrap-anywhere">{desc}</p>
      <div className="flex flex-row justify-between place-items-center gap-x-4">
        <div className="flex flex-row gap-2 justify-center place-items-center">
          <img
            src={profileURL}
            alt="Profile Picture"
            className="h-10 rounded-full shadow-2xl/100"
          />
          <p className="flex place-items-center">{username}</p>
        </div>
        <div className="flex flex-row gap-1 justify-center place-items-center">
          <p className="text-xl">{likes}</p>
          {heartImageURL ==
          "https://cdn-icons-png.flaticon.com/512/2589/2589197.png" ? (
            <img
              src={heartImageURL}
              alt=""
              className="h-7 cursor-pointer hover:scale-110 transition-all"
              onMouseOver={(e) =>
                (e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/2589/2589054.png")
              }
              onMouseOut={(e) =>
                (e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/2589/2589197.png")
              }
              onClick={(e) => handleLikeUpdate(e)}
            />
          ) : (
            <img
              src={heartImageURL}
              alt=""
              className="h-7 hover:scale-110 transition-all"
              onClick={(e) => handleLikeUpdate(e)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
