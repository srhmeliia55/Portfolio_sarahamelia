/**
 * Kurva easing bersama untuk Framer Motion.
 *
 * Nilai dianotasi sebagai tuple agar cocok dengan tipe `Easing` dari
 * Framer Motion (array `number[]` biasa tidak diterima).
 */

/** Akselerasi cepat lalu melambat — dipakai untuk hampir semua animasi masuk. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Halus di kedua ujung — cocok untuk animasi yang berulang. */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Sedikit memantul — untuk elemen kecil seperti tombol dan ikon. */
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
