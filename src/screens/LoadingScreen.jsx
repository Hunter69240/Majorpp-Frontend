import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
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

export default function LoadingScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const fishName = location.state?.fishName; 
  const [error, setError] = useState(null);

  console.log("Loading screen received fish name:", fishName);

  useEffect(() => {
    async function fetchFishData() {
      if (!fishName) {
        setError("No fish name provided");
        return;
      }

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
          const errText = await response.text();
          throw new Error(`Error ${response.status}: ${errText}`);
        }

        const rawData = await response.json();

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
          ThreeDStatus: getThreeDStatusStatus(rawData),
        };

        // Navigate with BOTH data and fishName for polling
        setTimeout(() => {
          navigate("/fishinfo", { 
            state: { 
              data: organizedData,
              fishName: fishName  // Pass fishName for background polling
            } 
          });
        }, 400);

      } catch (err) {
        console.error("API fetch failed:", err);
        setError(err.message);
      }
    }

    fetchFishData();
  }, [fishName, navigate]);

  if (error) {
    return <div>Error loading fish data: {error}</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transform"
      >
        <source src="Loading-screen.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-center justify-center z-10 mb-10 sm:mb-5 mr-5 sm:mr-2">
        <Loader />
      </div>
    </div>
  );
}
