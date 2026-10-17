"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useT } from "next-i18next/client";
import { ArrowUpRight } from "lucide-react";
import { localizedHref } from "@/lib/utils";
import { TourCard } from "@/components/tours/TourCard";
import { Reveal } from "@/components/shared/Reveal";
import type { Tour } from "@/types";

export function PopularTours({ tours }: { tours: Tour[] }) {
    const { t } = useT("home");
    const params = useParams<{ lng: string }>();
    const lng = params.lng ?? "en";

    return (
        <section className="relative py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <span className="eyebrow">{t("popular.eyebrow")}</span>
                        <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl leading-[1.1] text-foreground">
                            {t("popular.title")}
                        </h2>
                    </div>
                    <Link
                        href={localizedHref(lng, "/tours")}
                        className="group inline-flex items-center gap-3 rounded-full border border-border bg-card pl-6 pr-2 py-2 text-sm font-semibold text-foreground hover:border-primary transition-colors"
                    >
                        {t("popular.view_all")}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground group-hover:rotate-45 transition-transform">
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tours.slice(0, 6).map((tour, i) => (
                        <Reveal key={tour.id} delay={(i % 3) * 120}>
                            <TourCard tour={tour} viewLabel={t("popular.view")} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
