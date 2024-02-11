import React, { useState } from 'react';
import { Doctor} from '../interface/doctor';

import { searchDoctorFromApi } from '../api/doctor';
import { DoctorCard } from './doctorCard';

export function SearchDoctor () {

    const [stateSearch, setStateSearch] = useState({
        searchStarted : false,
        doctorInput : '',
        doctorFound : false,
        message : "bjr",
        doctor :  {} as Doctor | null,
      });

      const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = async (event) => {
        const inputValue = event.currentTarget.value
        if (event.key === "Enter") {
            handleChangeInput(inputValue)
        }
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
      const inputElement = event.currentTarget.previousElementSibling as HTMLInputElement;

      if (inputElement) {
          const inputValue = inputElement.value;
          handleChangeInput(inputValue);
      }
    }

    const handleChangeInput = async (input:string) => {

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