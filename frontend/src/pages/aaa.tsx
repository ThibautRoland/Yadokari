import React, { useState } from 'react';
import {Layout} from '../app/layout';

type IndexProps = {
  doctors: any
}

export default function aaa({ doctors}:IndexProps) {

const [stateSearch, setStateSearch] = useState({
  searchStarted : false,
  doctorInput : '',
  doctorFound : false
});

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    console.log("first ",stateSearch)
    const resDoctor6 = await fetch('http://localhost:3001/doctors/Doctor6')
    const doctor6 = await resDoctor6.json()

    var copy = stateSearch
    copy.searchStarted = !copy.searchStarted
    setStateSearch({
      searchStarted : !stateSearch.searchStarted,
  doctorInput : '',
  doctorFound : false,
  });



  };

  return (
    <Layout>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-100">

      <div className="flex flex-col">

      <button onClick={handleClick}>
      Click me!
    </button>

    <div className={`bg-blue-500 px-4 py-2 rounded ${stateSearch.searchStarted ? 'hidden' : ''} `}>
          BOUYAKACHA
    </div>


      {doctors.map((d: any) => (

            <div key = {d.id}>
                {d.id} - {d.name} - {d.speciality}
            </div>
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