import React, { useState } from 'react';
import {Layout} from '../components/layout';
import { searchDoctorFromApi } from '../api/doctor';
import { Doctor} from '../interface/doctor';
import { DoctorCard } from '../components/doctorCard';
import { DoctorList } from '../components/doctorList';
import { SearchDoctor } from '../components/searchDoctor';
import { NearbyDoctor } from '../components/nearbyDoctor';

type IndexProps = {
  doctors: Array<Doctor>
}

export default function aaa({ doctors}:IndexProps) {

  const [stateNumber, setStateNumber] = useState(0);

  function handleClik(event : any, idTab : number){

    setStateNumber(idTab)
    console.log("cliked " , idTab)
  }

  return (
    <Layout>
    <main className="flex min-h-screen flex-col p-8">

    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">


    <li className="me-2" onClick={(event) => handleClik(event, 0)}>
        <a href="#" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">
          Doctor List
        </a>
    </li>
    <li className="me-2" onClick={(event) => handleClik(event, 1)}>
        <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
          Doctor Search
        </a>
    </li>
    <li className="me-2" onClick={(event) => handleClik(event, 2)}>
        <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Settings</a>
    </li>
</ul>
<div className=''>

</div>


      <div className={`${stateNumber == 0 ? '' : 'hidden'}`}>
        <DoctorList doctors={doctors}/>
      </div>

      <div className={`${stateNumber == 1 ? '' : 'hidden'}`}>
        <SearchDoctor/>
      </div>

      <div className={`${stateNumber == 2 ? '' : 'hidden'}`}>
        <NearbyDoctor/>
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