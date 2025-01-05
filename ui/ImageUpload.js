'use client';

import { useRef, useState } from 'react';

export default function ImageUpload({ onUpload }) {
  const inputFileRef = useRef(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = async () => {
    const file = inputFileRef.current.files[0];
    if (!file) return;

    try {
      const response = await fetch(`/api/admin/image-upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadedBlob = await response.json();
      setUploadSuccess(true); // Mark the upload as successful
      if (onUpload) {
        onUpload(uploadedBlob.url); // Pass the uploaded URL to the parent component
      }

      // Reset success state after a few seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadSuccess(false);
    }
  };

  return (
    <div>
      <input
        name="file"
        ref={inputFileRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <button
        type="button"
        onClick={() => inputFileRef.current?.click()}
        className={`${uploadSuccess ? "bg-primary" : "bg-secondary"} hover:${uploadSuccess ? "bg-primaryLight" : "bg-secondaryLight"} text-white px-6 py-2 rounded-md transition duration-300`}
      >
        {uploadSuccess ? 'Uploaded' : 'Upload Image'}
      </button>
    </div>
  );
}
