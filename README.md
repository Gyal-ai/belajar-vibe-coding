# Belajar Vibe Coding — Backend API

Backend API modern menggunakan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## Tech Stack

- **Runtime & Package Manager:** [Bun](https://bun.sh/)
- **Framework:** [ElysiaJS](https://elysiajs.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database Driver:** `mysql2`
- **API Documentation:** `@elysiajs/swagger` (Swagger UI)

## Struktur Folder

```
src/
├── index.ts          # Server entrypoint & plugins (Swagger, routes)
├── db/
│   ├── index.ts      # Drizzle MySQL connection instance
│   └── schema.ts     # Table schema definition (users)
└── routes/
    └── users.ts      # CRUD endpoints untuk /users
drizzle.config.ts     # Konfigurasi Drizzle Kit
```

## Persiapan & Instalasi

1. Clone repositori ini dan masuk ke direktori:
   ```bash
   git clone <repo-url>
   cd belajar-vibe-coding
   ```

2. Install dependencies menggunakan Bun:
   ```bash
   bun install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan konfigurasi `DATABASE_URL` dengan kredensial database MySQL Anda.

## Database Migrations

- **Generate migration SQL:**
  ```bash
  bun run db:generate
  ```

- **Jalankan migration ke MySQL:**
  ```bash
  bun run db:migrate
  ```

- **Buka Drizzle Studio (Web GUI database):**
  ```bash
  bun run db:studio
  ```

## Menjalankan Server

- **Development mode (dengan hot reload / watch):**
  ```bash
  bun run dev
  ```

- **Production mode:**
  ```bash
  bun run start
  ```

Server akan aktif di `http://localhost:3000`.

## Dokumentasi API (Swagger)

Akses Swagger UI melalui browser di:
- `http://localhost:3000/swagger`

## API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Health check & info |
| `GET` | `/swagger` | Swagger UI Documentation |
| `GET` | `/users` | List semua users |
| `GET` | `/users/:id` | Detail user berdasarkan ID |
| `POST` | `/users` | Buat user baru |
| `PUT` | `/users/:id` | Update data user |
| `DELETE` | `/users/:id` | Hapus user |
