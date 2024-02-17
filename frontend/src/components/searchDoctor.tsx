import React, { useState } from 'react';
import { Doctor} from '../interface/doctor';

import { searchDoctorFromApi } from '../api/doctor';
import { DoctorCard } from './doctorCard';

export function SearchDoctor () {

    const [stateSearch, setStateSearch] = useState({
        searchStarted : false,
        doctorInput : '',
        doctorFound : false,
        message : "",
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

        const res = await searchDoctorFromApi(input);
        const numberOfDoctorsFromRes = [res.doctor].flat().length;

        const updatedSearchState = {
          ...stateSearch
        };

        if (res.status == 404) {
          updatedSearchState.message = "no doctor found with this name"
          updatedSearchState.doctorFound = false
        } else if (numberOfDoctorsFromRes > 1){
          updatedSearchState.message = "Blank input"
          updatedSearchState.doctorFound = false
        } else if (res.status == 200){
          updatedSearchState.message = "doctor found"
          updatedSearchState.doctorFound = true
          updatedSearchState.doctor = res.doctor
        } else {
          updatedSearchState.message = "sorry, come back later"
          updatedSearchState.doctorFound = false
        }
        console.log(numberOfDoctorsFromRes)
        setStateSearch(updatedSearchState);
      }

    return     <div>
      <h1 className="py-4 text-center text-3xl"> search one doctor </h1>
      <div className="flex flex-row">
        <div className="basis-1/4"></div>

        <div className="basis-1/2">
          <div className="flex">
            <input placeholder="Name of the doctor" className="bg-slate-200 w-3/4 p-2 me-3 rounded" type="text" onKeyUp={handleEnterPress}/>
            <button className="border w-1/4 rounded-lg hover:bg-slate-100" onClick={ handleClick}> Search Doctor</button>
          </div>

          <div className="text-center py-4">{stateSearch.message}</div>

          <div className={`${stateSearch.doctorFound ? '' : 'hidden'}`}>
            <DoctorCard doctor={stateSearch.doctor!}/>
          </div>
        </div>

        <div className="basis-1/4"></div>

      </div>
    </div>

    }