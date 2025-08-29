// src/components/RideDetailModal.tsx
'use client';

import { type RideDiaryEntry } from '@/types';
import ReactMarkdown from 'react-markdown';

// A simple close (X) icon
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

type ModalProps = {
  entry: RideDiaryEntry | null;
  onClose: () => void;
};

export default function RideDetailModal({ entry, onClose }: ModalProps) {
  if (!entry) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity"
      onClick={onClose} // Close modal on background click
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl m-4 border border-gray-700 relative"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <CloseIcon />
        </button>

        <div className="p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">{entry.name}</h2>
            <p className="text-md text-gray-400 mb-4">
                {new Date(entry.ride_date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="my-6 prose prose-invert max-w-none text-gray-300">
                <ReactMarkdown>{entry.guidance}</ReactMarkdown>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-gray-700 pt-4">
                {/* Details like in the card */}
            </div>

            {entry.notes && (
                <div className="mt-6 pt-4 border-t border-gray-700 prose prose-invert max-w-none text-gray-300">
                    <h4 className="font-bold text-yellow-500">Notes:</h4>
                    <ReactMarkdown>{entry.notes}</ReactMarkdown>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}