<template>
  <UContainer class="flex flex-col container">
    <h1 class="font-anton">You've been logged out.</h1>
    <p>Please log in again.</p>
    <UButton class="btn" @click="signin" variant="outline">Log in</UButton>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    () => {
      const store = useAuthStore();
      store.logout();

      if (store.user === 'Unauthorized') {
        alert('Unauthorized');
      }
    },
  ],
});

async function signin() {
  await navigateTo('/auth/sign-in');
}
</script>

<style scoped>
.container {
  align-items: center;
  gap: 3rem;
}

h1 {
  margin-top: 2rem;
  font-size: 2rem;
}

p {
  font-size: 1.5rem;
}
</style>
