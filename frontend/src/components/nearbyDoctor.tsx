import React, { useState } from 'react';
import { Doctor} from '../interface/doctor';

import { searchNearbyDoctorsFromApi } from '../api/doctor';
import { DoctorCard } from './doctorCard';

export function NearbyDoctor () {



    const [stateSearch, setStateSearch] = useState({
        searchStarted : false,
        doctorInput : '',
        doctorFound : false,
        message : "bjr",
        doctor :  {} as Doctor | null,
      });
    
    return     <div>
        <h1 className="text-3xl"> Nearby Doctor </h1>
            
            <p>TODOOOO</p>
        </div>

    }



    {/*
function HomePage() {
  // 	...
  function handleClick() {
    console.log('increment like count');
  }
 
  return (
    <div>
      <button onClick={handleClick}>Like</button>
    </div>
  );
}

*/}