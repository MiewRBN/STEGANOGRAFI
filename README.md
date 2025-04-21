# StegaShield - Aplikasi Steganografi Domain Transformasi

StegaShield adalah aplikasi steganografi berbasis web yang menggunakan teknik domain transformasi DCT (Discrete Cosine Transform) untuk menyembunyikan pesan rahasia ke dalam gambar digital. Aplikasi ini bekerja sepenuhnya di sisi klien (browser) sehingga data Anda tidak pernah dikirim ke server.

## Fitur Utama

- **Steganografi DCT**: Menggunakan teknik domain transformasi untuk menyembunyikan pesan dengan ketahanan yang lebih baik dibandingkan metode LSB (Least Significant Bit) tradisional.
- **Keamanan Ditingkatkan**: Mendukung perlindungan pesan dengan kata sandi.
- **Kualitas Gambar**: Mempertahankan kualitas visual tinggi sehingga perubahan pada gambar hampir tidak terlihat.
- **Pemrosesan Sisi Klien**: Seluruh operasi dilakukan di browser, menjamin privasi data Anda.
- **Lintas Platform**: Berfungsi di semua perangkat dengan browser modern tanpa perlu instalasi.

## Cara Penggunaan

### Enkripsi Pesan

1. Unggah gambar cover (gambar yang akan digunakan untuk menyembunyikan pesan)
2. Masukkan pesan rahasia yang ingin disembunyikan
3. (Opsional) Tambahkan kata sandi untuk keamanan ekstra
4. Klik tombol "Enkripsi Pesan"
5. Unduh gambar stego yang dihasilkan

### Dekripsi Pesan

1. Unggah gambar stego (gambar yang berisi pesan tersembunyi)
2. Jika pesan dilindungi kata sandi, masukkan kata sandi yang sama
3. Klik tombol "Dekripsi Pesan"
4. Lihat pesan rahasia yang diekstrak

## Struktur Proyek

- `index.html` - File HTML utama yang berisi antarmuka pengguna
- `styles.css` - File CSS untuk styling aplikasi
- `script.js` - Implementasi JavaScript untuk fungsi steganografi

## Implementasi Teknis

StegaShield menggunakan teknik DCT yang mirip dengan yang digunakan dalam kompresi JPEG. Berbeda dengan metode LSB, steganografi domain transformasi menyembunyikan pesan dalam koefisien frekuensi menengah, menjadikannya lebih tahan terhadap manipulasi gambar dan kompresi.

## Pengembangan Lebih Lanjut

Proyek ini masih dalam tahap pengembangan. Fitur yang direncanakan antara lain:
- Implementasi DCT yang lebih kuat
- Mendukung format gambar lain (saat ini hanya mendukung PNG dan JPEG)
- Peningkatan algoritma enkripsi untuk proteksi kata sandi
- Antarmuka pengguna yang lebih responsif

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE). 