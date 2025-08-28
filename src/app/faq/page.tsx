// src/app/faq/page.tsx
import { createClient } from '@/lib/supabase/server';
import { type Faq } from '@/types';
import FaqList from '@/components/FaqList'; // Import the new client component

export default async function FaqPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const faqs: Faq[] | null = data;

  if (error) {
    console.error('Error fetching FAQs:', error);
    return <p className="text-center text-red-500">Could not load FAQs at this time.</p>;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-8">Frequently Asked Questions</h1>
      {/* Render the FaqList and pass the data to it */}
      <FaqList faqs={faqs || []} />
    </main>
  );
}