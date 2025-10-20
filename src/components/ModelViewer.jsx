// import React from 'react'
// export default function FishInfo() {


//   return (
//     <div>
       
//        <div>

//        </div>
//        <div>
//         <iframe src="https://single3dviewerv2.tacbstudios.com/?viewer=Aptri_uc.glb" 
//         width="500" height="500"></iframe>
//        </div>
        

//     </div>
//   )
// }

import { useState } from 'react';

const FishInfo = ({data}) => {
  const images = data;

  
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-4 p-4 max-w-4xl mx-auto">
      {/* Left side - Thumbnails */}
      <div className="flex flex-col gap-2 w-20">
        {images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`Thumbnail ${idx + 1}`}
            className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-all
              ${selectedIndex === idx ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
            onClick={() => setSelectedIndex(idx)}
          />
        ))}
      </div>

      {/* Right side - Main image or iframe */}
      <div className="flex-1 flex items-center justify-center">
        {selectedIndex === images.length - 1 ? (
          <iframe
            src="https://single3dviewerv2.tacbstudios.com/?viewer=Aptri_uc.glb"
            width="500"
            height="500"
            title="3D Viewer"
            className="rounded-lg shadow-lg"
          ></iframe>
        ) : (
          <img
            src={images[selectedIndex]}
            alt="Main product"
            className="w-full h-auto object-contain rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default FishInfo;

