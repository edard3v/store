import { column, defineDb, defineTable } from "astro:db";

const Accounts = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text({ unique: true }),
    password: column.text(),
    createAt: column.date({ default: new Date() }),
    role: column.text({ references: () => Roles.columns.id }),
  },
});

const Roles = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ unique: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Accounts,
    Roles,
  },
});
