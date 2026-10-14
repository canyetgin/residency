import "server-only"; // always need this for fetches requires will be on serverside only. IT WILL RAISE ERR IF YOU WILL MISTAKENLY IMPORT TO CLIENT-SIDE CODE. It's the safe guard.

import { cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { serverCan } from "@/lib/permissions";

export async function adminGetComplexesList(organizationId: string) {
  const t = await getTranslations("general.request");

  //DAL and Zero trust architecture layer, for the latest approch for data security
  const isAllowed = await serverCan("properties:list:view");
  if (!isAllowed) {
    throw new Error(t("notAllowed"));
  }

  return getCachedComplexes(organizationId);
}

async function getCachedComplexes(organizationId: string) {
  "use cache";

 
  cacheTag(`complex-list-${organizationId}`);

  const { data, error } = await supabase
    .from("complexes")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Veri çekme hatası:", error.message);
    throw new Error("Siteler yüklenemedi.");
  }

  return data || [];
}
