'use server'; //to create RPC Func for handshake and not to expose to client

import { auth } from '@/lib/auth';
import { signInSchema, signInValues } from '@/schemes/auth.scheme';
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
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true };
  } catch (rawErr: unknown) {
    if (!isAPIError(rawErr)) {
      return {
        success: false,
        error: { status: 500, message: 'Sistemde teknik bir hata oluştu.' },
      };
    }

    const authErrorStatus = rawErr.status;

    //OWASP - Input sanitization and API Shielding. we didnt render the validation errors so people wont know our validation rules.
    if (authErrorStatus === 'UNAUTHORIZED') {
      return {
        success: false,
        error: { status: 401, message: 'E-posta veya şifre hatalı.' },
      };
    }

    if (authErrorStatus === 'FORBIDDEN') {
      return {
        success: false,
        error: {
          status: 403,
          message: 'E-posta adresiniz doğrulanmamış. Gelen kutunuzdaki bağlantıyı kullanın.',
        },
      };
    }

    if (authErrorStatus === 'TOO_MANY_REQUESTS') {
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
