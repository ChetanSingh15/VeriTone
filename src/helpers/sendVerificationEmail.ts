import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string, 
    verifyCode: string
): Promise<ApiResponse> {
     try {
        await resend.emails.send({
            from: 'chetanrabary@gamil.com',
            to: email,
            subject: 'VeriTone | Verification code',
            react: VerificationEmail({username, otp:verifyCode}),
          });
        return {success: true, message: "Verification email send successfully"}
        
     } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success: false, message: "Failed to send verification email"}
     }
}

