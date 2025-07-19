"use client";
import Image from "next/image";

interface PopupProps {
  text: string;
  success: boolean;
  setInfoPopupVisible: Function;
}

export default function InfoPopup({
  text,
  success,
  setInfoPopupVisible,
}: PopupProps) {
  return (
    <div
      className={`absolute flex flex-row justify-between place-items-center gap-2 bottom-4 left-1/2 py-2 px-4 translate-x-[-50%] mx-auto max-w-full bg-${
        success ? "green" : "red"
      }-500 border-2 border-${
        success ? "green" : "red"
      }-700 font-semibold wrap-anywhere shadow-2xl/100 rounded-lg z-10`}
    >
      <p className="text-center">{text}</p>
      <div className="relative h-5 aspect-square">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/1828/1828945.png"
          alt="Profile Picture"
          className="h-full rounded-full cursor-pointer hover:scale-110 transition-all"
          fill
          onClick={() => setInfoPopupVisible(false)}
        />
      </div>
    </div>
  );
}
