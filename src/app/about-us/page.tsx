// src/app/about-us/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import ReactMarkdown from 'react-markdown';
import Carousel from '@/components/Carousel';

// ... (Keep the type definitions: ImageType, DetailItem, AboutUsPageContent)
type ImageType = {
  image_url: string;
  alt_text: string;
};

type DetailItem = {
  label: string;
  value: string;
};

type AboutUsPageContent = {
  image_gallery: ImageType[];
  body: string;
  details_list: DetailItem[];
  note: string;
};

export default async function AboutUsPage() {
  const supabase = await createClient();

  const { data: page, error } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', 'about-us')
    .single();

  if (error) {
    console.error('Error fetching about us page:', error);
    return <p className="text-center text-red-500">Could not load About Us page.</p>;
  }

  if (!page || !page.content) {
    return <p>Page content not found.</p>;
  }

  const content = page.content as AboutUsPageContent;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-12">{page.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left Column: Image Carousel */}
        <div className="md:col-span-1">
          {content.image_gallery && content.image_gallery.length > 0 && (
            <Carousel slides={content.image_gallery} options={{ loop: true }} />
          )}
        </div>

        {/* Right Column: Content */}
        {/* vvv THIS IS THE FIX: Added text-gray-300 for default text color vvv */}
        <div className="md:col-span-2 text-gray-300">
          <div className="prose prose-invert prose-lg max-w-none mb-6">
            <ReactMarkdown>{content.body}</ReactMarkdown>
          </div>
          
          <div className="space-y-4 text-lg">
            {content.details_list.map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-yellow-400">{item.label}:</span>
                <div className="prose prose-invert">
                  <ReactMarkdown>{item.value}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-invert prose-lg max-w-none mt-6">
            <ReactMarkdown>{content.note}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}