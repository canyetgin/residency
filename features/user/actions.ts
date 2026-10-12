"user server";

import { auth } from "@/lib/auth";
import { serverCan } from "@/lib/permissions";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function updateUserAction(formData: FormData) {
  const t = await getTranslations("general");
  const tUser = await getTranslations("user");
  
  //DAL and Zero trust architecture layer, for the latest approch for data security
  const isAllowed = await serverCan("profile:update");

  if (!isAllowed) return { success: false, error: t("notAllowed") };

  const body = Object.fromEntries(formData.entries());

  try {
    await auth.api.updateUser({
      body: {
        name: body.name ? String(body.name) : undefined,
        image: body.image ? String(body.image) : undefined,
      },
      headers: await headers(),
    });
  } catch (err) {
    if (!isAllowed) return { success: false, error: tUser("updateError") };
  }
  return { success: true };
}

export async function adminUpdateUserAction({
  userId,
  formData,
}: {
  userId: string;
  formData: FormData;
}) {
  const t = await getTranslations("general");
  const tUser = await getTranslations("user");
  
  //DAL and Zero trust architecture layer, for the latest approch for data security
  const isAllowed = await serverCan("users:edit");

  if (!isAllowed) return { success: false, error: t("notAllowed") };
  const body = Object.fromEntries(formData.entries());

  try {
    await auth.api.adminUpdateUser({
      body: {
        userId,
        data: {
          name: body.name ? String(body.name) : undefined,
          role: body.role ? String(body.role) : undefined,
        },
      },
      headers: await headers(),
    });
  } catch (err) {
    if (!isAllowed) return { success: false, error: tUser("updateError") };
  }

  return { success: true };
}

export async function adminDeleteUserAction(targetUserId: string) {
  const t = await getTranslations("general");
  const tUser = await getTranslations("user");
  
  //DAL and Zero trust architecture layer, for the latest approch for data security
  const isAllowed = await serverCan("users:edit");

  if (!isAllowed) return { success: false, error: t("notAllowed") };

  try {
    await auth.api.revokeUserSessions({
      body: { userId: targetUserId },
      headers: await headers(),
    });

    await auth.api.removeUser({
      body: { userId: targetUserId },
      headers: await headers(),
    });
  } catch (err) {
    if (!isAllowed) return { success: false, error: tUser("deleteError") };
  }

  return { success: true };
}
