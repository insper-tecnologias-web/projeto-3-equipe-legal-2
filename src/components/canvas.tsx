'use client';

import { useDraw } from '@/hooks/useDraw';
import { comicService } from '@/services/comic';
import { ChromePicker } from 'react-color';
import { useState } from 'react';

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: { x: number; y: number };
  prevPoint: { x: number; y: number } | null;
};

export function Canvas({
  w,
  h,
  gameId,
  round,
}: {
  w: number;
  h: number;
  gameId: string;
  round: number;
}) {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(3);

  function drawLine({ ctx, currentPoint, prevPoint }: Draw) {
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
  };

  const setErase = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
  };

  async function saveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL();
    await comicService.addDrawing(gameId, image, round);
  }

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
              className="border-2 border-zinc-900 p-2 text-xl"
              onClick={setDraw}
            >
              ✏️
            </button>
            <button
              className="border-2 border-zinc-900 p-2 text-xl"
              onClick={setErase}
            >
              👻
            </button>
          </div>
          <div className="flex gap-3">
            <button
              className="border-2 border-zinc-900 p-2 text-xl"
              onClick={() => setLineWidth(3)}
            >
              3
            </button>
            <button
              className="border-2 border-zinc-900 p-2 text-xl"
              onClick={() => setLineWidth(5)}
            >
              5
            </button>
            <button
              className="border-2 border-zinc-900 p-2 text-xl"
              onClick={() => setLineWidth(8)}
            >
              8
            </button>
            <button
              className="border-2 border-zinc-900 p-2 text-xl"
              onClick={() => setLineWidth(10)}
            >
              10
            </button>
          </div>
          <button
            className="border-4 border-zinc-900 p-2 text-xl semibold w-fit"
            onClick={clear}
          >
            Apagar desenho
          </button>
        </div>
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={w}
          height={h}
          className="border-4 border-zinc-900"
        />
      </div>
      <button
        className="border-4 border-zinc-900 p-2 text-xl semibold w-fit]"
        onClick={saveImage}
      >
        Salvar
      </button>
    </div>
  );
}
