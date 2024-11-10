'use client';

import { playerService } from '@/services/player';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Exit({ gameId }: { gameId: string }) {
  const [imageSrc, setImageSrc] = useState('/back1.svg');
  const [imageWidth, setImageWidth] = useState(60);
  const router = useRouter();

  const handleExit = () => {
    playerService.logoutPlayer(gameId);

    router.push('/');
  };

  const handleMouseEnter = () => {
    setImageSrc('/back2.svg');
    setImageWidth(70);
  };

  const handleMouseLeave = () => {
    setImageSrc('/back1.svg');
    setImageWidth(60);
  };

  return (
    <button onClick={handleExit}>
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
