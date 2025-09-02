// src/app/where-to-next/page.tsx
import { createClient } from '@/lib/supabase/server';
import ReactMarkdown from 'react-markdown';
import Countdown from '@/components/Countdown';
import Image from 'next/image';
import { type RideDiaryEntry } from '@/types';

// This is the static intro text for the page
const pageIntro = "All Regular Rides are notified via the [WhatsApp Group](your-whatsapp-link). Check out when and where we are heading on our next Longer Ride!";
const pageTitle = "Where To Next...";

export default async function WhereToNextPage() {
    const supabase = await createClient();

    // Get today's date at midnight for the query
    const today = new Date().toISOString();

    // Fetch the next upcoming ride from the ride diary
    const { data: nextRide, error } = await supabase
      .from('ride_diary_entries')
      .select('*')
      .gte('ride_date', today) // Get rides where the date is greater than or equal to today
      .order('ride_date', { ascending: true }) // Order by date to find the soonest
      .limit(1) // We only want the very next one
      .single();

    if (error) {
        console.error("Error fetching next ride:", error);
    }
    
    // Cast the result to our type
    const ride: RideDiaryEntry | null = nextRide;

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-brand mb-8">{pageTitle}</h1>
                
                {/* Check if a ride was found */}
                {ride ? (
                    // If a ride is found, display its details
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column: Details */}
                        <div className="space-y-6">
                            <Countdown targetDate={ride.ride_date} />
                            
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                                <ReactMarkdown>{pageIntro}</ReactMarkdown>
                            </div>

                            <div className="p-6 bg-[#343a40] rounded-lg space-y-3 text-lg text-gray-300">
                                <p><span className="font-bold text-yellow-400">Title:</span> {ride.name}</p>
                                <p><span className="font-bold text-yellow-400">Date:</span> {new Date(ride.ride_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <p><span className="font-bold text-yellow-400">Start Time:</span> {new Date(ride.ride_date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                {/* <div className="flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-yellow-400">Start Point:</span> <span className="prose prose-invert inline-block"><ReactMarkdown>{ride.start_point}</ReactMarkdown></span></div> */}
                                <p><span className="font-bold text-yellow-400">Destination:</span> {ride.destination}</p>
                                <p><span className="font-bold text-yellow-400">Distance (approx.):</span> {ride.distance}</p>
                                <p><span className="font-bold text-yellow-400">Ride Time (estimate):</span> {ride.duration}</p>
                            </div>
                        </div>

                        {/* Right Column: Map Image */}
                        <div>
                            {ride.map_image_url ? (
                                <>
                                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-700">
                                       <Image 
                                         src={ride.map_image_url} 
                                         alt={`Map for the ${ride.name} ride`}
                                         fill
                                         className="object-cover"
                                         sizes="(max-width: 768px) 100vw, 50vw"
                                       />
                                    </div>
                                    <p className="text-center text-sm text-white bg-cyan-800 bg-opacity-75 rounded-b-md py-2 px-4 mt-2">
                                        NOTE: Route for "{ride.name}" is for guidance only!
                                    </p>
                                </>
                            ) : (
                                <div className="aspect-[4/3] rounded-lg border-2 border-gray-700 bg-gray-800 flex items-center justify-center">
                                    <p className="text-gray-500">No map available for this ride.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // If no upcoming rides are found, display a message
                    <div className="text-center text-lg text-gray-400">
                        <p>No upcoming rides are scheduled at the moment.</p>
                        <p className="mt-2">Please check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}