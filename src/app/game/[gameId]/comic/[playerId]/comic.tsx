'use client';

import { Canvas } from '@/components/canvas';
import { Clock } from '@/components/clock';
import Modal from '@/components/modal';
import Image from 'next/image';
import { useState } from 'react';

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
        <Image src="/comic1.svg" alt="Comic 1" width={625} height={350} />
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
