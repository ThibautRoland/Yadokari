import React, { useState } from 'react';
import {Layout} from '../app/layout';
import { searchDoctor } from '../api/doctor';
import { Doctor} from '../interface/doctor';
import { DoctorCard } from '../components/doctorCard';

type IndexProps = {
  doctors: Array<Doctor>
}

export default function aaa({ doctors}:IndexProps) {

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

    const res = await searchDoctor(inputValue)

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

  return (
    <Layout>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-100">

      <div className="flex flex-col">

    <input type="text"/>
    <button onClick={ handleChangeInput}> Search Doctor</button>
    <div>{stateSearch.message}</div>

    <div className={`${stateSearch.doctorFound ? '' : 'hidden'}`}>
    
      <DoctorCard doctor={stateSearch.doctor!}/>
    </div>

      {doctors.map((d: Doctor, i: number) => (
                <DoctorCard key = {i} doctor={d}/>
            )) }

          </div>

    </main>
    </Layout>
  );

}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3001/doctors')
  const doctors = await res.json()

  console.log("from getServersideprops doctors:" +doctors);

  return {
    props: {
      doctors
    },
  }
}