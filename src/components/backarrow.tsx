"use client";

import { useState } from "react";
import Image from "next/image";

export default function BackArrow() {
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
    <a href="/">
      <Image src={imageSrc} alt="Back arrow" width={imageWidth} height={imageWidth} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="absolute left-10 top-10"/>
    </a>
  );
}
