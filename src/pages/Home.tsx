import React from "react";
import img1 from "../assets/homeImg.png";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-row justify-between w-full tracking-wide ">
      <span className="text-7xl leading-relaxed">
        This a <b className="uppercase text-blue-400">demo</b> <br /> for showing use case of
        <br />
        <b className="uppercase text-purple-500">Itheum SDK</b>
      </span>
      <div></div>
      <div className="bg-transparent backdrop-blur shadow-inner shadow-white rounded-xl">
        <img src={img1} className="w-[40rem]" />
      </div>
    </div>
  );
};
