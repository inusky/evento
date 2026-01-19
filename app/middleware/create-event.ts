export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const store = useAuthStore();
    await store.checkAuth();

    if (to.path === '/events/create-event') {
      if (store.user) {
        return;
      } else {
        return abortNavigation('Unauthorized');
      }
    }
  } catch (err) {
    return navigateTo('/');
  }
});
