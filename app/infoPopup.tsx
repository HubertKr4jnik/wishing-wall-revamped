"use client";

export default function InfoPopup({ text, success }) {
  if (success) {
    return (
      <div className="absolute top-0 mx-auto bg-green-500 font-bold text-2xl">
        <p>{text}</p>
      </div>
    );
  }
  return (
    <div className="absolute top-0 mx-auto bg-red-500 font-bold text-2xl">
      <p>{text}</p>
    </div>
  );
}
