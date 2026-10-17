"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useT } from "next-i18next/client";
import { Clock, ArrowUpRight } from "lucide-react";
import { getMediaUrl } from "@/lib/media";
import { localizedText, localizedHref, formatPrice } from "@/lib/utils";
import type { Tour } from "@/types";
import { TourImagePlaceholder } from "@/components/tours/TourImagePlaceholder";

export function TourCard({ tour, viewLabel }: { tour: Tour; viewLabel: string }) {
    const params = useParams<{ lng: string }>();
    const lng = params.lng ?? "en";
    const { t } = useT("home");
    const imageUrl = getMediaUrl(tour.cover_image ?? tour.images?.[0]);

    const title = localizedText(tour.title, lng);
    const shortDescription = localizedText(tour.short_description, lng);
    const countryName = tour.countries?.[0] ? localizedText(tour.countries[0].name, lng) : "";

    const duration = tour.duration_days
        ? `${tour.duration_days} ${t("popular.days_short")}${
              tour.duration_nights ? ` / ${tour.duration_nights} ${t("popular.nights_short")}` : ""
          }`
        : "";

    return (
        <Link
            href={localizedHref(lng, `/tours/${tour.slug}`)}
            aria-label={`${title} — ${viewLabel}`}
            className="group relative block aspect-3/4 overflow-hidden rounded-3xl bg-card ring-1 ring-black/5 shadow-md hover:shadow-2xl transition-all duration-500"
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
            ) : (
                <TourImagePlaceholder className="absolute inset-0 h-full w-full" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                {duration ? (
                    <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
                        <Clock className="h-3.5 w-3.5" />
                        {duration}
                    </span>
                ) : (
                    <span />
                )}
                <span className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-extrabold text-accent-foreground shadow-lg">
                    {formatPrice(tour.price, tour.currency)}
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
                {countryName && (
                    <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">
                        {countryName}
                    </div>
                )}
                <h3 className="font-display text-xl leading-snug text-white line-clamp-2">{title}</h3>
                {shortDescription && (
                    <p className="mt-2 text-sm text-white/70 line-clamp-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500">
                        {shortDescription}
                    </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/90">{viewLabel}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-45 transition-all duration-500">
                        <ArrowUpRight className="h-5 w-5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
