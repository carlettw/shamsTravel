import Link from "next/link";
import { getT } from "next-i18next/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { localizedHref } from "@/lib/utils";
import { SiteLogo } from "../shared/site-logo";
import { siteConfig, getLocalizedSiteField } from "@/lib/site-config";

const LINKS = [
    { href: "/", key: "nav.home" },
    { href: "/about", key: "nav.about" },
    { href: "/tours", key: "nav.tours" },
];

const SERVICE_LINKS = [
    { href: "/services", key: "nav.service" },
    { href: "/contact", key: "nav.contact" },
];

const SOCIAL_ITEMS = [
    { key: "instagram", label: "Instagram", url: siteConfig.social.instagram },
    { key: "facebook", label: "Facebook", url: siteConfig.social.facebook },
    { key: "telegram", label: "Telegram", url: siteConfig.social.telegram },
    { key: "youtube", label: "YouTube", url: siteConfig.social.youtube },
    { key: "tiktok", label: "TikTok", url: siteConfig.social.tiktok },
    { key: "whatsapp", label: "WhatsApp", url: siteConfig.social.whatsapp },
];

export async function Footer({ lng }: { lng: string }) {
    const { t } = await getT("common", { lng });
    const year = new Date().getFullYear();
    const phone = siteConfig.contact.phone;
    const email = siteConfig.contact.email;
    const address = getLocalizedSiteField(siteConfig.contact.address, lng);
    const about = getLocalizedSiteField(siteConfig.description, lng);
    const socialLinks = SOCIAL_ITEMS.filter((item) => Boolean(item.url));
    const href = (path: string) => localizedHref(lng, path);

    return (
        <footer className="relative overflow-hidden bg-primary text-primary-foreground/70">
            <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <SiteLogo textClassName="font-display text-2xl font-bold tracking-tight text-white" highlightClassName="text-accent" />
                    <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">{about}</p>
                    {socialLinks.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-dark rounded-full px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">{t("footer.links")}</h4>
                    <ul className="space-y-3 text-sm">
                        {LINKS.map((l) => (
                            <li key={l.href}>
                                <Link href={href(l.href)} className="hover:text-accent transition-colors">{t(l.key)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">{t("footer.services")}</h4>
                    <ul className="space-y-3 text-sm">
                        {SERVICE_LINKS.map((l) => (
                            <li key={l.href}>
                                <Link href={href(l.href)} className="hover:text-accent transition-colors">{t(l.key)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">{t("footer.contact")}</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />{address}</li>
                        <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                            <a href={"tel:" + phone.replace(/\s+/g, "")} className="hover:text-accent transition-colors">{phone}</a>
                        </li>
                        <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                            <a href={"mailto:" + email} className="hover:text-accent transition-colors">{email}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                aria-hidden
                className="font-display text-outline select-none text-center leading-[0.8] text-[20vw] font-extrabold -mb-[3vw] opacity-60"
            >
                {siteConfig.logo.name}
            </div>
            <div className="relative border-t border-white/10 py-6 text-center text-xs text-primary-foreground/55">
                © {year} {siteConfig.logo.name}{siteConfig.logo.nameHighlight}. {t("footer.rights")}
            </div>
        </footer>
    );
}
