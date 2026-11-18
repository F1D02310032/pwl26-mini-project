# Mini Project ETS - Movies REST API

## Identitas
- Nama: ADITYA
- NIM: F1D02310032
- Kasus: Movies API
- Live coding: PUT (digit terakhir NIM adalah 2)

## Gambaran
REST API CRUD untuk film menggunakan Express.js, Prisma, dan MySQL. Tabel utama `Movie` berelasi banyak-ke-satu dengan tabel kedua `Genre`. Tabel ketiga `Screening` digunakan untuk demonstrasi transaksi.

## Persyaratan
- Node.js dan npm
- MySQL/XAMPP

## Menjalankan
1. Salin `.env.example` menjadi `.env`.
2. Buat database `movies_db`.
3. Jalankan:
```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```
4. API tersedia di `http://localhost:3000`.

## Struktur Berlapis
```text
routes/        Definisi endpoint
controllers/   Penerima request dan response
services/      Aturan bisnis
data/          Operasi Prisma dan $transaction
validators/    Skema validasi Joi
middleware/    Logger dan error handler
prisma/        Schema, migrasi, dan seed
utils/         AppError dan async handler
screenshot/    Bukti pengujian
```

## Endpoint
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/movies?halaman=1&ukuran=10&judul=ADITYA` | Daftar, paginasi, dan filter judul |
| GET | `/movies/:id` | Detail film beserta genre dan screening |
| POST | `/movies` | Tambah film |
| PUT | `/movies/:id` | Ubah film; menguji 404 dan konflik unik 409 |
| DELETE | `/movies/:id` | Hapus film |
| GET | `/genres` | Genre beserta seluruh relasi film |
| GET | `/genres/:id` | Genre tertentu beserta film |
| POST | `/screenings` | Membuat pemesanan dan mengurangi kursi dalam transaksi |

## Validasi dan Status
- `400 BAD_REQUEST` untuk JSON request yang sintaksnya rusak.
- `422 VALIDATION_ERROR` untuk body yang tidak valid.
- `404 NOT_FOUND` untuk data atau rute tidak ditemukan.
- `409 UNIQUE_CONFLICT` untuk judul film duplikat.
- `409 INSUFFICIENT_SEATS` untuk kursi pemesanan tidak mencukupi.
- `500 INTERNAL_SERVER_ERROR` memakai pesan umum dan detail hanya dicatat pada server.

## Bukti Pengujian
Screenshot hasil pengujian Postman/REST Client tersedia di folder `screenshot/`:

| Status | Screenshot |
|---|---|
| 200 | [200.jpeg](screenshot/200.jpeg) |
| 404 | [404.jpeg](screenshot/404.jpeg) |
| 409 | [409.jpeg](screenshot/409.jpeg) |
| 500 | [500.png](screenshot/500.png) |

Gambar-gambar tersebut menjadi bukti respons API untuk skenario berhasil maupun gagal.

## Deklarasi Penggunaan AI
| Bagian | Penggunaan AI | Pemeriksaan |
|---|---|---|
| Struktur Express dan Prisma | Copilot digunakan untuk menyusun struktur berlapis, schema, migrasi, seed, dan route | Saya memeriksa schema, menjalankan migrasi/seed, dan menguji endpoint |
| Dokumentasi | Copilot membantu menyusun README, `.env.example`, dan `requests.http` | Saya membandingkan dokumentasi dengan implementasi dan mengisi identitas sendiri |
| Validasi dan transaksi | Copilot membantu membuat Joi, error handler, dan `$transaction` | Saya menguji PUT 404/409 serta transaksi berhasil dan gagal |

Pernyataan: Saya menggunakan AI sebagai alat bantu dan telah memeriksa serta memahami hasilnya. Jika penilaian membutuhkan perubahan, saya akan menyesuaikan kode sendiri.

## Presentasi
- Tautan video: `[[Isi tautan YouTube Unlisted atau Google Drive](https://drive.google.com/file/d/13XvxvtZKVrTitD3Cr_8p7nEhUrAHtux8/view?usp=sharing)]`
