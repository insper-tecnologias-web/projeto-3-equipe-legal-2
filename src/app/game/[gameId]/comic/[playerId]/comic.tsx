'use client';

import { Canvas } from '@/components/canvas';
import { Clock } from '@/components/clock';
import Modal from '@/components/modal';
import useGameStatusListener from '@/hooks/useGameStatusListener';
import { database } from '@/lib/firebase';
import { onValue, ref } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Comic {
  title: string;
  drawings: Record<string, string>;
}

export default function Comic({
  gameId,
  playerId,
  round,
  active,
}: {
  gameId: string;
  playerId: string;
  round: number;
  active?: boolean;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [comic, setComic] = useState<Comic | null>(null);
  useGameStatusListener(gameId);

  useEffect(() => {
    if (round > 0) {
      const comicRef = ref(
        database,
        `games/${gameId}/players/${playerId}/comic`,
      );
      const unsubscribe = onValue(comicRef, (snapshot) => {
        const fetchedComic = snapshot.val() as Comic;
        setComic(fetchedComic);
      });

      return () => unsubscribe();
    }
  }, [gameId, playerId, round]);

  const currentComic = comic?.drawings?.[(round - 1).toString()] ?? null;

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={() => (active ? setModalVisible(true) : null)}
        className={`${active ? 'cursor-pointer' : 'opacity-30'} z-10`}
      >
        {currentComic ? (
          <Image
            src={currentComic}
            alt={`Comic Round ${round}`}
            className="border-4 border-zinc-900"
            width={625}
            height={350}
          />
        ) : (
          <Image
            src="/comic.svg"
            alt={`Placeholder Comic Round ${round}`}
            width={625}
            height={350}
          />
        )}
      </div>

      <Modal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Canvas
          w={1250}
          h={700}
          gameId={gameId}
          playerId={playerId}
          round={round}
        />
        <Clock round={round} />
      </Modal>
    </div>
  );
}
