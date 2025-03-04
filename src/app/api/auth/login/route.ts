import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../../../utils/handleError';
import { Language } from '../../../types/language';
import { HTTP_STATUS_CODE_ERROR, HTTP_STATUS_CODE_SUCCESS } from '@/app/constants';
import { validateLogin } from '@/app/utils/validator';

export async function POST(req: NextRequest) {
  let body
  const textBody = await req.text();
  body = textBody ? JSON.parse(textBody) : {}
  const {username, password, captchaToken } = body

  const lang = (req.headers.get("Accept-Language") || "tr") as Language

  //validation
  const errors = validateLogin(body, lang)
  
  if (errors.length > 0) {
    console.log(errors);
    return NextResponse.json(errors, { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST })
  }

  try {
    const apiKey = process.env.BTCORE_XAPIKEY!
    const bearerToken = process.env.BTCORE_BEARER_TOKEN!

    const response = await fetch(`${process.env.BTCORE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        
        "x-api-key": apiKey,
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify({ "email": username, "password": password, "token": captchaToken })
    });


    const data = await response.text()

    console.log("data", data)

    return NextResponse.json("OK", { status: HTTP_STATUS_CODE_SUCCESS.OK })

  } catch (error) {
    console.log(error)
    handleError("auth","post", error)

    return NextResponse.json(error, { status: HTTP_STATUS_CODE_ERROR.BAD_REQUEST })
  }
}