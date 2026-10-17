export const siteConfig = {
    logo: {
        src: "/images/logo.png",
        alt: "ShamsTravel",
        useImage: false,
        name: "Shams",
        nameHighlight: "Travel",
        initials: "ST",
    },

    description: {
        uz: "Shams Travel — sayohatingizni yorug' va tashvishsiz qiladigan kompaniya. Tayyor turlar, transport, joylashtirish va gid xizmatlari bir joyda.",
        ru: "Shams Travel — компания, которая делает ваши поездки яркими и беззаботными. Готовые туры, транспорт, проживание и гиды в одном месте.",
        en: "Shams Travel makes your trips bright and carefree. Ready-made tours, transport, stays and guides, all in one place.",
    },

    companyName: {
        uz: "Shams Travel",
        ru: "Shams Travel",
        en: "Shams Travel",
    },

    operator: {
        name: "Shams Travel Team",
    },

    contact: {
        email: "info@shamstravel.uz",
        phone: "+998 00 000 00 00",
        phoneSecondary: "",
        address: {
            uz: "Samarqand, O'zbekiston",
            ru: "Самарканд, Узбекистан",
            en: "Samarkand, Uzbekistan",
        },
    },

    social: {
        instagram: "",
        facebook: "",
        telegram: "",
        youtube: "",
        tiktok: "",
        whatsapp: "",
    },
};

export type SiteConfig = typeof siteConfig;
export type SupportedLocale = "uz" | "ru" | "en";

export function getLocalizedSiteField(
    field: Record<SupportedLocale, string>,
    lng: string
): string {
    return field[lng as SupportedLocale] ?? field.uz;
}