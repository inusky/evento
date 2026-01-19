import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    loading: false,
  }),
  actions: {
    async checkAuth() {
      try {
        const result: any = await $fetch('/api/auth/me');
        if (result.user) {
          this.user = result.user;
        } else {
          this.user = null;
        }
      } catch {
        this.user = null;
      }
    },
    async login(email: string, password: string) {
      this.loading = true;
      try {
        const result: any = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        });
        if (result.error) {
          return result.error;
        } else {
          await this.checkAuth();
          return null;
        }
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      const result: any = await $fetch('/api/auth/logout', { method: 'POST' });
      if (result.error) {
        return result.error;
      } else {
        this.user = null;
        return null;
      }
    },
    async register(email: string, password: string) {
      this.loading = true;
      try {
        const result: any = await $fetch('/api/auth/register', {
          method: 'POST',
          body: { email, password },
        });
        if (result.error) {
          return result.error;
        } else {
          return await this.login(email, password);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
