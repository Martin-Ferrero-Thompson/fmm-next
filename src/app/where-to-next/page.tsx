// src/app/where-to-next/page.tsx
import { createClient } from '@/lib/supabase/server';
import ReactMarkdown from 'react-markdown';
import Countdown from '@/components/Countdown';
import Image from 'next/image';

type NextRide = {
    title: string;
    ride_datetime: string;
    start_point: string;
    destination: string;
    distance: string;
    duration: string;
}

type WhereToNextContent = {
    introduction: string;
    next_ride: NextRide;
    map_image_url: string;
    map_image_alt: string;
    map_note: string;
}

export default async function WhereToNextPage() {
    const supabase = await createClient();

    const { data: page } = await supabase
      .from('pages')
      .select('title, content')
      .eq('slug', 'where-to-next')
      .single();

    if (!page || !page.content) {
        return <p>Page content not found.</p>;
    }

    const content = page.content as WhereToNextContent;
    const ride = content.next_ride;

    return (
        // vvv THIS IS THE FIX: REMOVED bg-gray-900 FROM THIS DIV vvv
        <div> 
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-brand mb-8">{page.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Details */}
                    <div className="space-y-6">
                        <Countdown targetDate={ride.ride_datetime} />
                        
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <ReactMarkdown>{content.introduction}</ReactMarkdown>
                        </div>

                        <div className="p-6 bg-[#343a40] rounded-lg space-y-3 text-lg text-gray-300">
                            <p><span className="font-bold text-yellow-400">Title:</span> {ride.title}</p>
                            <p><span className="font-bold text-yellow-400">Date:</span> {new Date(ride.ride_datetime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                            <p><span className="font-bold text-yellow-400">Start Time:</span> {new Date(ride.ride_datetime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                            <div className="flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-yellow-400">Start Point:</span> <span className="prose prose-invert inline-block"><ReactMarkdown>{ride.start_point}</ReactMarkdown></span></div>
                            <p><span className="font-bold text-yellow-400">Destination:</span> {ride.destination}</p>
                            <p><span className="font-bold text-yellow-400">Distance (approx.):</span> {ride.distance}</p>
                            <p><span className="font-bold text-yellow-400">Ride Time (estimate):</span> {ride.duration}</p>
                        </div>
                    </div>

                    {/* Right Column: Map Image */}
                    <div>
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-700">
                           <Image 
                             src={content.map_image_url} 
                             alt={content.map_image_alt}
                             fill
                             className="object-cover"
                             sizes="(max-width: 768px) 100vw, 50vw"
                           />
                        </div>
                        <p className="text-center text-sm text-white bg-cyan-800 bg-opacity-75 rounded-b-md py-2 px-4 mt-2">{content.map_note}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}