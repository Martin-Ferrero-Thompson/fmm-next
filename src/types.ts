// src/types.ts

export type Faq = {
  id: string; // UUID from Supabase is a string
  question: string;
  answer: string;
  display_order: number | null;
  is_active: boolean;
};