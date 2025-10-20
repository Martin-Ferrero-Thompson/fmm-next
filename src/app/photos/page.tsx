// src/app/photos/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import { type RideDiaryEntry } from '@/types';
import PhotoAlbumCard from '@/components/PhotoAlbumCard';

// Helper function to group ride entries by year
const groupRidesByYear = (rides: RideDiaryEntry[]) => {
  return rides.reduce((acc, ride) => {
    const year = new Date(ride.ride_date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(ride);
    return acc;
  }, {} as Record<string, RideDiaryEntry[]>);
};

export default async function PhotosPage() {
  const supabase = await createClient();

  // Fetch #1: Get ride-specific albums from the diary
  const { data: ridesWithPhotos, error: ridesError } = await supabase
    .from('ride_diary_entries')
    .select('*')
    .not('photos_url', 'is', null)
    .order('ride_date', { ascending: false });

  const { data: specialAlbums, error: albumsError } = await supabase
    .from('photo_albums')
    .select('*');

  if (ridesError) {
    console.error('Error fetching ride diary entries:', ridesError);
    return <p className="text-center text-red-500">Could not load photo albums.</p>;
  }
  if (albumsError) {
    console.error('Error fetching photo albums:', albumsError);
    return <p className="text-center text-red-500">Could not load photo albums.</p>;
  }

  const groupedRides = groupRidesByYear(ridesWithPhotos || []);
  const years = Object.keys(groupedRides).sort((a, b) => Number(b) - Number(a));
  
  // Find the "Loan Bikes" album from the special albums
  const loanBikesAlbum = specialAlbums?.find(a => a.album_type === 'Loan Bikes');

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-brand mb-8">Photos</h1>
      
      {/* Section for Loan Bikes */}
      {loanBikesAlbum && (
        <section className="mb-12">
            <div className="max-w-xs mx-auto">
                 <PhotoAlbumCard album={loanBikesAlbum} />
            </div>
             <hr className="my-12 border-gray-700" />
        </section>
      )}

      {/* Sections for each year of rides */}
      {years.length > 0 ? (
        <div className="space-y-12">
          {years.map(year => (
            <section key={year}>
              <h2 className="text-3xl font-bold text-gray-300 border-b-2 border-gray-700 pb-2 mb-6">
                {year}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedRides[year].map(ride => (
                  <PhotoAlbumCard 
                    key={ride.id} 
                    album={{
                      id: ride.id,
                      title: ride.name,
                      album_type: 'Single Event',
                      event_date: ride.ride_date,
                      external_url: ride.photos_url!,
                      thumbnail_url: ride.map_image_url 
                    }} 
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
         !loanBikesAlbum && <p className="text-center text-gray-400">No photo albums have been added yet.</p>
      )}
    </main>
  );
}