"use server";
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const valid = RegisterSchema.safeParse(values);
    if (!valid.success) {
        return { error: "Invalid Credentials" };
    }

    const { email, password, name } = valid.data;
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
        return { error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return { success: "Confirmation email sent!" };
};
