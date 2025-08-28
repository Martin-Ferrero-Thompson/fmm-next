// src/app/about-us/page.tsx
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

  const { data: page } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', 'about-us')
    .single();

  if (!page || !page.content) {
    return <p>Page content not found.</p>;
  }
  
  // vvv THIS LINE IS FIXED vvv
  const content = page.content as AboutUsPageContent | null;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-12">{page.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          {content?.image_gallery && content.image_gallery.length > 0 && (
            <Carousel slides={content.image_gallery} options={{ loop: true }} />
          )}
        </div>
        <div className="md:col-span-2">
          <div className="prose prose-invert prose-lg max-w-none mb-6">
            <ReactMarkdown>{content?.body}</ReactMarkdown>
          </div>
          <div className="space-y-4 text-lg">
            {content?.details_list.map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-yellow-400">{item.label}:</span>
                <div className="prose prose-invert">
                  <ReactMarkdown>{item.value}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
          <div className="prose prose-invert prose-lg max-w-none mt-6">
            <ReactMarkdown>{content?.note}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}