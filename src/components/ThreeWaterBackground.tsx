import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeWaterBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Detect low-performance / mobile device
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Grid details based on device
    const segmentsX = isMobile ? 30 : 60;
    const segmentsY = isMobile ? 30 : 60;
    const geometry = new THREE.PlaneGeometry(50, 50, segmentsX, segmentsY);

    // Colors - hygiene themed, blue/green/white gradients
    const colors: number[] = [];
    const positionAttribute = geometry.getAttribute("position");
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const u = positionAttribute.getX(i) / 25; // range roughly -1 to 1
      const v = positionAttribute.getY(i) / 25;
      
      // Interpolate colors between a premium blue and refreshing teal-green
      const ratio = (u + v + 2) / 4; // normalized 0 to 1
      const c1 = new THREE.Color("#0ea5e9"); // light sky blue
      const c2 = new THREE.Color("#10b981"); // fresh emerald green
      const mixedColor = c1.clone().lerp(c2, ratio);
      
      colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
    }
    
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.25 : 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    // Mesh / Points
    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = -Math.PI / 2.3; // Tilt to face camera nicely
    scene.add(particles);

    // Interaction vars
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      targetMouseX = (clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Animation variables
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // Interpolate mouse coordinates smoothly
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const pos = geometry.getAttribute("position");
      
      if (pos) {
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);

          // Combination of multiple sine waves to create natural fluid motion
          let z = Math.sin(x * 0.15 + elapsedTime * 1.5) * 1.2;
          z += Math.cos(y * 0.15 + elapsedTime * 1.2) * 1.2;
          z += Math.sin((x + y) * 0.08 + elapsedTime * 0.8) * 0.8;

          // Mouse proximity impact - push down or raise particles near "mouse"
          const distToMouse = Math.sqrt(Math.pow(x - mouseX * 20, 2) + Math.pow(y - mouseY * 20, 2));
          if (distToMouse < 12) {
            z += (12 - distToMouse) * 0.45 * Math.sin(elapsedTime * 6);
          }

          pos.setZ(i, z);
        }
        pos.needsUpdate = true;
      }

      // Gentle overall scene rotation
      particles.rotation.z = elapsedTime * 0.02 + mouseX * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-b from-brand-blue-50/20 via-white to-brand-green-50/20 overflow-hidden pointer-events-none"
      style={{ minHeight: "100%" }}
      id="3d-water-canvas"
    />
  );
}
