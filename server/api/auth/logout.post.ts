export default defineEventHandler(async (event) => {
  try {
    await clearUserSession(event);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
});
