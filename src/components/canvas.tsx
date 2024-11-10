'use client';

import { useDraw } from '@/hooks/useDraw';
import { base64ToImage } from '@/utils/save-image';
import Cookies from 'js-cookie';

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: { x: number; y: number };
  prevPoint: { x: number; y: number } | null;
};

export function Canvas({
  w,
  h,
  gameId,
  turn,
}: {
  w: number;
  h: number;
  gameId: string;
  turn: number;
}) {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ ctx, currentPoint, prevPoint }: Draw) {
    const color = '#000000';
    const lineWidth = 5;

    const startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(currentPoint.x, currentPoint.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function saveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL();
    const playerId = Cookies.get('player_token');

    base64ToImage(image, `public/${gameId}/${playerId}`, turn.toFixed());
  }

  return (
    <div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={w}
        height={h}
        className="border-4 border-zinc-900"
      />
      <button className="border-4 border-zinc-900" onClick={saveImage}>
        Salvar
      </button>
    </div>
  );
}
