import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "@/src/components/localeSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: "en",
          label: t("en"),
        },
        {
          value: "kn",
          label: t("kn"),
        },
      ]}
      label={t("label")}
    />
  );
}
