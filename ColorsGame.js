"use client";

import { useState, useEffect } from "react";

export default function ColorWall() {
  const [colors, setColors] = useState(Array(16).fill("bg-gray-200"));
  const [isRandomMode, setIsRandomMode] = useState(false);

  const changeColor = (index) => {
    const newColors = [...colors];
    const randomColor = getRandomColor();
    newColors[index] = randomColor;
    setColors(newColors);
  };

  const getRandomColor = () => {
    const colorList = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500", "bg-teal-500", "bg-orange-500"];
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

  useEffect(() => {
    let interval;
    if (isRandomMode) {
      interval = setInterval(() => {
        setColors(colors.map(() => getRandomColor()));
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRandomMode, colors]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-16 h-16 ${color} rounded-lg transition-all cursor-pointer hover:opacity-80`}
            onClick={() => changeColor(index)}
          />
        ))}
      </div>
      <button
        onClick={() => setIsRandomMode(!isRandomMode)}
        className="px-6 py-3 bg-white text-black rounded-lg shadow-lg hover:bg-gray-300 transition-all"
      >
        {isRandomMode ? "Stop Random Mode" : "Start Random Mode"}
      </button>
    </div>
  );
}
