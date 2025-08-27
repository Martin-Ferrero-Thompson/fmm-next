// src/components/SponsorCard.tsx
import Link from 'next/link';

// Defines the shape of a single sponsor object for TypeScript
type Sponsor = {
  id: string;
  name: string;
  website_url: string | null;
  description: string;
};

// A simple SVG component for the external link icon
const ExternalLinkIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className="w-5 h-5 inline-block ml-1 opacity-70"
  >
    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z" />
    <path d="M8.603 14.904a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 005.656 5.656l3-3a4 4 0 00-.225-5.865.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.665l-3 3z" />
  </svg>
);

export default function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const cardContent = (
    <div className="h-full flex flex-col p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:border-yellow-400 transition-colors duration-300">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        {sponsor.name}
        {/* This is the conditional rendering for the icon */}
        {sponsor.website_url && <ExternalLinkIcon />}
      </h3>
      {/* The 'whitespace-pre-line' class respects line breaks from the database */}
      <p className="text-gray-300 whitespace-pre-line">{sponsor.description}</p>
    </div>
  );

  // If a URL is provided, wrap the card in a link
  if (sponsor.website_url) {
    return (
      <Link href={sponsor.website_url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </Link>
    );
  }

  // Otherwise, just render the card without a link
  return cardContent;
}