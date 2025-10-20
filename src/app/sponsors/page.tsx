// src/app/sponsors/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';

import SponsorCard from '@/components/SponsorCard';

type Sponsor = {
  id: string;
  name: string;
  is_active: boolean;
  website_url: string;
  description: string;
  // Add other fields as needed
};

type SponsorsPageContent = {
  sponsors: Sponsor[];
};

export default async function SponsorsPage() {
  const supabase = await createClient();

  // Fetch all active sponsors from your Supabase table
  const { data: sponsors, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching sponsors:', error);
  }

  const content: SponsorsPageContent = {
    sponsors: sponsors || [],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Sponsors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.sponsors.map(sponsor => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}