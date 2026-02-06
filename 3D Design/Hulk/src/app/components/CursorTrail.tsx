import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable on mobile for performance

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add new trail point
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });

      // Limit trail length
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail
      trailRef.current = trailRef.current.filter(point => {
        point.age += 1;
        
        if (point.age > 20) return false;

        const alpha = 1 - (point.age / 20);
        const radius = 3 + (point.age * 0.5);

        // Draw glow
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 2);
        gradient.addColorStop(0, `rgba(57, 255, 20, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(57, 255, 20, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(57, 255, 20, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(200, 255, 200, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw current cursor position
      const { x, y } = mouseRef.current;
      if (x !== 0 || y !== 0) {
        // Outer glow
        const outerGradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        outerGradient.addColorStop(0, 'rgba(57, 255, 20, 0.4)');
        outerGradient.addColorStop(0.5, 'rgba(57, 255, 20, 0.15)');
        outerGradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
        
        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Inner dot
        ctx.fillStyle = '#39ff14';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ cursor: 'none' }}
    />
  );
}
