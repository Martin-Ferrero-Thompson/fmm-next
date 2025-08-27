import { createClient } from '@/lib/supabase/server';
import AccordionItem from '@/components/AccordionItem';

export default async function FaqPage() {
  const supabase = await createClient();

  // Fetch all active FAQs, ordered by the 'display_order' column
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  // Handle potential errors during data fetching
  if (error) {
    console.error('Error fetching FAQs:', error);
    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
            <p className="text-center text-red-500">Could not load FAQs at this time. Please try again later.</p>
        </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      
      <div className="max-w-3xl mx-auto">
        {faqs && faqs.length > 0 ? (
          faqs.map(faq => (
            <AccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          <p className="text-center text-gray-400">No frequently asked questions have been added yet.</p>
        )}
      </div>
    </main>
  );
}