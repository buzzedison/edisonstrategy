'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function HeroEffects() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // Initialize counter animations
  useEffect(() => {
    const counterElements = document.querySelectorAll('.counter-animate');
    
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const duration = parseInt(el.getAttribute('data-speed') || '30', 10);
      let count = 0;
      
      const updateCount = () => {
        const increment = target / duration;
        
        if (count < target) {
          count += increment;
          el.textContent = Math.ceil(count).toString() + (el.textContent?.endsWith('+') ? '+' : '');
          setTimeout(updateCount, 30);
        } else {
          el.textContent = target.toString() + (el.textContent?.endsWith('+') ? '+' : '');
        }
      };
      
      updateCount();
    });
  }, []);
  
  // Parallax tilt effect
  useEffect(() => {
    const tiltElement = tiltRef.current;
    
    if (!tiltElement) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = tiltElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      tiltElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      tiltElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    tiltElement.addEventListener('mousemove', handleMouseMove as EventListener);
    tiltElement.addEventListener('mouseleave', handleMouseLeave as EventListener);
    
    // Parallax elements movement
    const handleScroll = () => {
      parallaxRefs.current.forEach((element) => {
        if (!element) return;
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => {
      tiltElement.removeEventListener('mousemove', handleMouseMove as EventListener);
      tiltElement.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Particles effect
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    ctxRef.current = ctx;
    
    particlesRef.current.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    
    const particles: Particle[] = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    
    function animate() {
      if (!ctxRef.current || !canvasRef.current) return;
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvasRef.current!.width;
        if (particle.x > canvasRef.current!.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvasRef.current!.height;
        if (particle.y > canvasRef.current!.height) particle.y = 0;
        
        ctxRef.current!.beginPath();
        ctxRef.current!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctxRef.current!.fillStyle = `rgba(79, 70, 229, ${particle.opacity})`;
        ctxRef.current!.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (particlesRef.current && particlesRef.current.contains(canvas)) {
        particlesRef.current.removeChild(canvas);
      }
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={tiltRef}
        className="absolute inset-0 transition-transform duration-200 ease-out"
      >
        {/* Background gradient */}
        <div
          ref={(el) => (parallaxRefs.current[0] = el)}
          data-speed="0.3"
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
        />

        {/* Animated circles */}
        <div
          ref={(el) => (parallaxRefs.current[1] = el)}
          data-speed="0.5"
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        />
        <div
          ref={(el) => (parallaxRefs.current[2] = el)}
          data-speed="0.7"
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
        />
        <div
          ref={(el) => (parallaxRefs.current[3] = el)}
          data-speed="0.4"
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"
        />

        {/* Grid pattern */}
        <div
          ref={(el) => (parallaxRefs.current[4] = el)}
          data-speed="0.2"
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        />
      </div>
      <div ref={particlesRef} id="particles-canvas" className="absolute inset-0 z-0" />
    </div>
  );
} 