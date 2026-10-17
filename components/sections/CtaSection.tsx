import { getT } from "next-i18next/server";
import { Phone, MapPin, Mail } from "lucide-react";
import { siteConfig, getLocalizedSiteField } from "@/lib/site-config";

export async function CtaSection({ lng }: { lng: string }) {
    const { t } = await getT("home", { lng });
    const items = [
        { icon: Phone, value: siteConfig.contact.phone, label: t("cta.phone"), href: "tel:" + siteConfig.contact.phone.replace(/\s+/g, "") },
        { icon: MapPin, value: getLocalizedSiteField(siteConfig.contact.address, lng), label: t("cta.office") },
        { icon: Mail, value: siteConfig.contact.email, label: t("cta.email"), href: "mailto:" + siteConfig.contact.email },
    ];
    return (
        <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute left-1/3 -bottom-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-4">
                <h2 className="max-w-3xl text-3xl md:text-5xl leading-[1.1]">{t("cta.title")}</h2>
                <p className="mt-5 max-w-xl text-lg text-primary-foreground/75">{t("cta.subtitle")}</p>
                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {items.map(({ icon: Icon, value, label, href }) => {
                        const inner = (
                            <div className="h-full rounded-3xl bg-white/8 p-6 text-white ring-1 ring-white/15 hover:bg-white/12 transition-colors">
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</p>
                                <h3 className="mt-1 text-lg font-bold break-words font-sans">{value}</h3>
                            </div>
                        );
                        return href ? (
                            <a key={label} href={href} className="block">{inner}</a>
                        ) : (
                            <div key={label}>{inner}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
