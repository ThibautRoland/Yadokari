import { putDoctor } from '@/api/api/doctor';
import { DoctorForm } from '@/api/components/doctorForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useState} from 'react'


function DoctorPage() {
  const router = useRouter();
  const { id } = router.query;

  console.log(typeof parseInt(id as string));

  const [doctor, setDoctor] = useState({
    "name" : "",
    "age": 0,
    "speciality": 0,
    "x": 0,
    "y": 0
})

const handleDoctorData = async (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const doctorData = {...doctor};
    const value = event.currentTarget.value
    switch (key) {
        case "name":
            doctorData.name = value;
            break;
        case "age":
            doctorData.age = parseInt(value, 10);
            break;
        case "speciality":
            doctorData.speciality = parseInt(value, 10);
            break;
        case "x":
            doctorData.x = parseInt(value, 10);
            break;
        case "y":
            doctorData.y = parseInt(value, 10);
            break;
        default: 
            return
    }
    setDoctor(doctorData);

}


 
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(doctor);
    const res = putDoctor(doctor, parseInt(id as string));
    res.then(
        function(value) {value ? router.push('/') : alert('the inputs were not correctly fulfilled')},
        function(error) {console.log(error);}
    )
  }

  return (
    <div>
      <h1>Doctor Page</h1>
      <p>Doctor ID: {id}</p>
      {/* Fetch and render doctor information here */}
      <div className="">
        <div className="flex flex-row m-5">
            <div className="basis-1/4"></div>
            <div className="flex flex-col basis-1/2 border bg-slate-200 p-4">
                <h2 className="text-center m-4">Fill in the form</h2>
                <p>Name</p>
                <input onChange={(event) => handleDoctorData(event, "name")} type="text" className="border"/>
                <p>Age</p>
                <input onChange={(event) => handleDoctorData(event, "age")} type="text" className="border"/>
                <p>Speciality</p>
                <input onChange={(event) => handleDoctorData(event, "speciality")} type="text" className="border"/>
                <p>Longitude</p>
                <input onChange={(event) => handleDoctorData(event, "x")} type="text" className="border"/>
                <p>Latitude</p>
                <input onChange={(event) => handleDoctorData(event, "y")} type="text" className="border"/>
                <button className='border mt-4' onClick={handleClick}>Submit</button>
            </div>
            <div className="basis-1/4 flex justify-center">
              <Link href="/"> back </Link>
            </div>
        </div>
  </div>
      
    </div>
    
  );
}

export default DoctorPage;