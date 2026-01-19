export async function checkUserSession(event: any) {
  if (!event.context.auth || !event.context.auth.user) {
    return 'Unauthorized';
  }
  return event.context.auth.user;
}
