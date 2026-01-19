export default defineEventHandler(async (event) => {
  try {
    const session = await checkUserSession(event);
    const events = await prisma.event.findMany({
      where: { authorId: session.id },
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
    return { success: true, data: events };
  } catch (err: any) {
    return { error: err.message || 'An error occurred while fetching events.' };
  }
});
