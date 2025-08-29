// src/types.ts

export type Faq = {
  id: string; // UUID from Supabase is a string
  question: string;
  answer: string;
  display_order: number | null;
  is_active: boolean;
};

export type PhotoAlbum = {
  id: string;
  title: string;
  album_type: string;
  event_date: string | null;
  external_url: string;
  thumbnail_url: string | null;
};