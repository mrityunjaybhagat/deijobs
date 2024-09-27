import React from "react";
import "./ListCardShimmer.css";

const ListCardShimmer = () => {
  return (
    <div className="w-full p-5 h-20 bg-white rounded-xl shadow flex flex-col gap-1.5">
      <div className=" h-3 shimmer-container"></div>
      <div className="h-3 shimmer-container"></div>
      <div className="h-3 shimmer-container"></div>
    </div>
  );
};
export default ListCardShimmer;
