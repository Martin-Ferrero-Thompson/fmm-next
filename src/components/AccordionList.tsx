// src/components/AccordionList.tsx
'use client';

import { useState } from 'react';
import AccordionItem from './AccordionItem';

// A generic type for the items our accordion will display
export type AccordionItemData = {
  id: string;
  title: string;
  content: string;
};

export default function AccordionList({ items }: { items: AccordionItemData[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {items && items.length > 0 ? (
        items.map(item => (
          <AccordionItem 
            key={item.id} 
            title={item.title} 
            content={item.content}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-400">No items have been added yet.</p>
      )}
    </div>
  );
}