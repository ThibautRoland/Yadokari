import React, { useState } from 'react';
import { Doctor} from '../interface/doctor';

import { searchDoctorFromApi } from '../api/doctor';
import { DoctorCard } from './doctorCard';

export function NearbyDoctor () {



    const [stateSearch, setStateSearch] = useState({
        searchStarted : false,
        doctorInput : '',
        doctorFound : false,
        message : "bjr",
        doctor :  {} as Doctor | null,
      });

    const handleChangeInput = async (event: any) => {
    
        const inputValue = event.currentTarget.previousElementSibling.value
    
        /*const resDoctor = await fetch(`http://localhost:3001/doctors/${InputValue}`)
        console.log("resDoctor status ",resDoctor.status)
        const doctor = await resDoctor.json()*/
    
        const res = await searchDoctorFromApi(inputValue)
    
        const updatedSearchState = {
          ...stateSearch
        };
    
        if (res.status == 404) {
          updatedSearchState.message = "no doctor found"
          updatedSearchState.doctorFound = false
          
        } else if (res.status == 200){
          updatedSearchState.message = "doctor found"
          updatedSearchState.doctorFound = true
          updatedSearchState.doctor = res.doctor
        } else {
          updatedSearchState.message = "sorry, come back later"
          updatedSearchState.doctorFound = false
        }
    
        setStateSearch(updatedSearchState);
      }
    
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