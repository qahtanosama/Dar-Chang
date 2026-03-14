'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedNumberProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function AnimatedNumber({ value, suffix = '', prefix = '', duration = 2, className = '' }: AnimatedNumberProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!nodeRef.current) return;

        // We animate a proxy object and update the textContent
        const proxy = { val: 0 };

        gsap.to(proxy, {
            val: value,
            duration: duration,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: nodeRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            onUpdate: () => {
                if (nodeRef.current) {
                    nodeRef.current.textContent = `${prefix}${Math.floor(proxy.val)}${suffix}`;
                }
            }
        });

    }, { scope: nodeRef });

    return (
        <span ref={nodeRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}
