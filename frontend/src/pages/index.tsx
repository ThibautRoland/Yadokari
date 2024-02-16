import React, { useState, useRef, useEffect } from 'react';
import {Layout} from '../components/layout';
import { Doctor} from '../interface/doctor';
import { DoctorList } from '../components/doctorList';
import { SearchDoctor } from '../components/searchDoctor';
import { NearbyDoctor } from '../components/nearbyDoctor';
import Link from 'next/link';
import { getAllDoctorFromApi } from '../api/doctor';

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
  /*
  Previous code used to change className for tabs 
  
  const [stateLink, setStateLink] = useState<HTMLAnchorElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null)*/

  // useEffect(() => {
  //   setStateLink((prevElement) => {
  //     if (!prevElement) {
  //       return linkRef.current;
  //     }
  //     return prevElement;
  //   });
  // }, [])

  /*useEffect(() => {
    setStateLink(linkRef.current)
  }, [])*/

  const handleClick = async (event:React.MouseEvent<HTMLLIElement>, idTab: number) => {

    /*
    Previous code used to change className for tabs 
    
    const fakeLink = event.currentTarget.children[0]
    if (idTab === stateNumber) {
      return 
    }
    stateLink!.classList.add('hover:text-gray-600', 'hover:bg-gray-50', 'dark:hover:bg-gray-800', 'dark:hover:text-gray-300')
    stateLink!.classList.remove('text-blue-600', 'bg-gray-100', 'active', 'dark:bg-gray-800', 'dark:text-blue-500')
    fakeLink.classList.add('text-blue-600', 'bg-gray-100', 'active', 'dark:bg-gray-800', 'dark:text-blue-500')
    fakeLink.classList.remove('hover:text-gray-600', 'hover:bg-gray-50', 'dark:hover:bg-gray-800', 'dark:hover:text-gray-300')
    setStateLink(fakeLink)*/
    setStateNumber(idTab);
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


    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">


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
</ul>

<Link href="./create"> Create </Link>

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
  /*const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/doctors`
  const res = await fetch(url)*/
  
  const doctors = await getAllDoctorFromApi()

  return {
    props: {
      doctors
    },
  }
}