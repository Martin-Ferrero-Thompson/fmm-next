// src/components/RideCalendar.tsx
'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { type RideDiaryEntry } from '@/types';
import RideDetailModal from './RideDetailModal';
import type { EventClickArg } from '@fullcalendar/core';

// CSS imports are directly inside the component
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';

type CalendarProps = {
  entries: RideDiaryEntry[];
};

export default function RideCalendar({ entries }: CalendarProps) {
  const [selectedEntry, setSelectedEntry] = useState<RideDiaryEntry | null>(null);

  const events = entries.map(entry => ({
    id: entry.id,
    title: entry.name,
    start: new Date(entry.ride_date),
    extendedProps: entry,
  }));

  // vvv THIS IS THE FIX vvv
  const handleEventClick = (clickInfo: EventClickArg) => {
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
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridYear'
        }}
        eventColor="#eab308"
        eventTextColor="#1f2937"
        height="auto"
      />

      <RideDetailModal entry={selectedEntry} onClose={closeModal} />
    </div>
  );
}