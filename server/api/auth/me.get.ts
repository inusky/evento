export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    return { user: session.user };
  } catch (err: any) {
    return { error: 'Unauthorized' };
  }
});
