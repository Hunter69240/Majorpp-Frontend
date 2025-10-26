import { useState } from 'react';

const FishInfo = ({ data, thumbnail }) => {
  const images = data;
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log("ModelViewer received images:", images);
  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto items-center">
      {/* Fixed Main Display */}
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        style={{
          width: '800px',   // Fixed width
          height: '450px',  // Fixed height (16:9)
          flexShrink: 0,
        }}
      >
        {selectedIndex === images.length - 1 ? (
          <iframe
            src={images[selectedIndex]}
            width="800"
            height="450"
            title="3D Viewer"
            className="rounded-lg border-0 object-cover"
          ></iframe>
        ) : (
          <img
            src={images[selectedIndex]}
            alt="Main display"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Thumbnails Row */}
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

export default FishInfo;
