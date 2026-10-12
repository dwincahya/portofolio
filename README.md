# Portofolio Dwi Nur Cahya

Situs portofolio personal Dwi Nur Cahya yang menampilkan profil, pengalaman,
pendidikan, proyek, dan sertifikat dalam satu halaman. Situs ini menyediakan
dukungan bahasa Indonesia dan Inggris.

## Teknologi

- Nuxt 4
- Vue 3
- Tailwind CSS 4
- TypeScript
- Vitest dan Nuxt Test Utils
- Lenis untuk efek scrolling

## Persyaratan

- Bun 1 atau yang lebih baru

## Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/dwincahya/portofolio.git
   cd portofolio
   ```

2. Instal dependensi:

   ```bash
   bun install
   ```

## Pengembangan Lokal

Jalankan server pengembangan:

```bash
bun run dev
```

Situs tersedia di [http://localhost:3000](http://localhost:3000).

Untuk menjalankan server dengan package manager lain:

```bash
bun run dev
```

## Skrip

| Perintah | Keterangan |
| --- | --- |
| `bun run dev` | Menjalankan server pengembangan |
| `bun run build` | Membuat build untuk production |
| `bun run generate` | Membuat static site generation |
| `bun run preview` | Meninjau hasil build production secara lokal |
| `bun run test` | Menjalankan test dengan Vitest |

## Pengujian

Jalankan seluruh pengujian dengan:

```bash
bun run test
```

## Continuous Integration

Repositori menggunakan GitHub Actions untuk memeriksa setiap pull request
menuju branch `master`. Pemeriksaan tersebut menjalankan instalasi dependensi
dengan lockfile, seluruh pengujian, dan build aplikasi.

## Menjalankan dengan Docker

Pastikan Docker dan Docker Compose telah terpasang, lalu jalankan:

```bash
docker compose up --build
```

Aplikasi tersedia di [http://localhost:3000](http://localhost:3000).

Untuk menghentikan container:

```bash
docker compose down
```

## Struktur Proyek

```text
app/
|-- assets/       # CSS dan aset gambar
|-- components/   # Komponen antarmuka dan section halaman
|-- composables/  # Logika yang dapat digunakan ulang
|-- data/         # Data terjemahan bahasa Indonesia dan Inggris
|-- layouts/      # Layout aplikasi
`-- pages/        # Halaman aplikasi
public/           # File statis
test/             # Pengujian aplikasi
```

## Bahasa

Data terjemahan tersedia di:

- `app/data/locale.id.json` untuk bahasa Indonesia
- `app/data/locale.en.json` untuk bahasa Inggris

Perubahan konten yang ditampilkan pada halaman sebaiknya dilakukan melalui
file data tersebut agar struktur komponen tetap konsisten.

## Build Production

Buat build production:

```bash
bun run build
```

Setelah proses selesai, tinjau hasilnya secara lokal:

```bash
bun run preview
```
