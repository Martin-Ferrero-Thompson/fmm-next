// src/components/SponsorCard.tsx
import Link from 'next/link';

// Defines the shape of a single sponsor object for TypeScript
type Sponsor = {
  id: string;
  name: string;
  website_url: string | null;
  description: string;
};

export default function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const cardContent = (
    <div className="h-full flex flex-col p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover:bg-gray-700 transition">
      <h3 className="text-xl font-bold text-yellow-400 mb-2">{sponsor.name}</h3>
      <p className="text-gray-300">{sponsor.description}</p>
    </div>
  );

  // If a URL is provided, wrap the card in a link
  if (sponsor.website_url) {
    return (
      <Link href={sponsor.website_url} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </Link>
    );
  }

  // Otherwise, just render the card
  return cardContent;
}