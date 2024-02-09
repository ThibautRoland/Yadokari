import React, { useState } from 'react';
import { Doctor} from '../interface/doctor';

import { searchDoctorFromApi } from '../api/doctor';
import { DoctorCard } from './doctorCard';

export function SearchDoctor () {

    {/*
    event listener for make the search with "enter" keyPressed 
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Perform your action here, e.g., submit the form, make an API call, etc.
      console.log('Enter key pressed. Value:', inputValue);
    }
  };


  <input type="text" onKeyDown={handleKeyPress}
      />
*/

}


    const [stateSearch, setStateSearch] = useState({
        searchStarted : false,
        doctorInput : '',
        doctorFound : false,
        message : "bjr",
        doctor :  {} as Doctor | null,
      });

    const handleEnterPress = async (event:any) => {
        const inputValue = event.currentTarget.value
        if (event.key === "Enter") {
            handleChangeInput(inputValue)
        }
    }

    const handleClick = async (event:any) => {
        const inputValue = event.currentTarget.previousElementSibling.value
        handleChangeInput(inputValue)
    }

    const handleChangeInput = async (input:string) => {
    

    
        /*const resDoctor = await fetch(`http://localhost:3001/doctors/${InputValue}`)
        console.log("resDoctor status ",resDoctor.status)
        const doctor = await resDoctor.json()*/
    
        const res = await searchDoctorFromApi(input)
    
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
        <h1> search one doctor </h1>
            <input type="text" onKeyDown={handleEnterPress}/>
            <button onClick={ handleClick}> Search Doctor</button>
            <div>{stateSearch.message}</div>

            <div className={`${stateSearch.doctorFound ? '' : 'hidden'}`}>
    
            <DoctorCard doctor={stateSearch.doctor!}/>
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