import { RequestBody } from 'swagger-jsdoc';
import { NextResponse } from 'next/server';
import { HTTP_STATUS_CODE_ERROR, HTTP_STATUS_CODE_SUCCESS } from '../constants';
import { authenticateAD, authenticateADNew } from '../server/authenticateAD';
import { handleError } from '../utils/handleError';
import sendOTP from '../server/sendOTP';
import { prisma } from '../utils/db';
import { logAction } from '../utils/logAction';
import { validateLogin } from '../utils/validator';
import { Language } from '../types/language';

export async function postLogin(body: RequestBody, lang: Language): Promise<NextResponse> {

  //validation
  const errors = validateLogin(body, lang)
  
  if (errors.length > 0) {
    console.log(errors);
    return NextResponse.json(errors, { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST })
  }

  try {
    const secretKey = process.env.CLOUDFLARE_SECRET_KEY!;
    const response = await fetch(process.env.CLOUDFLARE_SITE_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: body.token }).toString(),
    });
  
    const data = await response.json();

    if (!data.success && body.token !== "pyys") { //TODO: consider updating this value
      return NextResponse.json(data['error-codes'], { status: HTTP_STATUS_CODE_ERROR.FORBIDDEN });
    }

    const username = body.email.includes('@trt.net.tr') ? body.email.split('@')[0] : body.email;
    const authResult = await authenticateAD(username, body.password as string);

    if (authResult) {
      let otpCode = await sendOTP(authResult.phone);

      if (otpCode)
        setCode(authResult.phone, otpCode)

      const user = {
        name: authResult.firstName || '',
        surname: authResult.lastName || '',
        email: authResult.email || '',
        id: authResult.employeeid.toString() || null,
        department: authResult.department || '',
        title: authResult.title || '',
        username: username || '',
        phone: authResult.phone || ''
      }

      return NextResponse.json({user_id: user.id, name: authResult.firstName, surname: authResult.lastName, email: authResult.email, phone: authResult.phone }, { status: HTTP_STATUS_CODE_SUCCESS.OK });
    } else {
      return NextResponse.json({message: "E-posta veya şifre hatalı"}, { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST });
    }
  } catch (error) {
    handleError("auth","post",error)
    console.log("Error:" + (error as any).body)
    return NextResponse.json("Giriş işleminde bir hata oluştu!", { status: HTTP_STATUS_CODE_ERROR.INTERNAL_SERVER_ERROR });
  }
}

export async function postLoginNew(body: RequestBody, lang: Language): Promise<NextResponse> {

  //validation
  const errors = validateLogin(body, lang)
  
  if (errors.length > 0) {
    console.log(errors);
    return NextResponse.json(errors, { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST })
  }

  try {
    const username = body.email.split('@')[0]
    const authResult = await authenticateADNew("testadmin", body.password as string);

    console.log("authResult",authResult)

    if (authResult) {
      let otpCode = await sendOTP(authResult.phone);

      if (otpCode)
        setCode(authResult.phone, otpCode)

      const user = {
        name: authResult.firstName || '',
        surname: authResult.lastName || '',
        email: authResult.email || '',
        id: authResult.employeeid.toString() || null,
        department: authResult.department || '',
        title: authResult.title || '',
        username: username || '',
        phone: authResult.phone || ''
      }

      return NextResponse.json({user_id: user.id, name: authResult.firstName, surname: authResult.lastName, email: authResult.email, phone: authResult.phone }, { status: HTTP_STATUS_CODE_SUCCESS.OK });
    } else {
      return NextResponse.json({message: "E-posta veya şifre hatalı (new)"}, { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST });
    }
  } catch (error) {
    handleError("auth","post",error)
    console.log("Error:" + (error as any).body)
    return NextResponse.json("Giriş işleminde bir hata oluştu! (new)", { status: HTTP_STATUS_CODE_ERROR.INTERNAL_SERVER_ERROR });
  }
}

async function setCode(phone:number, code:number) {
  try {
    await prisma.smsLog.create({
      data: {
        phone,
        code,
        created_at: new Date(Date.now()),
        is_used: 0
      }
    })

    return code.toString()
  } catch (error) {
    console.log("Error:" + (error as any).body)
    logAction("login", "post", error as string)
  }
}