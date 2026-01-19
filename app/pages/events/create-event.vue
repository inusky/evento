<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton text-left mb-6 text-5xl">Create Event</h1>
      <UForm
        :schema="schema"
        :state="formData"
        @submit="onSubmit"
        class="space-y-4"
      >
        <UFormField label="Title" name="title">
          <UInput
            v-model="formData.title"
            class="w-full"
            placeholder="Event title"
          />
        </UFormField>

        <UFormField label="Content" name="content">
          <UTextarea
            autoresize
            v-model="formData.content"
            class="w-full"
            placeholder="Enter event details..."
          />
        </UFormField>

        <UButton type="submit" :loading="loading" class="w-full" size="lg">
          Create event
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup';
import { format } from 'date-fns';
const toast = useToast();

const loading = ref(false);
const formData = reactive({
  title: '',
  content: '',
  date: new Date(),
});

const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3'),
  content: yup
    .string()
    .required('Text is required')
    .min(10, 'Text must be at least 10'),
  date: yup.date().nullable(),
});

async function onSubmit(event) {
  event.preventDefault();
  loading.value = true;

  try {
    const data = await $fetch('/api/events/event', {
      method: 'post',
      body: formData,
    });
    if (data.success) {
      toast.add({
        title: 'Success',
        description: 'Event added successfully',
        color: 'success',
      });
      await navigateTo('/');
    } else {
      toast.add({
        title: 'Error',
        description: 'Failed to create event',
        color: 'error',
      });
    }
  } catch (err) {
    toast.add({
      title: 'Sorry, something went WRONG',
      description: err.message,
      color: 'error',
      actions: [
        {
          title: 'Close',
          onClick: () => {
            toast.clear();
          },
        },
      ],
    });
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  middleware: ['create-event'],
});
</script>
