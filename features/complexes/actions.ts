'use server'; // to create RPC Func for handshake and not to expose to client

import { updateTag } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { getTranslations } from 'next-intl/server';
import { serverCanMutate } from '@/lib/permissions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { addComplexSchema, addComplesValues } from '@/schemes/complexes.scheme'; s

type ActionResponse = { success: true; error?: never } | { success: false; error: string };

export async function adminAddComplex(values: addComplesValues): Promise<ActionResponse> {
  const t = await getTranslations('general.request');
  const tComplex = await getTranslations('complex');

  const validatedFields = addComplexSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: t('missingFields') };
  }

  const { name, address } = validatedFields.data;

  //DAL and Zero trust architecture layer, for the latest approch for data security
  const isAllowed = await serverCanMutate('properties:create');
  if (!isAllowed) return { success: false, error: t('notAllowed') };

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const organizationId = session?.user?.activeOrganizationId;
  if (!organizationId) return { success: false, error: t('notAllowed') };

  const { error: dbError } = await supabase.from('complexes').insert({
    organization_id: organizationId,
    name,
    address: address || null,
  });

  if (dbError) {
    return { success: false, error: tComplex('createError') };
  }

  updateTag(`complex-list-${organizationId}`);

  return { success: true };
}
