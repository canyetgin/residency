"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeLocale } from "@/hooks/use-change-locale";
import { useTranslations } from "next-intl";

const items = [
  { labelKey: "tr", value: "tr" },
  { labelKey: "en", value: "en" },
];

export default function LangSwitcher() {
  const { currentLocale, changeLocale } = useChangeLocale();
  const t = useTranslations("general.widgets.langSwitcher");

  return (
    <Select value={currentLocale} onValueChange={changeLocale}>
      <SelectTrigger className="w-full min-w-[140px]">
        <SelectValue placeholder={t("label")}>{t(currentLocale)}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("label")}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {t(item.labelKey)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
