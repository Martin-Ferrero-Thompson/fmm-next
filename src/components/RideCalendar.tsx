// src/components/RideCalendar.tsx
'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { type RideDiaryEntry } from '@/types';
import RideDetailModal from './RideDetailModal';

type CalendarProps = {
  entries: RideDiaryEntry[];
};

export default function RideCalendar({ entries }: CalendarProps) {
  const [selectedEntry, setSelectedEntry] = useState<RideDiaryEntry | null>(null);

  // Map your Supabase data to the format FullCalendar expects
  const events = entries.map(entry => ({
    id: entry.id,
    title: entry.name,
    start: new Date(entry.ride_date),
    extendedProps: entry, // Store the full entry object to show in the modal
  }));

  // This function is called when a user clicks an event
  const handleEventClick = (clickInfo: any) => {
    setSelectedEntry(clickInfo.event.extendedProps as RideDiaryEntry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="text-gray-200">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        // Customizing the header toolbar to match your request
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridYear' // View switcher
        }}
        // Customizing the colors to match your dark theme
        eventColor="#eab308" // Tailwind's yellow-400
        eventTextColor="#1f2937" // Tailwind's gray-800
        height="auto" // Let the calendar's height be flexible
      />

      <RideDetailModal entry={selectedEntry} onClose={closeModal} />
    </div>
  );
}