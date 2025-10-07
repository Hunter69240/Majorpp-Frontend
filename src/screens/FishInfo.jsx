import React from 'react'
import ModelViewer from '../components/ModelViewer'

export default function FishInfo() {
  return (
    <div>

        {/* //3d model of fish + scientific name */}
        <div className='flex flex-col md:flex-row gap-15 p-10'>
            {/* //3d model */}
           <div>
                
                <ModelViewer />
                {/* <img src="/Mock-Model.png" alt="3D Model of Fish" /> */}
           </div>

           <div className='flex flex-col gap-5'>
                {/* //scientific name */}
                <div>
                    <div className='flex gap-2 items-baseline'>
                        <p className='text-3xl font-bold'>Scientific Name |</p>
                         <p className='text-3xl font-bold opacity-11'>Common Name</p>
                    </div>
                    <p className='opacity-12 text-xl'>Kingdom → Phylum → Class → Order → Family → Genus → Species</p>
                </div>
                {/* //general desc */}
                <div>
                    <p className='py-5 text-2xl font-bold'>General Desc</p>

                    <p className='text-justify  max-w-xl'>
                        Lacustrine as well as fluviatile species, confined to lakes and moderate to 
                        large rivers (Ref. 43912). Shoals in standing or slowly flowing open water with 
                        emergent or submerged vegetation. Generally more active at night or in subdued light. 
                        Feed from mid-water and surface waters on a wide variety of foods including fish, insects, 
                        shrimps, snails, plant seeds, and fruit. Oviparous, eggs are unguarded (Ref. 205). Often 
                        important spawning migrations occur (Ref. 43912). Breed during the rainy season and may be 
                        either a single or multiple spawner in different localities, laying eggs on vegetation. May 
                        live up to 6-7 years (Ref. 7248). Max total length 45.0mm (Ref. 43912). Also caught with drawnets. 
                        In general considered as a flavoured, first class eating fish (Ref. 43912).
                    </p>
                </div>
           </div>
        </div>
        
        {/* //habitat/Migration +Distribution */}
        <div className='flex justify-around gap-10 p-10 flex-col md:flex-row'>
            {/* //Distribution */}
            <div className='max-w-lg'>
                <p className='font-semibold text-xl'>Distribution</p>
                <ul>
                   <li> {'\u2022'} The Nile basin and in West Africa </li> 
                   <li> {'\u2022'} The Senegal River eastwards to the Cross, Wouri </li>
                   <li> {'\u2022'} The Sanaga River, including the Chad basin (Ref. 43912).</li>
                   <li> {'\u2022'} The Ogowe and Congo River basin </li>
                   <li> {'\u2022'} Zambia and Zimbabwe, are based on misidentifications</li>
                </ul>
            </div>

            {/* //Habitat/Migration */}
            <div className='max-w-lg'>
                <p className='font-semibold text-xl '>Habitat/Migration</p>
                    <ul>
                    <li> {'\u2022'} Demersal; potamodromous (Ref. 51243); freshwater; depth range 4 - 69 m </li>
                    <li> {'\u2022'} Potamodromous. Migrating within streams, migratory in rivers, e.g. Saliminus, Moxostoma, Labeo. Migrations should be cyclical and predictable and cover more than 100 km.</li>
                    </ul>
            </div>

        </div>

        {/* Life cycle |size + Uses */}
        <div className='flex justify-around gap-10 p-10 flex-col md:flex-row'>
            {/* //Life cycle |Size */}
            <div>
                <p className='font-semibold text-xl'>Life Cycle | Size</p>

                <ul className='max-w-lg'>
                    <li> {'\u2022'} Distinct Pairing</li>
                    <li> {'\u2022'} 35.0 cm SL (male/unsexed; (Ref. 57127)); max. published 
                        .   weight: 250 g (Ref. 3799); max. reported age: 7 years</li>
                </ul>
            </div>

            {/* //Uses */}
            <div>
                <p className='font-semibold text-xl'>Uses</p>
                <ul>
                    <li> {'\u2022'} Fisheries: Commercial</li>
                    <li> {'\u2022'} Gamefish : Yes</li>
                    <li> {'\u2022'} Aquarium : Commercial</li>
                </ul>
            </div>

        </div>

        {/* //Threats | Diseases */}
        <div className='flex justify-around gap-10 p-10 flex-col md:flex-row'>
            <div>
                <p className='font-semibold text-xl'>Threats | Diseases</p>
                <ul>
                    <li> {'\u2022'} Least Concern (LC) , IUCN Grouper and Wrasse Specialist Group</li>
                    <li> {'\u2022'} Schilbetrema Infestation 1. Parasitic infestations (protozoa, worms, etc.)</li>
                    <li> {'\u2022'} Schilbetrema Infestation 2. Parasitic infestations (protozoa, worms, etc.)</li>
                </ul>
            </div>

            <div></div>
        </div>

    </div>
  )
}