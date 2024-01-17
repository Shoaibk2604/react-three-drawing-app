import React, { useRef, useEffect, useState } from "react";

const CanvasDrawing = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set initial line properties
    context.strokeStyle = "black";
    context.lineWidth = 1;

    const getMouseCoordinates = (event) => {
      const { clientX, clientY } = event;
      const canvasRect = canvas.getBoundingClientRect();
      return {
        x: clientX - canvasRect.left,
        y: clientY - canvasRect.top,
      };
    };

    const startDrawing = (event) => {
      setDrawing(!drawing);
      const { x, y } = getMouseCoordinates(event);
      context.beginPath();
      context.moveTo(x, y);
    };

    const continueDrawing = (event) => {
      if (!drawing) return;
      const { x, y } = getMouseCoordinates(event);
      context.lineTo(x, y);
      context.stroke();
    };

    const stopDrawing = () => {
      setDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", continueDrawing);
    // canvas.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", continueDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
    };
  }, [drawing]);

  return (
    <>
      <div>Text</div>
      <canvas ref={canvasRef} width={800} height={600} />
    </>
  );
};

export default CanvasDrawing;
