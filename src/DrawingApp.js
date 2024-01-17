import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [currentShape, setCurrentShape] = useState("line");

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 0),
    ]);

    const prismMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const prismGeometry = new THREE.BoxGeometry(1, 2, 1); 

    const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const triangleGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0.5, 1, 0),
    ]);

    const shapes = {
      cube: { geometry: cubeGeometry, material: cubeMaterial },
      line: { geometry: lineGeometry, material: lineMaterial },
      prism: { geometry: prismGeometry, material: prismMaterial },
      triangle: { geometry: triangleGeometry, material: triangleMaterial },
    };

    let drawingLine = null;
    const objects = [];

    const handleMouseDown = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -((event.clientY / window.innerHeight) * 2) + 1;

      if (currentShape === "line") {
        drawingLine = new THREE.Line(lineGeometry.clone(), lineMaterial);
        drawingLine.geometry.setFromPoints([
          new THREE.Vector3(mouseX * 5, mouseY * 5, -5),
          new THREE.Vector3(mouseX * 5, mouseY * 5, -5), 
        ]);
        scene.add(drawingLine);
        objects.push(drawingLine);
      } else {
        const shape = shapes[currentShape];
        const object = new THREE.Mesh(shape.geometry, shape.material);
        object.position.set(mouseX * 5, mouseY * 5, -5);
        scene.add(object);
        objects.push(object);
      }
    };

    const handleMouseMove = (event) => {
      if (objects.length === 0) return;

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -((event.clientY / window.innerHeight) * 2) + 1;

      if (currentShape === "line" && drawingLine) {
        drawingLine.geometry.setFromPoints([
          new THREE.Vector3(
            drawingLine.geometry.attributes.position.array[0],
            drawingLine.geometry.attributes.position.array[1],
            drawingLine.geometry.attributes.position.array[2]
          ),
          new THREE.Vector3(mouseX * 5, mouseY * 5, -5),
        ]);
      } else {
        const currentObject = objects[objects.length - 1];
        currentObject.position.x = mouseX * 5;
        currentObject.position.y = mouseY * 5;
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      canvasRef.current.removeChild(renderer.domElement);
    };
  }, [currentShape]);

  const handleShapeChange = (shape) => {
    setCurrentShape(shape);
  };

  return (
    <div>
      <div ref={canvasRef} />
      <div>
        <button onClick={() => handleShapeChange("cube")}>Cube</button>
        <button onClick={() => handleShapeChange("prism")}>Prism</button>
        <button onClick={() => handleShapeChange("line")}>Line</button>
        <button onClick={() => handleShapeChange("triangle")}>Triangle</button>
      </div>
    </div>
  );
};

export default DrawingApp;
