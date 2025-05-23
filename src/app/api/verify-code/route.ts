import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username , code } = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username: decodedUsername})

        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            },{status: 404})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "Account verified successfully"
            },{status: 200})
        } else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verfication Code is Expired, please signup again to get a new code"
            },{status: 400})
        } else{
            return Response.json({
                success: false,
                message: "Incorrect Verification Code"
        },{status: 400})
        }
    } catch (error) {
        console.log("Error verifying user ",error)
        return Response.json({
            success: false,
            message: "Error while verifying the user"
        },{status: 500})
    }

}