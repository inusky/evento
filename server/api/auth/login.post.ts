import { prisma } from '~~/server/utils/prisma';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const ok = await bcrypt.compare(password, user?.password!);
    if (!ok) {
      return { error: 'Invalid credentials' };
    }

    await setUserSession(event, {
      user: {
        id: user?.id,
        email: email,
        password: password,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
});
