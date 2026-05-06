import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres%402024@localhost:5432/school-flow?connect_timeout=8",
  },
});