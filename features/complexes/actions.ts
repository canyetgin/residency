"user server"; //to create RPC Func for handshake and not to expose to client

import { updateTag } from "next/cache";
import { supabase } from "@/lib/supabase";
import { getTranslations } from "next-intl/server";
import { serverCan } from "@/lib/permissions";

export async function adminAddComplex(formData: FormData) {
  const t = await getTranslations("general");
  const tComplex = await getTranslations("complex");
  const tValidation = await getTranslations("validationApi");

  //DLA layer, for the latest approch for data security
  const isAllowed = await serverCan("properties:create");

  if (!isAllowed) return { success: false, error: t("notAllowed") };

  const organizationId = formData.get("organizationId") as string;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;

  if (!organizationId || !name) {
    return { success: false, error: t("missingFields") };
  }

  const { error } = await supabase
    .from("complexes")
    .insert({ organization_id: organizationId, name, address });

  if (error) {
    return { success: false, error: tComplex("createError") };
  }

  updateTag(`complex-list-${organizationId}`);

  return { success: true };
}
