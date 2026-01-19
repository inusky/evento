import { prisma } from '~~/server/utils/prisma';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
});
