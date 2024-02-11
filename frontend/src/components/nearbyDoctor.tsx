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

    const [searchState, setSearchState] = useState({
        searchStarted : false,
        doctorFound : false,
        message : "",
        nearbyDoctors :  [] as Doctor[] | null,
      });

      /*const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = async (event) => {
        const inputValue = event.currentTarget.value
        [...]
    }*/

    const handleSearch: React.MouseEventHandler<HTMLButtonElement> = async (event) => {

      const specialty = specialtyRef.current.value
      const distance = distanceRef.current.value
      const long = longRef.current.value
      const lat = latRef.current.value

      const res = await searchNearbyDoctorsFromApi(long, lat, distance, specialty)
      console.log(res.status)

      const updatedSearchState = {...searchState}
      if (res.status === 404) {
        updatedSearchState.message = "No doctor found"
        updatedSearchState.doctorFound = false
      } else if (res.status === 200) {
        updatedSearchState.message = "We found doctors that suit your request!"
        updatedSearchState.doctorFound = true
        updatedSearchState.nearbyDoctors = res.doctors
      } else {
        updatedSearchState.message = "sorry, come back later"
        updatedSearchState.doctorFound = false
      }

      setSearchState(updatedSearchState)
    }

    // const handleStateChanges = (long, lat, distance, specialty) => {

    // }
    
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
            <button className="mb-3" onClick={handleSearch}>Submit search</button>

            <h2 className='m-3'>{searchState.message}</h2>

            <div className={`grid grid-cols-4 space-y-2 gap-2 ${searchState.doctorFound ? '' : 'hidden'}`}>

              {searchState.nearbyDoctors!.map((d:Doctor, i:number) => (
                <DoctorCard key={i} doctor={d}/>
              ))}
            </div>

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