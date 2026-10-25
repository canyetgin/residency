'use server';

import { auth } from '@/lib/auth';
import { signInSchema, type signInValues } from '@/schemes/auth.scheme';
import { isAPIError } from 'better-auth/api';

type ActionResponse = { success: true; error?: never } | { success: false; error: string };

export async function signInAction(values: signInValues): Promise<ActionResponse> {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Geçersiz veya manipüle edilmiş istek.',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true };
  } catch (rawErr: unknown) {
    if (isAPIError(rawErr)) {
      const authErrorStatus = rawErr.status;

      if (authErrorStatus === 'UNAUTHORIZED') {
        return {
          success: false,
          error: 'E-posta veya şifre hatalı.',
        };
      }

      if (authErrorStatus === 'FORBIDDEN') {
        return {
          success: false,
          error: 'E-posta adresiniz doğrulanmamış. Gelen kutunuzdaki bağlantıyı kullanın.',
        };
      }

      if (authErrorStatus === 'TOO_MANY_REQUESTS') {
        return {
          success: false,
          error: 'Çok fazla deneme yaptınız. Biraz sonra tekrar deneyin.',
        };
      }
    }

    return {
      success: false,
      error: 'Sistemde teknik bir hata oluştu.',
    };
  }
}
