"use client";

import { database } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BackArrowProps {
  gameId: string;
}

export default function BackArrow({ gameId }: BackArrowProps) {
  const [imageSrc, setImageSrc] = useState("/back1.svg");
  const [imageWidth, setImageWidth] = useState(60);
  const router = useRouter();

  const handleLogout = async () => {
    const playerId = Cookies.get("player_token");
    if (playerId) {
      set(ref(database, `games/${gameId}/players/${playerId}`), null);
      router.push("/");
    }
  };

  const handleMouseEnter = () => {
    setImageSrc("/back2.svg");
    setImageWidth(70);
  };

  const handleMouseLeave = () => {
    setImageSrc("/back1.svg");
    setImageWidth(60);
  };

  return (
    <button onClick={handleLogout}>
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
