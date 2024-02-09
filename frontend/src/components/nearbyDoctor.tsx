import React, { useState } from 'react';
import { useRef  } from 'react';
import { Doctor} from '../interface/doctor';

import { searchNearbyDoctorsFromApi } from '../api/doctor';
import { DoctorCard } from './doctorCard';

export function NearbyDoctor () {

    const specialtyRef = useRef(null)
    const distanceRef = useRef(null)
    const longRef = useRef(null)
    const latRef = useRef(null)

    // const [stateSearch, setStateSearch] = useState({
    //     searchStarted : false,
    //     doctorInput : '',
    //     doctorFound : false,
    //     message : "bjr",
    //     doctor :  {} as Doctor | null,
    //   });

    const handleSearch = (event:any) => {
      console.log(specialtyRef.current.value)
      const specialty = specialtyRef.current.value
      const distance = distanceRef.current.value
      const long = longRef.current.value
      const lat = latRef.current.value

      const nearbyDoctors = searchNearbyDoctorsFromApi(long, lat, distance, specialty)
      console.log(nearbyDoctors)
    }
    
    return     <div>
        <h1 className="text-3xl"> Find a doctor near you that suits you! </h1>
            
            <p>What specialty are you looking for?</p>
            <input type="text" ref={specialtyRef}/>
            <p>Distance in km from you</p>
            <input type="text" ref={distanceRef} />
            <p>your coordinates</p>
            <div className="flex flex-row">
              <div>
                <p>longitude</p>
                <input type="text" ref={longRef}/>
              </div>
              <div>
                <p>latitude</p>
                <input type="text" ref={latRef}/>
              </div>
            </div>
            <button onClick={handleSearch}>Submit search</button>

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