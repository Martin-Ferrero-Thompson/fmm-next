// src/app/ride-diary/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import RideCalendar from '@/components/RideCalendar';

export default async function RideDiaryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('ride_diary_entries')
    .select('*');

  if (error) {
    console.error('Error fetching ride diary:', error);
    return <p className="text-center text-red-500">Could not load ride diary.</p>;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-8">Ride Diary</h1>
      <RideCalendar entries={data || []} />
    </main>
  );
}