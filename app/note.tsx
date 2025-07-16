"use client";

export default function Note({ title, desc, username, profileURL, noteKey }) {
  let randomRotate = 0;
  let random = Math.floor(Math.random() * 100);
  if (random <= 33) {
    randomRotate = 359;
  }
  if (random > 33 && random <= 66) {
    randomRotate = 1;
  }
  return (
    <div
      className={`min-w-fit max-w-full min-h-fit max-h-full bg-amber-200 text-black p-4 shadow-xl/50 resize-x overflow-auto flex-auto rotate-${randomRotate}`}
      onClick={() => console.log(noteKey)}
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
          <p className="text-xl">7</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2589/2589197.png"
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
          />
        </div>
      </div>
    </div>
  );
}
