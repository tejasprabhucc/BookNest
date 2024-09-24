export type Locale = (typeof locales)[number];

export const locales = ["en", "kn"] as const;
export const defaultLocale: Locale = "en";
