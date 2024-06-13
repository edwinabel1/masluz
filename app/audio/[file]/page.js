"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const AudioPlayer = () => {
  const pathname = usePathname();
  const file = decodeURIComponent(pathname.split("/").pop());
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    if (file) {
      fetch(`/api/get-audio-url?file=${file}`)
        .then(response => response.json())
        .then(data => setAudioUrl(data.url));
    }
  }, [file]);

  if (!audioUrl) return <div>Loading...</div>;

  return (
    <div>
      <h1>Audio Player</h1>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
