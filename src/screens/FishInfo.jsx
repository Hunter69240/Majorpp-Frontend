import React, { useEffect, useState, useRef } from 'react'
import ModelViewer from '../components/ModelViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getScientificName,
  getCommonNames,
  getKingdom,
  getPhylum,
  getClass,
  getOrder,
  getFamily,
  getGenus,
  getDescription,
  getAllImages,
  getDistribution,
  getHabitatAndMigration,
  getLifeCycleAndSize,
  getUses,
  getThreatsAndDiseases,
  getIdentifier,
  getAllThumbnails,
  getThreeDStatusStatus
} from "../components/DataCleaning/DataCleaners";

export default function FishInfo() {
  const location = useLocation();
  const { data: initialData, fishName } = location.state || {};
  
  const [data, setData] = useState(initialData);
  const [model3DReady, setModel3DReady] = useState(
    initialData?.ThreeDStatus === "ready" || initialData?.ThreeDStatus === true
  );
  const intervalRef = useRef(null);
  const navigation = useNavigate();

  console.log("Found data fishinfo:", data);
  console.log("3D Model Status:", data?.ThreeDStatus, "Ready:", model3DReady);

  // Background polling function
  const checkAndUpdateData = async () => {
    if (!fishName || model3DReady) {
      console.log("Skipping poll - fishName:", fishName, "model3DReady:", model3DReady);
      return;
    }

    console.log("Polling for 3D model status...");

    try {
      const API_URL = import.meta.env.VITE_API_URL; 
      const API_TOKEN = import.meta.env.VITE_API_TOKEN;
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ common_name: fishName }),
      });

      if (!response.ok) {
        console.error("Polling request failed:", response.status);
        return;
      }

      const rawData = await response.json();
      const updatedThreeDStatus = getThreeDStatusStatus(rawData);

      console.log("Polled 3D Status:", updatedThreeDStatus);

      // Check if 3D model is now ready
      if ((updatedThreeDStatus === "ready" || updatedThreeDStatus === true) && !model3DReady) {
        console.log("✅ 3D Model is ready! Updating data...");
        
        const organizedData = {
          identifier: getIdentifier(rawData),
          Scientificname: getScientificName(rawData),
          Commonname: getCommonNames(rawData),
          Kingdom: getKingdom(rawData),
          Phylum: getPhylum(rawData),
          Class: getClass(rawData),
          Order: getOrder(rawData),
          Family: getFamily(rawData),
          Genus: getGenus(rawData),
          Description: getDescription(rawData),
          Images: getAllImages(rawData),
          Distribution: getDistribution(rawData),
          HabitatandMigration: getHabitatAndMigration(rawData),
          LifeCycleAndSize: getLifeCycleAndSize(rawData),
          Uses: getUses(rawData),
          ThreatsAndDiseases: getThreatsAndDiseases(rawData),
          Thumbnails: getAllThumbnails(rawData),
          ThreeDStatus: updatedThreeDStatus,
        };

        setData(organizedData);
        setModel3DReady(true);
        
        // Clear interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          console.log("Polling stopped - 3D model ready");
        }
      }
    } catch (error) {
      console.error("Background polling error:", error);
    }
  };

  useEffect(() => {
    // Only start polling if 3D model isn't ready yet
    if (!model3DReady && fishName) {
      console.log("Starting background polling every 20 seconds...");
      
      // Poll every 20 seconds
      intervalRef.current = setInterval(checkAndUpdateData, 30000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Cleanup - polling interval cleared");
      }
    };
  }, [model3DReady, fishName]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at center, #B3E5FC 55%, #0288D1 100%)",
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">🐠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Fish Data Available</h2>
          <p className="text-gray-600 mb-6">
            We couldn't load the fish information. Please try searching again.
          </p>
          <button
            className="bg-gradient-to-r from-[#039BE5] via-[#4DD0E1] to-[#B3E5FC] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-[#0288D1] hover:via-[#00B8D4] hover:to-[#80DEEA] transition-all duration-200"
            onClick={() => navigation('/')}
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="
          mt-7
          ml-7
          px-5 py-2
          rounded-full
          font-semibold
          text-white
          bg-gradient-to-r from-[#039BE5] via-[#4DD0E1] to-[#B3E5FC]
          shadow-lg
          hover:from-[#0288D1] hover:via-[#00B8D4] hover:to-[#80DEEA]
          transition-all
          duration-200
          border-none
          outline-none
        "
        onClick={() => navigation('/')}
      >
        Back
      </button>

      {/* 3d model of fish + scientific name */}
      <div className='flex flex-col md:flex-row gap-15 p-10'>
        {/* 3d model */}
        <div>    
          <ModelViewer 
            data={data.Images} 
            thumbnail={data.Thumbnails}  
            status={data.ThreeDStatus}
            isReady={model3DReady}
          />
        </div>

        <div className='flex flex-col gap-5'>
          {/* scientific name */}
          <div>
            <div className='flex gap-2 items-baseline'>
              <p className='text-3xl font-bold capitalize'>{data.Scientificname}|</p>
            </div>

            <p className='text-3xl font-bold opacity-11 capitalize'>Common name: 
              {data.Commonname.map((name, index) => (
                <span key={index} className="ml-2">{name}{index < data.Commonname.length - 1 ? ',' : ''} </span>
              ))}
            </p>
            <p className='opacity-12 text-xl capitalize'>{data.Kingdom} → {data.Phylum} → {data.Class} → {data.Order} → {data.Family} → {data.Genus} → {data.Scientificname}</p>
          </div>

          {/* general desc */}
          <div>
            <p className='py-5 text-2xl font-bold'>General Desc</p>
            <p className="text-justify max-w-xl break-words whitespace-normal leading-relaxed capitalize">
              {data.Description}
            </p>
          </div>
        </div>
      </div>
      
      {/* habitat/Migration +Distribution */}
      <div className='flex justify-around gap-10 p-10 flex-col md:flex-row'>
        {/* Distribution */}
        <div className='max-w-lg'>
          <p className='font-semibold text-xl'>Distribution</p>
          <ul className="max-w-xl whitespace-normal break-words leading-relaxed list-disc ml-5 space-y-1 capitalize">
            {data.Distribution?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Habitat/Migration */}
        <div className='max-w-lg'>
          <p className='font-semibold text-xl '>Habitat/Migration</p>
          <div className="max-w-xl whitespace-normal break-words leading-relaxed">
            <ul className="list-disc ml-5 space-y-1 capitalize">
              {data.HabitatandMigration.habitat?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 capitalize">{'\u2022'} {data.HabitatandMigration.migration}</p>
          </div>
        </div>
      </div>

      {/* Life cycle |size + Uses */}
      <div className='flex justify-around gap-10 p-10 flex-col md:flex-row'>
        {/* Life cycle |Size */}
        <div>
          <p className='font-semibold text-xl'>Life Cycle | Size</p>
          <ul className="max-w-[600px] whitespace-normal break-words leading-relaxed list-disc ml-5 space-y-1 capitalize">
            {data.LifeCycleAndSize.lifeCycle?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <ul className="max-w-xl whitespace-normal break-words leading-relaxed list-disc ml-5 space-y-1 capitalize">
            {data.LifeCycleAndSize.size?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Uses */}
        <div>
          <p className='font-semibold text-xl'>Uses</p>
          <ul className="max-w-xl whitespace-normal break-words leading-relaxed list-disc ml-5 space-y-1 capitalize">
            {data.Uses?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Threats | Diseases */}
      <div className='flex justify-around gap-10 p-10 flex-col md:flex-row'>
        <div>
          <p className='font-semibold text-xl'>Threats | Diseases</p>
          <ul className="max-w-xl whitespace-normal break-words leading-relaxed list-disc ml-5 space-y-1 capitalize">
            {data.ThreatsAndDiseases.diseases?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <ul className="max-w-xl whitespace-normal break-words leading-relaxed list-disc ml-5 space-y-1 capitalize">
            {data.ThreatsAndDiseases.threats?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  )
}
