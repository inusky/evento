<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton text-center mb-6 text-5xl">
        {{ type == 'sign-up' ? 'Sign up' : 'Sign in' }}
      </h1>

      <UForm
        :schema="schema"
        :state="formData"
        @submit="onSubmit"
        class="space-y-4"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="formData.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="formData.password" type="password" class="w-full" />
        </UFormField>

        <UButton
          type="button"
          trailing-icon="i-lucide-arrow-left"
          variant="ghost"
          color="neutral"
          @click="navigateTo('/')"
        >
          Go back
        </UButton>
        <UButton
          type="submit"
          trailing-icon="i-lucide-arrow-right"
          :loading="loading"
        >
          {{ type == 'sign-up' ? 'Sign up' : 'Sign in' }}
        </UButton>
      </UForm>

      <USeparator />
      <UButton
        type="button"
        trailing-icon="mdi:account-alert-outline"
        variant="ghost"
        color="info"
        @click="type = type == 'sign-up' ? 'sign-in' : 'sign-up'"
      >
        I want to {{ type == 'sign-up' ? 'Sign in' : 'Sign up' }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';

const authStore = useAuthStore();
const type = ref('sign-in');
const loading = ref(false);
let formData = reactive({
  email: '',
  password: '',
});

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6')
    .required('Password is required'),
});

async function onSubmit(event: any) {
  event.preventDefault();
  loading.value = true;

  if (type.value === 'sign-up') {
    const result = await authStore.register(formData.email, formData.password);
    if (result) {
      alert(result);
      formData.email = '';
      formData.password = '';
    } else {
      await navigateTo('/');
    }
  } else {
    const result = await authStore.login(formData.email, formData.password);
    if (result) {
      alert(result);
      formData.email = '';
      formData.password = '';
    } else {
      await navigateTo('/');
    }
  }
  loading.value = false;
}

definePageMeta({
  layout: 'auth',
});
</script>
