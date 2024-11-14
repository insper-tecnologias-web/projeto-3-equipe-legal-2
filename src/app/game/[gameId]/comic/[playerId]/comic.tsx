'use client';

import { useState } from 'react';
import Modal from '@/components/modal';
import Image from 'next/image';
import { Canvas } from '@/components/canvas';

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

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={() => (active ? setModalVisible(true) : null)}
        className={`${active ? 'cursor-pointer' : 'opacity-30'} z-10`}
      >
        <Image src="/comic1.svg" alt="Comic 1" width={655} height={355} />
      </div>

      <Modal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Canvas
          w={1310}
          h={710}
          gameId={gameId}
          playerId={playerId}
          round={round}
        />
      </Modal>
    </div>
  );
}
