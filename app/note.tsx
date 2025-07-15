"use client";

export default function Note({ title, desc, username, profileURL, noteKey }) {
  return (
    <div
      className="w-full h-fit bg-amber-200 text-black p-4 shadow-xl/50 mb-6"
      onClick={() => console.log(noteKey)}
    >
      <h2 className="font-bold text-xl">{title}</h2>
      <p className="pb-2">{desc}</p>
      <div className="flex flex-row justify-between place-items-center">
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
