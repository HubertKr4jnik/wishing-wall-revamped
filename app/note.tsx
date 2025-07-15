"use client";

export default function Note() {
  return (
    <div className="w-full h-fit bg-amber-200 text-black p-4 shadow-xl/50 mb-6 note">
      <h2 className="font-bold text-xl">Title</h2>
      <p className="pb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        hendrerit velit quis mauris dapibus, ut rhoncus nisl ornare. Maecenas
        elit leo, pulvinar in mi non, faucibus dignissim eros. Maecenas odio
        justo, tempor quis est in, interdum lobortis nisi. Phasellus est purus,
        commodo non felis ut, suscipit rutrum mi.
      </p>
      <div className="flex flex-row justify-between place-items-center">
        <div className="flex flex-row gap-2 justify-center place-items-center">
          <img
            className="h-10 rounded-full shadow-2xl/100"
            src="https://avatars.slack-edge.com/2024-11-12/8018874792210_182a32eb207e7e2d2513_512.png"
            alt=""
          />
          <p className="flex place-items-center">(username)</p>
        </div>
        <div className="flex flex-row gap-1 justify-center place-items-center">
          <p className="text-xl">7</p>
          <img
            className="h-7 cursor-pointer hover:scale-110 transition-all"
            src="https://cdn-icons-png.flaticon.com/512/2589/2589197.png"
            alt=""
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
