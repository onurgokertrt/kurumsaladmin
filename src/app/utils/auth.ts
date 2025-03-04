import CryptoJS from "crypto-js";
import axios from "axios";
import { handleError } from "./handleError";
import { SignJWT } from "jose";
import { User } from "../types/user";

export async function sendOTPMessage(phone:string, method:string, params:string, code:string|undefined) {
    const createSoapEnvelope = (method:string,params:string) => {
        // SOAP isteği için gerekli XML şablonunu oluşturma
        const soapEnvelope = `
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
            <sendSingleSMS xmlns="http://tempuri.org/">
                <username>trt.otp</username>
                <password>T3K9L1A2</password>
                <numbers>${phone}</numbers>
                <message>TRT Kurumsal giris sifreniz: ${code}</message>
                <origin>TRT</origin>
                <sd></sd>
                <ed></ed>
            </sendSingleSMS>
            </soap:Body>
        </soap:Envelope>
        `;
        
        return soapEnvelope;
      };

    const soapEnvelope = createSoapEnvelope(method, params);

    // SOAP isteği oluşturma
    try {
        const response = await axios.post(process.env.SOAP_URL!, soapEnvelope, {
          headers: {
            'Content-Type': 'text/xml',
            'SOAPAction': method,
          },
        });

        return response.data;
      } catch (error) {
        console.log("Error:" + (error as any).body)
        handleError("auth","sendOTPmessage",error)
        throw error;
      }
}

export function generateOTPCode():number {
    return Math.floor(100000 + Math.random() * 900000);
}

export const getJwtSecretKey = () => {
  const secretKey = process.env.SECRET_JWT_SECRET_KEY

  if (!secretKey)
      throw new Error("secretKey is not defined")

  return new TextEncoder().encode(secretKey)
}

export const createToken = async (user:User) => {
  const token = await new SignJWT({
    id: user?.id,
    phone: user?.phone
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(getJwtSecretKey())
  return token;
}