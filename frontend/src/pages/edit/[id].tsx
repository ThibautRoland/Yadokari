import { putDoctor } from '@/api/api/doctor';
import { DoctorForm } from '@/api/components/doctorForm';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  return <div>
      <h1 className='text-center text-3xl'>Edit your doctor</h1>
      {/* Fetch and render doctor information here */}
      <div className="flex flex-row m-5">
            <div className="basis-1/3"></div>
            <div className="flex flex-col basis-1/3 p-4">
                <h2 className="text-center m-4">Fill in the form</h2>
                <p>What is the doctor's name?</p>
                <input placeholder="Doctor's name" onChange={(event) => handleDoctorData(event, "name")} type="text" className="slate-input p-2 mb-2"/>
                <p>How old is the doctor?</p>
                <input placeholder="Doctor's age" onChange={(event) => handleDoctorData(event, "age")} type="text" className="slate-input p-2 mb-2"/>
                <p>What is the doctor's speciality ? (check the key)</p>
                <input placeholder="Speciality key" onChange={(event) => handleDoctorData(event, "speciality")} type="text" className="slate-input p-2 mb-2"/>
                <p className="text-center">Coordinates</p>
                <div className='flex flex-row mb-2'>
                    <input placeholder="longitude" onChange={(event) => handleDoctorData(event, "x")} type="text" className="slate-input p-2 basis-1/2 mr-1"/>
                    <input placeholder="latitude" onChange={(event) => handleDoctorData(event, "y")} type="text" className="slate-input p-2 basis-1/2 ml-1"/>
                </div>
                <div className="flex justify-center mt-2">
                    <button className='mb-3 border rounded-lg w-1/2 p-2 hover:bg-slate-100' onClick={handleClick}>Edit</button>
                </div>
            </div>
            <div className="basis-1/3 flex justify-center">
                <Link href="/"> 
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <button className="text-lg ms-1">Back</button> 
                </Link>
            </div>
      </div>
    </div>
  }

export default DoctorPage;