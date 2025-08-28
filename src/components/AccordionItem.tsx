// src/components/AccordionItem.tsx
'use client';

import ReactMarkdown from 'react-markdown';

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

// We've updated the props it accepts
type AccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

// No more useState!
export default function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onToggle} // Use the onToggle function from props
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <h3 className="text-lg font-semibold text-brand">{question}</h3>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="prose prose-invert p-4 pt-0 text-gray-300">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}