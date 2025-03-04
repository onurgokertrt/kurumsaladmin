import { NextRequest } from 'next/server';
import { handleError } from '../../../utils/handleError';
import { postLoginNew } from '../../../services/authService';
import { Language } from '../../../types/language';

export async function POST(req: NextRequest) {
  let body
  const textBody = await req.text();
  body = textBody ? JSON.parse(textBody) : {}
  const lang = (req.headers.get("Accept-Language") || "tr") as Language

  try {
    return await postLoginNew(body, lang)
  } catch (error) {
    console.log(error)
    handleError("auth","post",error)
  }
}