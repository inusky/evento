<template>
  <div v-if="pending" class="flex justify-center items-center min-h-screen">
    <span>Loading events...</span>
  </div>
  <div
    v-else-if="!events?.success"
    class="flex justify-center items-center min-h-screen"
  >
    <span class="text-red-500">Error: {{ events?.error }}</span>
  </div>
  <div
    v-else-if="events?.data.length === 0"
    class="flex justify-center items-center min-h-screen"
  >
    <p class="text-center mt-10">No events found.</p>
  </div>
  <div
    v-else
    v-for="event in events?.data"
    :key="event.id"
    class="columns-1 md:columns-2 lg:columns-3 xl:columns-2 gap-4 space-y-4 mt-7"
  >
    <UCard
      class="break-inside-avoid mb-4 hover:shadow-lg transition-shadow duration-300"
      :ui="{
        body: 'p-4',
        header: 'px-4 py-3',
      }"
    >
      <template #header>
        <div class="flex items-start justify-between">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2"
          >
            {{ event.title }}
          </h3>
        </div>
      </template>

      <div class="space-y-3">
        <p class="text-gray-600 dark:text-gray-300 text-sm">
          {{ event.content }}
        </p>

        <div class="space-y-2">
          <div
            class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <UIcon name="i-heroicons-calendar-days" />
            <span> {{ format(event.createdAt, 'd MMM, yyyy') }} </span>
          </div>
        </div>

        <div>
          <span
            v-if="event.status === 'completed'"
            class="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
          >
            Completed
          </span>
          <span
            v-else
            class="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
          >
            Pending
          </span>
        </div>

        <UButton
          v-if="event.status !== 'completed'"
          variant="outline"
          class="flex mt-2 gap-2 text-xs"
          @click="completeOrDeleteEvent(event.id, 'complete')"
          >Complete and Archive</UButton
        >

        <UButton
          v-else
          variant="outline"
          class="flex mt-2 gap-2 text-xs"
          color="error"
          @click="completeOrDeleteEvent(event.id, 'delete')"
          >Delete</UButton
        >
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';

const {
  pending,
  data: events,
  refresh,
}: any = await useFetch('/api/events/event');
const toast = useToast();

async function completeOrDeleteEvent(
  id: string,
  action: 'complete' | 'delete'
) {
  try {
    const data = await $fetch<{ success: boolean; message: string }>(
      `/api/events/event`,
      {
        method: action === 'complete' ? 'patch' : 'delete',
        body: {
          id,
        },
      }
    );

    if (!data.success) {
      toast.add({
        title: 'Error',
        description: `Failed to ${action} event`,
        color: 'error',
      });
    } else {
      toast.add({
        title: 'Success',
        description: `Event ${action}d successfully`,
        color: 'success',
      });
      await refresh();
    }
  } catch (err: any) {
    toast.add({
      title: 'Error',
      description: `An error occurred: ${err.message}`,
      color: 'error',
    });
  }
}
</script>
