// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';

export default function HeroEffects() {
  const particlesRef = useRef<HTMLDivElement>(null);
  
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
    const tiltElement = document.querySelector('.tilt-element');
    
    if (!tiltElement) return;
    
    // Simplify handlers with type casting
    const handleMouseMove = (e: Event) => {
      const event = e as MouseEvent;
      const el = tiltElement as HTMLElement;
      const rect = el.getBoundingClientRect();
      
      // Get position of mouse relative to the element
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const xRotation = (y - rect.height / 2) / 20;
      const yRotation = -(x - rect.width / 2) / 20;
      
      // Apply the transformation
      el.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    };
    
    const handleMouseLeave = () => {
      const el = tiltElement as HTMLElement;
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    tiltElement.addEventListener('mousemove', handleMouseMove);
    tiltElement.addEventListener('mouseleave', handleMouseLeave);
    
    // Parallax elements movement
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const handleParallax = (e: Event) => {
      const event = e as MouseEvent;
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      
      parallaxElements.forEach(el => {
        const element = el as HTMLElement;
        const speedX = parseInt(element.dataset.speedX || '10', 10);
        const speedY = parseInt(element.dataset.speedY || '10', 10);
        
        // Calculate the offset
        const offsetX = (x - 0.5) * speedX;
        const offsetY = (y - 0.5) * speedY;
        
        element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${element.style.rotate || '0deg'})`;
      });
    };
    
    document.addEventListener('mousemove', handleParallax);
    
    return () => {
      tiltElement.removeEventListener('mousemove', handleMouseMove);
      tiltElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleParallax);
    };
  }, []);
  
  // Particles effect
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    particlesRef.current.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    
    const particles: Particle[] = [];
    const particleCount = 50;
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: getRandomColor(),
        opacity: Math.random() * 0.5
      });
    }
    
    function getRandomColor() {
      const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#d1d5db'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function animate() {
      // Safety check for context
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
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
  
  return <div ref={particlesRef} id="particles-canvas" className="absolute inset-0 z-0" />;
} 