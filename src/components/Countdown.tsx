// src/components/Countdown.tsx
'use client';

import { useState, useEffect } from 'react';

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="font-mono text-xl text-gray-300">
      <span className="font-bold text-yellow-400">Countdown:</span> {format(timeLeft.days)} Day(s), {format(timeLeft.hours)} Hours, {format(timeLeft.minutes)} Minutes, {format(timeLeft.seconds)} Seconds
    </div>
  );
}