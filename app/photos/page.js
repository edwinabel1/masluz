"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const PhotosPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/list-photo-files')
      .then(response => response.json())
      .then(data => setFiles(data));
  }, []);

  return (
    <div>
      <h1>Photo Files</h1>
      <ul>
        {files.map(file => (
          <li key={file.key}>
            <Link href={`/photos/${encodeURIComponent(file.key)}`}>
              {file.key}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosPage;
