import React, { useState, useRef, useEffect } from 'react';
import {Layout} from '../components/layout';
import { Doctor} from '../interface/doctor';
import { HistoryModel } from '../interface/history';
import { DoctorList } from '../components/doctorList';
import { SearchDoctor } from '../components/searchDoctor';
import { NearbyDoctor } from '../components/nearbyDoctor';
import Link from 'next/link';
import { getAllDoctorFromApi } from '../api/doctor';
import { History } from '../components/history';
import { getHistoryFromApi } from '../api/history';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faSearch,
  faAmbulance,
  faTrash,
  faFaceAngry
} from "@fortawesome/free-solid-svg-icons";

type IndexProps = {
  doctors: Array<Doctor>
} 

export default function index({ doctors}:IndexProps) {

  const [stateNumber, setStateNumber] = useState(0);
  const [history, setHistory] = useState([{
    id: 0,
    doctorName: '',
    dateSearched: ''
  }]);

  const handleClick = async (event:React.MouseEvent<HTMLLIElement>, idTab: number) => {
    setStateNumber(idTab);
    if (idTab === 3) {
      fetchHistory();
    }
  }

  const fetchHistory = async () => {
    const res = await getHistoryFromApi();
    if (res.status === 200) {
      // const dataHistory = {... history}
      setHistory(res.history)
    }
  }

  return (
    <Layout>
    <main className="flex min-h-screen flex-col p-8">
    <FontAwesomeIcon
    icon={faAmbulance}
    style={{ fontSize: 12, color: "orange" }}
/>
      <FontAwesomeIcon
        icon={faSearch}
        style={{ fontSize: 12, color: "blue" }}
      />

<FontAwesomeIcon icon={faTrash} />

<div className="flex flex-row">

  <div className="basis-1/6"></div>

  <div className="basis-4/6">
    <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2" onClick={(event) => handleClick(event, 0)}>
        <a href="#" aria-current="page" className={`${stateNumber == 0 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
          Doctor List
        </a>
      </li>
      <li className="me-2" onClick={(event) => handleClick(event,1)}>
        <a href="#" className={`${stateNumber == 1 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
          Doctor Search
        </a>
      </li>
      <li className="me-2" onClick={(event) => handleClick(event, 2)}>
        <a href="#" className={`${stateNumber == 2 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
          Doctors Nearby
        </a>
      </li>
      <li className="ml-auto" onClick={(event) => handleClick(event, 3)}>
        <a href="#" className={`${stateNumber == 3 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
          Search history
        </a>
      </li>
    </ul>
  </div>
  
  <div className="basis-1/6 flex justify-center items-center">
    <Link href="./create"><button className="border p-3 rounded-lg hover:bg-slate-100">Add a doctor</button></Link>
  </div>

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

      <div className={`${stateNumber == 3 ? '' : 'hidden'}`}>
        <History history={history}/>
      </div>


    </main>
    </Layout>
  );

}

export async function getServerSideProps() {
  /*const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/doctors`
  const res = await fetch(url)*/
  
  const doctors = await getAllDoctorFromApi()

  return {
    props: {
      doctors
    },
  }
}