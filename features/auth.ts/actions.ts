'use server'; //to create RPC Func for handshake and not to expose to client

import { signInSchema, signInValues } from '@/schemes/auth.scheme';
import { auth } from '@/lib/auth';
import { isAPIError } from 'better-auth/api';

type ActionResponse =
  { success: true; error?: never } | { success: false; error: { status: number; message: string } };

export async function signInAction(values: signInValues): Promise<ActionResponse> {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: { status: 400, message: 'Geçersiz veya manipüle edilmiş istek.' },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error('Giriş işlemi sırasında sunucu hatası:', err);

    const status = isAPIError(err) ? err.status : err?.status || 500;

    //OWASP - Input sanitization and API Shielding. we didnt render the validation errors so people wont know our validation rules.
    if (status === 401 || status === 404 || status === 'UNAUTHORIZED') {
      return {
        success: false,
        error: { status: 401, message: 'E-posta veya şifre hatalı.' },
      };
    }
    if (status === 403 || status === 'FORBIDDEN') {
      return {
        success: false,
        error: {
          status: 403,
          message: 'E-posta adresiniz doğrulanmamış. Gelen kutunuzdaki bağlantıyı kullanın.',
        },
      };
    }
    if (status === 429 || status === 'TOO_MANY_REQUESTS') {
      return {
        success: false,
        error: {
          status: 429,
          message: 'Çok fazla deneme yaptınız. Biraz sonra tekrar deneyin.',
        },
      };
    }

    return {
      success: false,
      error: { status: 500, message: 'Sistemde teknik bir hata oluştu.' },
    };
  }
}
