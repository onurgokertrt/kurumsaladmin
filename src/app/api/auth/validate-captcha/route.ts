import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../../../utils/handleError';
import { Language } from '../../../types/language';
import { HTTP_STATUS_CODE_ERROR, HTTP_STATUS_CODE_SUCCESS } from '../../../constants';

export async function POST(req: NextRequest) {
  let body
  const textBody = await req.text();
  body = textBody ? JSON.parse(textBody) : {}
  const { token } = body;
  const lang = (req.headers.get("Accept-Language") || "tr") as Language

  try {
    const secretKey = process.env.CLOUDFLARE_SECRET_KEY!;
    const response = await fetch(process.env.CLOUDFLARE_SITE_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
    });
  
    const data = await response.json();
    if (data.success) {
      return NextResponse.json("OK", { status: HTTP_STATUS_CODE_SUCCESS.OK });
    } else {
      return NextResponse.json(data['error-codes'], { status: HTTP_STATUS_CODE_ERROR.FORBIDDEN });

    }
  } catch (error) {
    console.log(error)
    handleError("auth","post",error)
  }
}