"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useContext, useState } from "react";

export default function BackArrow() {
  const { logout } = useContext(AuthContext);
  const [imageSrc, setImageSrc] = useState("/back1.svg");
  const [imageWidth, setImageWidth] = useState(60);

  const handleMouseEnter = () => {
    setImageSrc("/back2.svg");
    setImageWidth(70);
  };

  const handleMouseLeave = () => {
    setImageSrc("/back1.svg");
    setImageWidth(60);
  };

  return (
    <button onClick={logout}>
      <Image
        src={imageSrc}
        alt="Back arrow"
        width={imageWidth}
        height={imageWidth}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute left-10 top-10"
      />
    </button>
  );
}
