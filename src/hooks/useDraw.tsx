import { useEffect, useRef, useState } from 'react';

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: { x: number; y: number };
  prevPoint: { x: number; y: number } | null;
};

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | { x: number; y: number }>(null);

  const onMouseDown = () => {
    setMouseDown(true);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!mouseDown) return;

      const currentPoint = canvasLimiter(e);

      const ctx = canvas?.getContext('2d');
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const canvasLimiter = (e: MouseEvent) => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    canvas?.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', () => {
      setMouseDown(false);
      prevPoint.current = null;
    });

    return () => {
      canvas?.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', () => setMouseDown(false));
    };
  }, [onDraw, mouseDown]);

  return { canvasRef, onMouseDown, clear };
};
