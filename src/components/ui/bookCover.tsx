import React from "react";

interface BookCoverProps {
  title: string;
  author: string;
  publisher?: string;
}

const getRandomColor = () => {
  const colors = [
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-700",
    "bg-blue-500",
    "bg-teal-400",
    "bg-green-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomFont = () => {
  const fonts = ["font-sans", "font-serif", "font-mono"];
  return fonts[Math.floor(Math.random() * fonts.length)];
};

const BookCover: React.FC<BookCoverProps> = ({ title, author, publisher }) => {
  const backgroundColor = getRandomColor();
  const fontFamily = getRandomFont();

  return (
    <div
      className={`w-full h-[250px] flex flex-col justify-center items-center text-center p-4 rounded-lg shadow-md text-white  ${backgroundColor} ${fontFamily}`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-lg mt-2">{author}</p>
      {publisher && <p className="text-sm mt-2 italic">{publisher}</p>}
    </div>
  );
};

export default BookCover;
