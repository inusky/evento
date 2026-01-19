<template>
  <UHeader>
    <template #title>
      <p class="font-anton text-3xl">Event0</p>
    </template>

    <UNavigationMenu :items="items" />

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
});

const items = computed(() => {
  const baseItems = [{ label: 'Home', to: '/', active: false }];

  if (authStore.user) {
    baseItems.push(
      { label: 'Create event', to: '/events/create-event', active: false },
      { label: 'Logout', to: '/auth/log-out', active: false }
    );
  } else {
    baseItems.push(
      { label: 'Create event', to: '/events/create-event', active: false },
      {
        label: 'Sign up/Log in',
        to: '/auth/sign-in',
        active: false,
      }
    );
  }

  return baseItems;
});
</script>
