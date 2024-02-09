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

  return (
    <Layout>
    <main className="flex min-h-screen flex-col p-8">

    <div className="flex flex-col">
      <h1> nearbyByDoctor</h1>
      <p> TODO </p>
    </div>



      <SearchDoctor/>


      <DoctorList doctors={doctors}/>
      <NearbyDoctor/>

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