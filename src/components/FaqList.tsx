// src/components/FaqList.tsx
'use client';

import { useState } from 'react';
import AccordionItem from './AccordionItem';
import { type Faq } from '@/types';

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  // This state will track the ID of the currently open item.
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faqs && faqs.length > 0 ? (
        faqs.map(faq => (
          <AccordionItem 
            key={faq.id} 
            question={`${faq.display_order}. ${faq.question}`} 
            answer={faq.answer}
            // Pass the state and handler down as props
            isOpen={openId === faq.id}
            onToggle={() => handleToggle(faq.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-400">No frequently asked questions have been added yet.</p>
      )}
    </div>
  );
}