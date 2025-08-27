'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// A simple chevron icon that rotates based on the open state
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

type AccordionItemProps = {
  question: string;
  answer: string;
};

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      {/* The clickable header for the accordion item */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* The collapsible content area */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="prose p-4 pt-0 text-gray-300">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}