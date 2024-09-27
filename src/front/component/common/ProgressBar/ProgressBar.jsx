import React from "react";

export default function ProgressBar({ label, progress }) {
  return (
    <>
      <div className="flex w-full h-1 bg-zinc-300 rounded-xl relative overflow-hidden">
        <div
          className="h-full bg-indigo-700 absolute"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div className="text-indigo-700 text-sm font-light font-['Lexend'] leading-tight">
          {" "}
          {label}
        </div>
        <div className="text-indigo-700 text-sm font-light font-['Lexend'] leading-tight">
          {" "}
          {progress}%
        </div>
      </div>
    </>
  );
}
