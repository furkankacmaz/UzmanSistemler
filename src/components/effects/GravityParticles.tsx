import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const PARTICLE_COLORS = [
  "#3279F9", // Google Blue (from antigravity CSS)
  "#3279F9",
  "#4285F4",
  "#5B9CF6",
  "#1A56DB",
  "#2563EB",
];

const PARTICLE_COUNT = 100;
const MOUSE_RADIUS = 180;
const MOUSE_STRENGTH = 0.45;
const RETURN_SPEED = 0.06;
const DAMPING = 0.88;

function createParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];

  // Poisson-disk-like distribution (clustered in some areas, sparse in others)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Bias towards left and right edges like antigravity site
    const side = Math.random();
    let x: number;

    if (side < 0.55) {
      // Left cluster (like antigravity)
      x = Math.random() * width * 0.32;
    } else if (side < 0.75) {
      // Right edge
      x = width * 0.7 + Math.random() * width * 0.3;
    } else {
      // Scattered
      x = Math.random() * width;
    }

    const y = Math.random() * height;

    particles.push({
      x,
      y,
      originX: x,
      originY: y,
      vx: 0,
      vy: 0,
      size: Math.random() * 3.5 + 1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * 0.55 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
    });
  }

  return particles;
}

export default function GravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        // Distance to mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          // Repel from mouse (antigravity!)
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * MOUSE_STRENGTH * 3;
          p.vy += Math.sin(angle) * force * MOUSE_STRENGTH * 3;
        }

        // Return to origin
        const odx = p.originX - p.x;
        const ody = p.originY - p.y;
        p.vx += odx * RETURN_SPEED;
        p.vy += ody * RETURN_SPEED;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Update rotation
        p.rotation += p.rotationSpeed;

        // Draw the particle (small rounded rectangle like antigravity)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.size > 2.5) {
          // Slightly rectangular shape like in screenshot
          const w = p.size * 1.8;
          const h = p.size * 0.8;
          const r = Math.min(w, h) * 0.35;
          ctx.beginPath();
          ctx.moveTo(-w / 2 + r, -h / 2);
          ctx.lineTo(w / 2 - r, -h / 2);
          ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
          ctx.lineTo(w / 2, h / 2 - r);
          ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
          ctx.lineTo(-w / 2 + r, h / 2);
          ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
          ctx.lineTo(-w / 2, -h / 2 + r);
          ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Small dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
