import React, { useState } from 'react';

type IndexProps = {
  doctors: any
}

export default function Index({ doctors}:IndexProps) {

const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    const resDoctor6 = await fetch('http://localhost:3001/doctors/Doctor6')
    const doctor6 = await resDoctor6.json()
    console.log(doctor6)
    setIsClicked(!isClicked);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-100">

      <div className="flex flex-col">

      <button onClick={handleClick}>
      Click me!
    </button>

    <div className={`bg-blue-500 px-4 py-2 rounded ${isClicked ? '' : 'hidden'} `}>
          BOUYAKACHA
    </div>


      {doctors.map((d: any) => (

            <div key = {d.id}>
                {d.id} - {d.name} - {d.speciality}
            </div>
            )) }

          </div>

    </main>
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