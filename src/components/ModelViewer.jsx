import { useState, useEffect } from 'react';

const ModelViewer = ({ data, thumbnail, status, isReady }) => {
  const images = data;
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Remove the page refresh logic completely
  // The parent component (FishInfo) handles polling now

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto items-center">
      {/* Show loading message only if not ready */}
      {!isReady && (
        <div className="mb-4 text-center bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg shadow">
          <p className="text-lg font-semibold">3D Model is Generating...</p>
          <p className="text-sm">Checking status automatically ⏳</p>
        </div>
      )}

      {/* Main Display */}
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        style={{
          width: '800px',
          height: '450px',
          flexShrink: 0,
        }}
      >
        {selectedIndex === images.length - 1 ? (
          isReady ? (
            // Show 3D model iframe with smooth fade-in
            <iframe
              src={images[selectedIndex]}
              width="800"
              height="450"
              title="3D Viewer"
              className="rounded-lg border-0 object-cover fade-in"
            ></iframe>
          ) : (
            // Show placeholder while waiting
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-700">
              <img
                src={thumbnail ? thumbnail[selectedIndex] || images[0] : images[0]}
                alt="Placeholder for 3D model"
                className="w-full h-full object-contain opacity-60"
              />
              <div className="absolute">
                <div className="spinner"></div>
                <p className="mt-2 font-medium">Please wait...</p>
              </div>
            </div>
          )
        ) : (
          <img
            src={images[selectedIndex]}
            alt="Main display"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3 flex-wrap mt-4">
        {images.map((image, idx) => (
          <img
            key={idx}
            src={thumbnail ? thumbnail[idx] || image : image}
            alt={`Thumbnail ${idx + 1}`}
            className={`w-28 h-20 object-cover rounded cursor-pointer border-2 transition-all
              ${selectedIndex === idx ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
            onClick={() => setSelectedIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelViewer;
