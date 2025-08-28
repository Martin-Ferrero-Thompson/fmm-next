// src/app/disclaimer/page.tsx
import { createClient } from '@/lib/supabase/server';
import ReactMarkdown from 'react-markdown';

type DisclaimerPageContent = {
  body: string;
};

export default async function DisclaimerPage() {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', 'disclaimer')
    .single();

  if (!page || !page.content) {
    return <p>Page content not found.</p>;
  }
  
  const content = page.content as DisclaimerPageContent;

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-8">{page.title}</h1>
      
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg text-gray-300">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </main>
  );
}