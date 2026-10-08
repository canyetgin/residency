"use client"

import { useTransition } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"

export function useChangeLocale() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  // Safeguard for null locale. Incase. Also for ts type err.
  const changeLocale = (nextLocale: string | null) => {
    // Eğer değer boş veya null ise hiçbir şey yapma
    if (!nextLocale) return

    router.replace(pathname, { locale: nextLocale })
  }

  return {
    currentLocale,
    changeLocale,
  }
 
}
