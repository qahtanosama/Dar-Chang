import { Plus, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface FAQAccordionProps {
    question: string;
    answer: ReactNode;
    /** 'dark' = gold-on-dark (default, for dark-bg sections)
     *  'light' = navy-on-white (for light-bg pages like About) */
    variant?: 'dark' | 'light';
}

export function FAQAccordion({ question, answer, variant = 'dark' }: FAQAccordionProps) {
    const isDark = variant === 'dark';

    return (
        <details className={[
            'group',
            '[&_summary::-webkit-details-marker]:hidden',
            'rounded-xl transition-colors duration-300 overflow-hidden',
            isDark
                ? 'border border-white/8 bg-white/[0.03] open:bg-accent-gold/[0.06] border-l-4 border-l-transparent open:border-l-accent-gold'
                : 'border border-border-subtle bg-white open:bg-accent-gold/[0.04] border-l-4 border-l-transparent open:border-l-accent-gold shadow-sm',
        ].join(' ')}>
            <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-6 py-5 font-semibold list-none">
                <h3 className={[
                    'text-base md:text-lg transition-colors duration-300 leading-snug',
                    isDark
                        ? 'text-gray-200 group-open:text-accent-gold'
                        : 'text-primary-navy group-open:text-accent-gold',
                ].join(' ')}>
                    {question}
                </h3>
                <span className="relative h-6 w-6 shrink-0 ms-4">
                    <Plus className={`absolute inset-0 h-6 w-6 transition-all duration-300 opacity-100 group-open:opacity-0 group-open:rotate-90 ${isDark ? 'text-accent-gold/60' : 'text-accent-gold/70'}`} />
                    <Minus className="absolute inset-0 h-6 w-6 transition-all duration-300 opacity-0 group-open:opacity-100 text-accent-gold" />
                </span>
            </summary>

            {/* Smooth reveal via CSS grid animation */}
            <div className="grid grid-rows-[1fr] px-6">
                <div className="overflow-hidden">
                    <p className={[
                        'pb-5 text-sm md:text-base leading-relaxed',
                        isDark ? 'text-gray-300' : 'text-text-main',
                    ].join(' ')}>
                        {answer}
                    </p>
                </div>
            </div>
        </details>
    );
}
