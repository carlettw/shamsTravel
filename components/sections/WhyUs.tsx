"use client";

import { useT } from "next-i18next/client";
import { Wallet, ShieldCheck, Package, Headphones } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const ITEMS = [
    { icon: Wallet, key: "i1", span: "lg:col-span-2 lg:row-span-2", big: true },
    { icon: ShieldCheck, key: "i2", span: "" },
    { icon: Package, key: "i3", span: "" },
    { icon: Headphones, key: "i4", span: "lg:col-span-2" },
];

export function WhyUs() {
    const { t } = useT("home");
    return (
        <section className="relative py-24 bg-background overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-4">
                <div className="mb-14 max-w-2xl">
                    <span className="eyebrow">{t("why.eyebrow")}</span>
                    <h2 className="mt-4 text-3xl md:text-5xl leading-[1.1] text-foreground">{t("why.title")}</h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(13rem,auto)]">
                    {ITEMS.map(({ icon: Icon, key, span, big }, i) => (
                        <Reveal key={key} delay={i * 100} className={`${span} h-full`}>
                            <div
                                className={
                                    big
                                        ? "relative h-full min-h-72 overflow-hidden rounded-3xl bg-primary p-8 md:p-10 text-primary-foreground flex flex-col justify-between"
                                        : "group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow"
                                }
                            >
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                                            big ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"
                                        }`}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <span
                                        className={`font-display text-5xl leading-none ${
                                            big ? "text-white/15" : "text-outline-dark"
                                        }`}
                                    >
                                        0{i + 1}
                                    </span>
                                </div>
                                <div className="mt-8">
                                    <h3 className={`font-display ${big ? "text-2xl md:text-3xl" : "text-lg"} mb-2`}>
                                        {t(`why.${key}_title`)}
                                    </h3>
                                    <p
                                        className={`leading-relaxed ${
                                            big ? "text-base text-primary-foreground/80 max-w-md" : "text-sm text-muted-foreground"
                                        }`}
                                    >
                                        {t(`why.${key}_text`)}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
