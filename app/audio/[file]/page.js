"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const AudioPlayer = () => {
  const pathname = usePathname();
  const file = decodeURIComponent(pathname.split("/").pop());
  const [audioUrl, setAudioUrl] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (file) {
      // Fetch audio URL
      fetch(`/api/get-audio-url?file=${file}`)
        .then(response => response.json())
        .then(data => setAudioUrl(data.url))
        .catch(error => console.error('Error fetching audio URL:', error));

      // Extract date from file name and fetch photos
      const date = file.slice(0, 6);
      fetch(`/api/get-photos-by-date?date=${date}`)
        .then(response => response.json())
        .then(data => setPhotos(data))
        .catch(error => console.error('Error fetching photos:', error));
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
      <h2>Photos</h2>
      <PhotoGallery photos={photos} />
    </div>
  );
};

const PhotoGallery = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  if (photos.length === 0) return <div>No photos available for this date.</div>;

  return (
    <div>
      <button onClick={handlePrev}>Previous</button>
      <img src={photos[currentIndex].url} alt={photos[currentIndex].key} style={{ maxWidth: '100%' }} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AudioPlayer;
