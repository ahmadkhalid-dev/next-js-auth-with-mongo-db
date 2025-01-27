import { connect } from '@/config/database'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/utils/mailer'
import { generateToken, tokenExpiry } from '@/utils/token'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const verifyToken = generateToken();
        const verifyTokenExpiry = tokenExpiry();

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            verifyToken,
            verifyTokenExpiry
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        const actionUrl = `${process.env.APP_URL}/verify?token=${verifyToken}`;

        const emailContent = generateMailTemplate({
            subject: 'Verify Your Email',
            userName: username,
            emailBody: 'Please verify your email by clicking the link below.',
            actionUrl: actionUrl,
            actionText: 'Verify Email'
          });

        await sendMail({
            to: email,
            subject: "Verify Email",
            html: emailContent
        });

        return NextResponse.json({
            success: true,
            message: "User registered successfully. Please check your email for verification.",
            savedUser,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}

/**** Libraries used for validation ****/

// **** Yup ****
// - Yup is commonly used for client-side validation.
// - Works seamlessly with form libraries like React Hook Form and Formik.
// - Allows you to define a schema and validate inputs against that schema.
// - Great for handling complex form validation rules.
// Example: Define rules like required fields, min/max length, and custom messages.

// **** Zod ****
// - Zod is a powerful schema declaration and validation library.
// - It is TypeScript-friendly, making it ideal for TypeScript-based projects.
// - You can define schemas with strict type checking.
// - Perfect for both client-side and server-side validation.
// Example: Parse input data and get strong type inference or error handling.

// **** Joi ****
// - Joi is best suited for server-side validation, especially for API requests.
// - Often used to validate request bodies, query parameters, or headers.
// - Provides detailed error messages for invalid inputs.
// Example: Create a middleware for validating API request payloads against a schema.