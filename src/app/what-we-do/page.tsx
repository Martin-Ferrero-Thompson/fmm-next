// src/app/what-we-do/page.tsx
import { createClient } from '@/lib/supabase/server';
import AccordionList from '@/components/AccordionList';
import type { AccordionItemData } from '@/components/AccordionList';

type SimplePageContent = {
    introduction: string;
};

export default async function WhatWeDoPage() {
  const supabase = await createClient();

  // Fetch #1: Page intro
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', 'what-we-do')
    .single();

  // Fetch #2: Accordion items
  const { data: activities, error: activitiesError } = await supabase
    .from('activity_types')
    .select('*')
    .order('display_order');

  if (pageError || activitiesError) {
    console.error('Error fetching What We Do page:', pageError || activitiesError);
    return <p className="text-center text-red-500">Could not load What We Do page.</p>;
  }

  const content = page?.content as SimplePageContent | null;
  const items: AccordionItemData[] = activities?.map(activity => ({
    id: activity.id,
    title: activity.title,
    content: activity.description || 'Content coming soon.',
  })) || [];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-4">{page?.title}</h1>
      {content?.introduction && (
        <p className="text-center text-lg text-gray-300 mb-12">{content.introduction}</p>
      )}
      <AccordionList items={items} />
    </main>
  );
}