import React, { useState } from 'react';
import { postDoctor } from '../api/doctor';

export default function newDoctor () {
    const [doctor, setDoctor] = useState({
        "name" : "",
        "age": null,
        "speciality": null,
        "x": null,
        "y": null
    })

    const handleDoctorData = async (event: any, key: string) => {
        const doctorData = {...doctor};
        const value = event.currentTarget.value
        switch (key) {
            case "name":
                doctorData.name = value;
                break;
            case "age":
                doctorData.age = value;
                break;
            case "speciality":
                doctorData.speciality = value;
                break;
            case "x":
                doctorData.x = value;
                break;
            case "y":
                doctorData.y = value;
                break;
            default: 
                return
        }
        setDoctor(doctorData);

    }

    const handleClick = async (event: React.ChangeEventHandler<HTMLInputElement>) => {
        console.log(doctor);
        const res = postDoctor(doctor);
    }
  
    return <div>
        New doctor page
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
            <div className="basis-1/4"></div>

        </div>
    </div>
  }