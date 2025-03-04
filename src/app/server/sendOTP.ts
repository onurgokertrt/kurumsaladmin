import soapRequest from "easy-soap-request";
import { generateOTPCode } from "../utils/auth";

const sendOTP = async (gsmNo: string) => {
  const url = "https://otp.ttmesaj.com/otpsms.asmx";
  const OTPCode = generateOTPCode();

  const headers = {
    "Content-Type": "text/xml; charset=utf-8",
    soapAction: "http://tempuri.org/sendSingleSMS",
  };

  // example data
  const xml = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <sendSingleSMS xmlns="http://tempuri.org/">
        <username>trt.otp</username>
        <password>T3K9L1A2</password>
        <numbers>${gsmNo}</numbers>
        <message>SMS Onay Kodu: ${OTPCode}</message>
        <origin>TRT</origin>
        <sd></sd>
        <ed></ed>
      </sendSingleSMS>
    </soap:Body>
  </soap:Envelope>
  `;

  try {
    const response = await soapRequest({ url, headers, xml });

    if (response.response.statusCode === 200) return OTPCode;
    else console.error("Error in OTP connection");
  } catch (error) {
    console.error("tt soap otp sms service request error body : ", (error as any).body);
    throw error;
  }
};

export default sendOTP;
