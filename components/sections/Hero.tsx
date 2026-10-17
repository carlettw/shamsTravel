"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalizedHref } from "@/hooks/use-localized-href";
import { HeroSearch } from "./HeroSearch";

const SLIDE_COUNT = 6;
const ROTATE_INTERVAL = 6000;

export function Hero() {
    const { t } = useT("home");
    const withLocale = useLocalizedHref();
    const [index, setIndex] = useState(0);

    const goTo = useCallback((next: number) => {
        setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
    }, []);

    useEffect(() => {
        const id = setInterval(() => setIndex((prev) => (prev + 1) % SLIDE_COUNT), ROTATE_INTERVAL);
        return () => clearInterval(id);
    }, [index]);

    return (
        <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/hero_image.jpg"
                    alt="Shams Travel"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[50%_38%] animate-kenburns"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/20 to-black/70" />
                <div className="absolute inset-0 bg-linear-to-r from-black/55 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 flex-1 flex flex-col justify-end pt-36 pb-10">
                <div className="eyebrow mb-6 text-white!">{t("hero.eyebrow")}</div>

                <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-white min-h-[3.3em] line-clamp-3">
                        {t(`hero.slide_${index + 1}_title`)}
                    </h1>
                    <p className="mt-5 max-w-xl text-base md:text-lg text-white/75 leading-relaxed min-h-14 line-clamp-2">
                        {t(`hero.slide_${index + 1}_subtitle`)}
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                        href={withLocale("/tours")}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground pl-7 pr-3 py-3 font-bold shadow-lg hover:brightness-105 transition-all"
                    >
                        {t("hero.cta_primary")}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:rotate-45 transition-transform">
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    </Link>
                    <Link
                        href={withLocale("/contact")}
                        className="glass-dark rounded-full px-7 py-3.5 font-semibold text-white hover:bg-white/20 transition-colors"
                    >
                        {t("hero.cta_secondary")}
                    </Link>
                </div>

                <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="w-full max-w-xl">
                        <HeroSearch />
                    </div>

                    <div className="flex items-end gap-5">
                        <div className="flex flex-col gap-2 pb-3">
                            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`${i + 1}-slayd`}
                                    onClick={() => goTo(i)}
                                    className={cn(
                                        "h-0.5 rounded-full transition-all duration-500 cursor-pointer",
                                        i === index ? "w-12 bg-accent" : "w-6 bg-white/35 hover:bg-white/70"
                                    )}
                                />
                            ))}
                        </div>
                        <div className="font-display text-6xl md:text-7xl leading-none text-outline tabular-nums select-none">
                            {String(index + 1).padStart(2, "0")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
