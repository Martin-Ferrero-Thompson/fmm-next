// src/app/contact-us/page.tsx
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

type QrCode = {
    image_url: string;
    alt_text: string;
    caption: string;
}

type ContactPageContent = {
    qr_code: QrCode;
    body: string;
    email_address: string;
}

export default async function ContactUsPage() {
  const supabase = await createClient();

  const { data: page, error } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', 'contact-us')
    .single();

  if (error) {
    console.error('Error fetching contact page:', error);
    return <p className="text-center text-red-500">Could not load contact page.</p>;
  }

  if (!page || !page.content) {
    return <p>Page content not found.</p>;
  }

  const content = page.content as ContactPageContent;

  return (
    <main className="container mx-auto px-4 py-12 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-4xl">
        
        {/* Left Column: QR Code */}
        <div className="bg-green-600 p-8 rounded-lg flex flex-col items-center">
          <div className="relative w-64 h-64 bg-white p-4 rounded-md shadow-lg">
            <Image 
              src={content.qr_code.image_url}
              alt={content.qr_code.alt_text}
              fill
              sizes="256px"
            />
          </div>
          <p className="text-center text-white mt-4 text-sm">{content.qr_code.caption}</p>
        </div>

        {/* Right Column: Text Content */}
        <div className="text-gray-300">
            <h1 className="text-4xl md:text-5xl font-bold text-brand mb-8">{page.title}</h1>
            <div className="prose prose-invert prose-lg max-w-none space-y-4">
                <ReactMarkdown
                  // vvv THIS IS THE FIX vvv
                  components={{
                    a: ({...props}) => <a className="text-brand hover:underline" {...props} />
                  }}
                >
                  {content.body}
                </ReactMarkdown>
            </div>
            <a href={`mailto:${content.email_address}`} className="mt-4 inline-block text-brand font-bold text-lg hover:underline transition-colors">
                {content.email_address} ↗
            </a>
        </div>
      </div>
    </main>
  );
}