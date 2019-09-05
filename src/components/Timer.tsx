import React, { useState, useEffect } from 'react';

function pad(integer: number): string {
  return `0${integer}`.slice(-2);
}

function formatDays(distance: number): number {
  return Math.floor(distance / (1000 * 60 * 60 * 24));
}

function formatHours(distance: number): number {
  return Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
}

function formatMinutes(distance: number): number {
  return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
}

function formatSeconds(distance: number): number {
  return Math.floor((distance % (1000 * 60)) / 1000);
}

function getFormattedCountdown(distance: number): string {
  // Time calculations for days, hours, minutes and seconds
  const days = formatDays(distance);
  const hours = pad(formatHours(distance));
  const minutes = pad(formatMinutes(distance));
  const seconds = pad(formatSeconds(distance));
  return `${days}:${hours}:${minutes}:${seconds}`;
}

type Props = {
  deadline: number;
  onZero: () => void;
  specifiedNow?: number;
}

const Timer: React.FunctionComponent<Props> = function({ deadline, onZero, specifiedNow }) {
  const now = specifiedNow || new Date().getTime();
  const [ distance, setDistance ] = useState(getFormattedCountdown(deadline - now));
  useEffect(() => {
    const interval = setInterval(function() {
      // Get todays date and time
      const updatedNow = new Date().getTime();
      // Find the distance between now and the count down date
      const updatedDistance = deadline - updatedNow;
      if (updatedDistance < 0) {
        clearInterval(interval);
        setDistance('00:00:00:00');
        onZero();
        return;
      }
      setDistance(getFormattedCountdown(updatedDistance));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {distance}
    </>
  );
}

export default Timer;
