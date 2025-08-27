// src/app/sponsors/page.tsx
import { createClient } from '@/lib/supabase/server';
import SponsorCard from '@/components/SponsorCard';

export default async function SponsorsPage() {
  const supabase = await createClient();

  // Fetch all active sponsors from your Supabase table
  const { data: sponsors, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('is_active', true) // Only get sponsors marked as active
    .order('name'); // Order them alphabetically

  if (error) {
    console.error('Error fetching sponsors:', error);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Sponsors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors?.map(sponsor => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}