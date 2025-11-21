import React from "react";

export function getScientificName(data) {
  // Access scientific name
  data = data.response.taxon.ScientificName;

  // 1. Remove parentheses and their content
  data = data.replace(/\s*\(.*?\)\s*/g, "");

  // 2. Remove numbers and special characters, keeping only letters and spaces
  data = data.replace(/[^a-zA-Z\s]/g, "");

  // 3. Clean up extra spaces
  data = data.trim().replace(/\s+/g, " ");

  return data;
}


export function getIdentifier(data) { 
    return data.response.taxon.identifier;
}


// Returns: ['Goldfish', 'Prussian carp', ...]
export function getCommonNames(data) {
  const names = data?.response?.taxon?.commonName || [];
  const arr = Array.isArray(names) ? names : [names];

  return arr
    .filter(item => item 
      && item['#text'] 
      && item['@{http://www.w3.org/XML/1998/namespace}lang'] === 'en'
    )
    .map(item => item['#text']
    
    );
}

// Returns: "Animalia" (or whatever is present)
export function getKingdom(data) {
  return data?.response?.taxon?.Kingdom || '';
}

// Returns: "Chordata" (or whatever is present)
export function getPhylum(data) {
  return data?.response?.taxon?.Phylum || '';
}

// Returns: "Teleostei" (or whatever is present)
export function getClass(data) {
  return data?.response?.taxon?.Class || '';
}

// Returns: "Cypriniformes" (or whatever is present)
export function getOrder(data) {
  return data?.response?.taxon?.Order || '';
}

// Returns: "Cyprinidae" (or whatever is present)
export function getFamily(data) {
  return data?.response?.taxon?.Family || '';
}

// Returns: "Carassius" (or whatever is present)
export function getGenus(data) {
  return data?.response?.taxon?.Genus || '';
}

// Returns the main biology/general description text if available
export function getDescription(data) {
  const objects = data?.response?.taxon?.dataObject || [];

  // Filter text-type data objects
  const textObjects = objects.filter(
    obj => obj.dataType === 'http://purl.org/dc/dcmitype/Text'
  );

  // Try to find biology/general description by identifier
  const biology = textObjects.find(
    obj => obj.identifier?.includes('FB-GeneralDescr')
  );

  // Fallback: take the first available text object if none matched
  let description = biology?.description || textObjects[0]?.description || '';

  // Remove everything inside parentheses ( ... )
  description = description.replace(/\(.*?\)/g, '').trim();

  return description;
}


// Returns: ["https://...", "https://...", ...]
export function getAllImages(data) {
  const objects = data?.Photos?.photos || []; // Array of  image entries
  const threeDurl = data?.threedurl || data?.threedurl || data?.threedstatus.exists; // Handle both naming cases
   console.log("3D URL found:", data.threedurl);
  // Extract valid 'actual' image URLs
  const imageLinks = objects
    .map(obj => obj.actual)
    .filter(link => !!link)
    .slice(0, 5); // limit results if needed

  // Append the 3D model URL (if provided)
 
  imageLinks.push(threeDurl);
  

  return imageLinks;
}




export function getAllThumbnails(data) {
  const objects = data?.Photos?.photos || []; // Access photos array
  const threeDThumb = data?.threedthumb || data?.threeDThumb || ''; // Handle both naming styles

  // Extract valid 'thumbnail' URLs
  const thumbnails = objects
    .map(obj => obj.thumbnail)
    .filter(link => !!link)
    .slice(0, 5); // Limit to first 5 thumbnails

  // Add the 3D thumbnail (if available) at the end
  if (threeDThumb) {
    thumbnails.push(threeDThumb);
  }

  return thumbnails;
}








// Returns: array of distribution sentences like ["Europe and Asia", "Introduced to other regions", ...]
export function getDistribution(data) {
  const objects = data?.response?.taxon?.dataObject || [];

  // Filter text-type objects only
  const textObjects = objects.filter(
    obj => obj.dataType === 'http://purl.org/dc/dcmitype/Text'
  );

  // Look for distribution information
  const distributionObj = textObjects.find(
    obj => obj.identifier?.includes('FB-Distribution')
  );

  // Extract text and remove any content inside parentheses
  const distributionText = (distributionObj?.description || '')
    .replace(/\(.*?\)/g, ''); // removes everything between ( and )

  // Split by "." and clean up
  return distributionText
    .split('.')
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);
}


// Returns: { habitat: ["benthopelagic", "freshwater", ...], migration: "Potamodromous. Migrates within rivers..." }
export function getHabitatAndMigration(data) {
  const objects = data?.response?.taxon?.dataObject || [];

  // Filter text-type objects only
  const textObjects = objects.filter(
    obj => obj.dataType === 'http://purl.org/dc/dcmitype/Text'
  );

  // Find habitat and migration descriptions
  const habitatObj = textObjects.find(
    obj => obj.identifier?.includes('FB-Habitat')
  );
  const migrationObj = textObjects.find(
    obj => obj.identifier?.includes('FB-Migration')
  );

  // Habitat text clean-up: remove parentheses and split by ";"
  const habitatText = habitatObj?.description || '';
  const habitatCleaned = habitatText
    // remove text inside parentheses along with parentheses
    .replace(/\(.*?\)/g, '')
    // split by ";" and clean up whitespace
    .split(';')
    .map(item => item.trim())
    // remove empty strings
    .filter(Boolean);

  // Migration text (if available)
  const migration = migrationObj?.description || '';

  return { habitat: habitatCleaned, migration };
}



export function getLifeCycleAndSize(data) {
  const objects = data?.response?.taxon?.dataObject || [];

  
  const textObjects = objects.filter(
    obj => obj.dataType === "http://purl.org/dc/dcmitype/Text"
  );

  
  const lifeCycleObj = textObjects.find(
    obj => obj.identifier?.includes("FB-LifeCycle")
  );
  const sizeObj = textObjects.find(
    obj => obj.identifier?.includes("FB-Size")
  );

 
  let lifeCycleText = lifeCycleObj?.description?.trim() || "";
  let sizeText = sizeObj?.description?.trim() || "";

  
  const lifeCycle = lifeCycleText
    .replace(/\(Ref.*?\)/g, "")
    .replace(/\s*\(\s*\)\s*/g, "") 
    .split(".") 
    .map(item => item.trim())
    .filter(Boolean);

  
  const size = sizeText
    .replace(/\(Ref.*?\)/g, "")
    .replace(/\s*\(\s*\)\s*/g, "")
    .split(";")
    .map(item => item.trim())
    .filter(Boolean);

  return {
    lifeCycle,
    size
  };
}

// Returns: ["Fisheries: Commercial", "Gamefish: Yes", "Aquarium: Commercial"]
export function getUses(data) {
  const objects = data?.response?.taxon?.dataObject || [];

  // Filter text-type objects
  const textObjects = objects.filter(
    obj => obj.dataType === "http://purl.org/dc/dcmitype/Text"
  );

  // Find the "Uses" section by its identifier
  const usesObj = textObjects.find(
    obj => obj.identifier?.includes("FB-Uses")
  );

  // Extract and clean up text
  const usesText = usesObj?.description?.trim() || "";

  // Split by ";" and filter out blank entries
  const uses = usesText
    .split(";")
    .map(item => item.trim())
    .filter(Boolean);

  return uses;
}

// Returns example: 
// { threats: ["Least Concern (LC)", "Overfishing"], diseases: [["Black Spot Disease", "Parasitic infestations (protozoa, worms, etc.)"], ["Fish Lice", "Crustacean parasitic infection"]] }

export function getThreatsAndDiseases(data) {
  const objects = data?.response?.taxon?.dataObject || [];

  // Filter for text-type objects
  const textObjects = objects.filter(
    obj => obj.dataType === "http://purl.org/dc/dcmitype/Text"
  );

  // Identify threat and disease sections
  const threatObj = textObjects.find(
    obj => obj.identifier?.includes("FB-Threats")
  );
  const diseaseObj = textObjects.find(
    obj => obj.identifier?.includes("FB-Diseases")
  );

  // Threats: split by comma and clean
  const threatsText = threatObj?.description?.trim() || "";
  const threats = threatsText
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  // Diseases: split into pairs like [name, description]
  const diseasesText = diseaseObj?.description?.trim() || "";
  const diseasesRaw = diseasesText
    .split(/\d+\.\s*/) // split at "1. ", "2. ", etc.
    .map(item => item.trim())
    .filter(Boolean);

  // For each entry, separate name & cause
  const diseases = diseasesRaw.map(entry => {
    const match = entry.match(/^(.*?)\s+(Parasitic infestations.*)$/i);
    if (match) return [match[1].trim(), match[2].trim()];
    return [entry]; // fallback in case no split pattern matches
  });

  return { threats, diseases };
}

export function getThreeDStatusStatus(apiResponse) {
  return apiResponse?.threedstatus?.status ?? null;
}







