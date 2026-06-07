"use client";

import { useEffect, useRef } from "react";

interface Props {
  params: {
    temperaturaInicial?: number;
    temperaturaAmbiente?: number;
    comprimento?: number;
  };
  playing: boolean;
  elapsedTime: number;
}

export default function ConducaoCalorVisualizer({
  params,
  elapsedTime,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const barX = 50;
    const barY = height / 2 - 25;
    const barWidth = width - 100;
    const barHeight = 50;

    const propagation = Math.min(elapsedTime * 40, barWidth);

    const gradient = ctx.createLinearGradient(
      barX,
      0,
      barX + propagation,
      0
    );

    gradient.addColorStop(0, "#ff3b30");
    gradient.addColorStop(0.4, "#ff9500");
    gradient.addColorStop(0.7, "#ffd60a");
    gradient.addColorStop(1, "#34c759");

    ctx.fillStyle = "#2d3748";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    ctx.fillStyle = gradient;
    ctx.fillRect(barX, barY, propagation, barHeight);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#ff3b30";
    ctx.fillText("Fonte de calor", barX - 10, barY - 20);

    ctx.fillStyle = "#60a5fa";
    ctx.fillText("Extremidade fria", width - 180, barY - 20);

    const percentage = Math.round(
      (propagation / barWidth) * 100
    );

    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Propagação: ${percentage}%`,
      width / 2 - 60,
      barY + 90
    );
  }, [elapsedTime, params]);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={300}
      className="w-full rounded-lg border border-border bg-card"
    />
  );
}