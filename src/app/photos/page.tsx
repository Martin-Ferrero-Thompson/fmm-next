// src/app/photos/page.tsx
import { createClient } from '@/lib/supabase/server';
import { type PhotoAlbum } from '@/types';
import PhotoAlbumCard from '@/components/PhotoAlbumCard';
// import Link from 'next/link';

// Helper function to group albums by year
const groupAndSortAlbums = (albums: PhotoAlbum[]) => {
  const grouped = albums.reduce((acc, album) => {
    if (!album.event_date) return acc; // Skip albums without a date
    const year = new Date(album.event_date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(album);
    return acc;
  }, {} as Record<string, PhotoAlbum[]>);

  // Custom sort within each year's group
  for (const year in grouped) {
    grouped[year].sort((a, b) => {
      // Prioritize yearly albums
      const aIsYearly = a.album_type.startsWith('Yearly');
      const bIsYearly = b.album_type.startsWith('Yearly');
      if (aIsYearly && !bIsYearly) return -1;
      if (!aIsYearly && bIsYearly) return 1;

      // Then sort by date (newest first)
      return new Date(b.event_date!).getTime() - new Date(a.event_date!).getTime();
    });
  }
  return grouped;
};

export default async function PhotosPage() {
  const supabase = await createClient();

  const { data: allAlbums, error } = await supabase
    .from('photo_albums')
    .select('*');

  if (error) {
    return <p className="text-center text-red-500">Could not load photo albums.</p>;
  }

  const albums: PhotoAlbum[] = allAlbums || [];

  // Isolate the special "Loan Bikes" album
  const loanBikesAlbum = albums.find(a => a.album_type === 'Loan Bikes');
  const rideAlbums = albums.filter(a => a.album_type !== 'Loan Bikes');

  const groupedAlbums = groupAndSortAlbums(rideAlbums);
  const years = Object.keys(groupedAlbums).sort((a, b) => Number(b) - Number(a)); // Sort years descending

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

      {/* Sections for each year */}
      {years.length > 0 ? (
        <div className="space-y-12">
          {years.map(year => (
            <section key={year}>
              <h2 className="text-3xl font-bold text-gray-300 border-b-2 border-gray-700 pb-2 mb-6">
                {year}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedAlbums[year].map(album => (
                  <PhotoAlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        // Show this message if there are no albums other than loan bikes
        !loanBikesAlbum && <p className="text-center text-gray-400">No photo albums have been added yet.</p>
      )}
    </main>
  );
}