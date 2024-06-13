"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const IndexPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/list-audio-files')
      .then(response => response.json())
      .then(data => setFiles(data));
  }, []);

  return (
    <div>
      <h1>Audio Files</h1>
      <ul>
        {files.map(file => (
          <li key={file.key}>
            <Link href={`/audio/${encodeURIComponent(file.key)}`}>
              {file.key}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
