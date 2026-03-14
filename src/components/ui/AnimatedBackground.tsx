'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export function AnimatedBackground() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // We animate the orbs to slowly float around the screen, creating the dynamic glowing effect
        const orbs = gsap.utils.toArray('.orb') as Element[];

        orbs.forEach((orb, i) => {
            // Random movement paths
            gsap.to(orb, {
                x: 'random(-20vw, 20vw)',
                y: 'random(-20vh, 20vh)',
                duration: 'random(10, 20)',
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                repeatRefresh: true,
            });

            // Subtle scaling and opacity pulsing
            gsap.to(orb, {
                scale: 'random(0.8, 1.2)',
                opacity: 'random(0.4, 0.8)',
                duration: 'random(5, 10)',
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                repeatRefresh: true,
                delay: i * -2,
            });
        });
    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-primary-dark">
            {/* 
        The "uni-chat.me" style animated background relies on massive, highly blurred colored orbs
        that slowly drift to create dynamic lighting under the glassmorphism.
      */}
            <div className="orb absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#0F2040] rounded-full blur-[100px] opacity-60" />
            <div className="orb absolute bottom-0 right-[-10%] w-[60vw] h-[60vw] bg-[#C9A84C]/20 rounded-full blur-[120px] opacity-50" />
            <div className="orb absolute top-[40%] left-[60%] w-[30vw] h-[30vw] bg-[#1A3055] rounded-full blur-[80px] opacity-70" />
            <div className="orb absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] bg-[#8B6914]/15 rounded-full blur-[100px] opacity-40" />
        </div>
    );
}
