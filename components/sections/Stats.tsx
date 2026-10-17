"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "next-i18next/client";
import { cn } from "@/lib/utils";
import type { SiteStats } from "@/types";

interface Review {
    rating: number;
}

interface StatsProps {
    totalTours: number;
    reviews?: Review[];
    siteStats?: SiteStats | null;
}

function useCountUp(target: number, start: boolean, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;
        let raf: number;
        const startTime = performance.now();

        function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration]);

    return value;
}

function StatCircle({
    value,
    suffix,
    label,
    index,
    start,
}: {
    value: number;
    suffix: string;
    label: string;
    index: number;
    start: boolean;
}) {
    const count = useCountUp(value, start);
    void index;

    return (
        <div className="border-l-2 border-accent pl-6">
            <div className="font-display text-4xl md:text-5xl font-bold text-primary">
                {count.toLocaleString()}
                {suffix}
            </div>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">{label}</p>
        </div>
    );
}

export function Stats({ totalTours, reviews = [], siteStats }: StatsProps) {
    const { t } = useT("home");
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const fallbackSatisfaction =
        reviews.length > 0
            ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length / 5) * 100)
            : 95;

    const stats = [
        { key: "years", value: siteStats?.years_experience ?? 12, suffix: "", offset: "md:mt-16" },
        {
            key: "satisfaction",
            value: siteStats?.satisfaction_percent ?? fallbackSatisfaction,
            suffix: "%",
            offset: "",
        },
        {
            key: "adventures",
            value: siteStats?.completed_trips ?? totalTours,
            suffix: "+",
            offset: "md:mt-16",
        },
        { key: "travelers", value: siteStats?.happy_travelers ?? 9431, suffix: "+", offset: "" },
    ];

    // Baza hali bo'sh bo'lsa (hammasi 0) nol raqamlarni ko'rsatmaymiz
    if (stats.every((s) => s.value === 0)) return null;

    return (
        <section ref={ref} className="py-20 md:py-24 bg-secondary/60 border-y border-border">
            <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
                {stats.map((stat, i) => (
                    <StatCircle
                        key={stat.key}
                        value={stat.value}
                        suffix={stat.suffix}
                        label={t(`stats.${stat.key}`)}
                        index={i}
                        start={started}
                    />
                ))}
            </div>
        </section>
    );
}