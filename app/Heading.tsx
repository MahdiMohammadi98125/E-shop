import React from "react";

interface HeadingProps {
  title: string;
  center?: boolean;
}

export default function Heading({ title, center }: HeadingProps) {
  return (
    <div>
      <h1
        className={`${
          center ? "text-center" : "text-start"
        } text-2xl font-bold`}
      >
        {title}
      </h1>
    </div>
  );
}
