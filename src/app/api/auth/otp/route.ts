import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../types/user';
import { createToken } from '../../../utils/auth';
import { prisma } from '../../../utils/db';
import { logAction } from '../../../utils/logAction';
import { HTTP_STATUS_CODE_ERROR } from '../../../constants';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: User = await req.json();
    const { id, phone, code } = body;

    if (!id || !phone || !code) {
      return NextResponse.json(
        { message: 'Kullanıcı bilgileri hatalıdır!' },
        { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST }
      );
    }

    const user: User = {
      id,
      phone,
    };

    const codeData = await prisma.smsLog.findMany({
      where: {
        phone: parseInt(phone || '0'), // Kullanıcı telefonunu parse etmek
        code: parseInt(code),
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 1,
    });

    if (codeData.length > 0) {
      await prisma.smsLog.update({
        where: {
          id: codeData[0].id,
        },
        data: {
          is_used: 1,
        },
      });

      const token = await createToken(user);

      const userInformations = {
        id: user.id,
        phone: user.phone,
      };

      const response = NextResponse.json({ token });

      // Çerezleri ayarlama
      response.cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 3600,
        sameSite: 'lax',
      });

      response.cookies.set(
        'userInformations',
        JSON.stringify(userInformations),
        {
          path: '/',
          httpOnly: true,
          maxAge: 3600,
          sameSite: 'lax',
        }
      );      

      return response;
    } else {
      logAction(
        'otp',
        'post',
        `${user.phone} için ${code} OTP kodu hatalıdır!`
      );

      return NextResponse.json({ message: 'OTP kodu hatalıdır!', status: 401 });
    }
  } catch (error) {
    console.log(error);
    logAction(
      'otp',
      'post',
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json({ message: 'Sunucu hatası!', status: 500 });
  }
}
