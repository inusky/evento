import { prisma } from '~~/server/utils/prisma';
import { checkUserSession } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await checkUserSession(event);

    if (!user || user === 'Unauthorized') {
      return { error: 'Unauthorized' };
    }

    if (
      !body.title ||
      typeof body.title !== 'string' ||
      !body.content ||
      typeof body.content !== 'string'
    ) {
      return { error: 'Invalid input: title and content are required strings' };
    }

    let createdAt = new Date();
    if (body.date) {
      const parsedDate = new Date(body.date);
      if (isNaN(parsedDate.getTime())) {
        return { error: 'Invalid date format' };
      }
      createdAt = parsedDate;
    }

    const newEvent = await prisma.event.create({
      data: {
        title: body.title.trim(),
        content: body.content.trim(),
        createdAt,
        author: {
          connect: { id: user.id },
        },
      },
    });

    return { success: true, event: newEvent };
  } catch (err) {
    console.error('Error creating event:', err);
    return {
      error: 'Internal server error',
    };
  }
});
