// src/components/PhotoAlbumCard.tsx
import { type PhotoAlbum } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export default function PhotoAlbumCard({ album }: { album: PhotoAlbum }) {
  return (
    <Link 
      href={album.external_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-all duration-300 group"
    >
      <div className="relative w-full aspect-video">
        {album.thumbnail_url ? (
          <Image 
            src={album.thumbnail_url} 
            alt={`Thumbnail for ${album.title}`} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          // Placeholder for albums without a thumbnail
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-bold text-yellow-400 truncate">{album.title}</p>
        {album.event_date && (
          <p className="text-sm text-gray-400">
            {new Date(album.event_date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </Link>
  );
}