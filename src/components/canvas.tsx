'use client';

import { useTimer } from '@/contexts/TimerContext';
import { useDraw } from '@/hooks/useDraw';
import { comicService } from '@/services/comic';
import { playerService } from '@/services/player';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: { x: number; y: number };
  prevPoint: { x: number; y: number } | null;
};

export function Canvas({
  w,
  h,
  gameId,
  playerId,
  round,
}: {
  w: number;
  h: number;
  gameId: string;
  playerId: string;
  round: number;
}) {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState(true);
  const [save, setSave] = useState(true);
  const { timeLeft } = useTimer();

  function drawLine({ ctx, currentPoint, prevPoint }: Draw) {
    if (!save) return;

    const startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(currentPoint.x, currentPoint.y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const setDraw = () => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
  };

  const setErase = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
  };

  async function toggleSave() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setSave((prev) => !prev);
    const image = canvas.toDataURL();
    await comicService.addDrawing(gameId, playerId, image, round);
    await playerService.playerReady(gameId, save);
  }

  useEffect(() => {
    if (timeLeft && timeLeft <= 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const image = canvas.toDataURL();
      comicService.addDrawing(gameId, playerId, image, round);
    }
  }, [timeLeft, canvasRef, gameId, round, playerId]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <div className="flex flex-col gap-3 items-center">
          <ChromePicker
            className="h-fit"
            color={color}
            onChange={(e) => setColor(e.hex)}
          />
          <div className="flex gap-3">
            <button
              className={`border-2  p-2 text-xl ${isDrawing ? 'border-red-600' : 'border-zinc-900'}`}
              onClick={setDraw}
            >
              <Image src="/lapis.png" alt="Lápis" width={20} height={20} />
            </button>
            <button
              className={`border-2  p-2 text-xl ${!isDrawing ? 'border-red-600' : 'border-zinc-900'}`}
              onClick={setErase}
            >
              <Image
                src="/borracha.png"
                alt="Borracha"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="flex gap-3 w-full">
            <button
              className={`border-2 flex justify-center flex-1 p-2 text-xl ${lineWidth === 3 ? 'border-red-600' : 'border-zinc-900'}`}
              onClick={() => setLineWidth(3)}
            >
              <span className="w-[1px] h-6 bg-zinc-900 block"></span>
            </button>
            <button
              className={`border-2 flex justify-center p-2 flex-1 text-xl ${lineWidth === 5 ? 'border-red-600' : 'border-zinc-900'}`}
              onClick={() => setLineWidth(5)}
            >
              <span className="w-[2px] h-6 bg-zinc-900 block"></span>
            </button>
            <button
              className={`border-2 flex justify-center p-2 flex-1 text-xl ${lineWidth === 8 ? 'border-red-600' : 'border-zinc-900'}`}
              onClick={() => setLineWidth(8)}
            >
              <span className="w-[3px] h-6 bg-zinc-900 block"></span>
            </button>
            <button
              className={`border-2 flex justify-center p-2 flex-1 text-xl ${lineWidth === 10 ? 'border-red-600' : 'border-zinc-900'}`}
              onClick={() => setLineWidth(10)}
            >
              <span className="w-[4px] h-6 bg-zinc-900 block"></span>
            </button>
          </div>
          <button
            className="border-4 border-zinc-900 p-2 text-xl semibold w-fit"
            onClick={clear}
          >
            Apagar desenho
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <canvas
            onMouseDown={onMouseDown}
            ref={canvasRef}
            width={w}
            height={h}
            className="border-4 border-zinc-900"
          />
          <button
            className="border-4 border-zinc-900 p-2 text-xl semibold w-fit]"
            onClick={toggleSave}
          >
            {save ? 'Salvar' : 'Editar'}
          </button>
        </div>
      </div>
    </div>
  );
}
