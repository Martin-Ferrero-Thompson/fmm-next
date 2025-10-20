// src/app/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// Define a type for our page content for better type safety
type HomePageContent = {
  super_title: string;
  main_title_highlighted: string;
  body: string;
  note: string;
  cta_button_text: string;
  cta_button_link: string;
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: page, error } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', 'home')
    .single();

  if (error) {
    console.error('Error fetching homepage:', error);
    return <p className="text-center py-12">Homepage content is not available.</p>;
  }

  const content = page?.content as HomePageContent | null;

  if (!content) {
    return <p className="text-center py-12">Homepage content is not available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 text-center flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl text-gray-300">
        {content.super_title}
      </h2>
      <h1 className="text-5xl sm:text-7xl font-bold text-brand my-2">
        {content.main_title_highlighted}
      </h1>
      <hr className="w-48 sm:w-96 mx-auto my-8 border-gray-600" />
      
      <div className="max-w-3xl text-lg text-gray-300 space-y-4 text-left sm:text-center">
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown>{content.body}</ReactMarkdown>
        </div>
        <p>
          <strong>NOTE:</strong> {content.note}
        </p>
      </div>

      <Link href={content.cta_button_link} className="mt-10">
        <button className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-xl hover:bg-yellow-500 transition-colors">
          {content.cta_button_text}
        </button>
      </Link>
    </div>
  );
}