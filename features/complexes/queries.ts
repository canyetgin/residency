import 'server-only'; // safe guard for server-side execution only

import { serverCan } from '@/lib/permissions';
import { cacheTag } from 'next/cache';
//@ts-expect-error: we will implement this later
import { supabase } from '@/lib/supabase/server';
import { type ComplexDTO, complexDtoSchema } from '@/schemes/complexes.scheme';
import { organizationIdSchema } from '@/schemes/organizations.scheme';
import { z } from 'zod';

export async function adminGetComplexesList(organizationId: string): Promise<ComplexDTO[]> {
  //precheck for param type
  const validatedInput = organizationIdSchema.safeParse(organizationId);
  if (!validatedInput.success) {
    throw new Error('Invalid format');
  }

  //DAL and Zero trust architecture layer, for the latest approch for data security
  const isAllowed = await serverCan('properties:list:view');
  if (!isAllowed) {
    throw new Error('Not Allowed');
  }

  const rawData = await getCachedComplexes(validatedInput.data);

  const sanitizedFields = z.array(complexDtoSchema).safeParse(rawData);

  if (!sanitizedFields.success) {
    throw new Error('Data mismatch');
  }

  return sanitizedFields.data;
}

async function getCachedComplexes(organizationId: string) {
  'use cache';

  cacheTag(`complex-list-${organizationId}`);

  const { data, error } = await supabase
    .from('complexes')
    .select('id, name, address, createdAt:created_at')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
