import { prisma } from '~~/server/utils/prisma';
import { checkUserSession } from '~~/server/utils';

export default defineEventHandler(async (event) => {
  try {
    const session = checkUserSession(event);
    const { id } = await readBody(event);
    if (!session) {
      return { error: 'Unauthorized' };
    }

    await prisma.event.delete({ where: { id } });
    return { success: true, message: 'Event deleted successfully' };
  } catch (err: any) {
    console.error('Error deleting event:', err);
    return {
      error: err.message || 'An error occurred while deleting the event.',
    };
  }
});
