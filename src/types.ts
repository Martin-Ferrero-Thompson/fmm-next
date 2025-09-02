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

export type RideDiaryEntry = {
  id: string;
  ride_date: string;
  name: string;
  departure_time: string;
  destination: string;
  distance: string | null;
  duration: string | null;
  guidance: string;
  notes: string | null;
  photos_url: string | null;
  map_image_url: string | null;

};