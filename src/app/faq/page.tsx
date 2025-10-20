// src/app/faq/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';

import AccordionList from '@/components/AccordionList';
import type { AccordionItemData } from '@/components/AccordionList';

type FaqPageContent = {
  faqs: AccordionItemData[];
};

export default async function FaqPage() {
  const supabase = await createClient();

  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) { /* ... error handling ... */ }

  // Adapt the 'faqs' data to match the generic 'AccordionItemData' type
  const items: AccordionItemData[] = faqs?.map(faq => ({
    id: faq.id,
    title: `${faq.display_order}. ${faq.question}`,
    content: faq.answer,
  })) || [];

  const content: FaqPageContent = {
    faqs: items,
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-8">Frequently Asked Questions</h1>
      <AccordionList items={content.faqs} />
    </main>
  );
}