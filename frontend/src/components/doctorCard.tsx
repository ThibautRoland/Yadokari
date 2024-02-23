import { Doctor } from "../interface/doctor"
import { deleteDoctorFromApi } from "../api/doctor"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAmbulance,
  faTrash,
  faPencil,
  faFaceAngry
} from "@fortawesome/free-solid-svg-icons";

type DoctorCardProps = {
  doctor: Doctor
}

export const DoctorCard = ({ doctor}: DoctorCardProps) => {

  const handleDelete = async (id: number) => {
    const confirmation = confirm("are you sure you want to delete?");

    if (!confirmation) {
      return
    }

    const res = deleteDoctorFromApi(id)
    console.log(res)
    res.then(
      function(value) {value ? location.reload() : alert("an error occured")}
    )
  }

  function getSpecialityNameBySpecialityKey(key : any) : string {

    if (typeof key === 'string' || key instanceof String) {
      return key as string
    }

    switch (key) {
      case 1:
        return ("Anesthesiology")
      case 2:
        return ("Psychiatry")
      case 3:
        return ("Surgery")
    }
    return "undefined"
  }
  return <div className="flex flex-col h-80 w-64 mx-auto bg-white rounded-md overflow-hidden shadow-md">
    <div className="flex flex-row bg-slate-100">
      <img
        className="basis-1/3 w-full h-16"
        src="https://www.svgrepo.com/show/48298/doctor.svg"
        alt="Card Image"
      />
      <div className="basis-2/3 flex items-center justify-end pe-1">
        <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
      </div>
    </div>

    <div className="flex flex-col pt-5 pb-2 pl-12">
      <p className="text-lg">Specializes in</p>
      <p className="text-gray-700 mb-4 text-lg font-bold">{getSpecialityNameBySpecialityKey(doctor.speciality)}</p>
    </div>
    <p className="text-center"> Coordinates:</p>
    <div className="flex justify-between px-5 py-3">
      <p>longitude</p>
      <p className="font-bold">{doctor.x}</p>
    </div>
    <div className="flex justify-between px-5">
      <p>latitude</p>
      <p className="font-bold">{doctor.y}</p>
    </div>
    <div className="flex flex-row justify-between py-5 px-3">
      <Link href={`/edit/${doctor.id}`}>
        <FontAwesomeIcon icon={faPencil} size="lg"/>
      </Link>
      <button onClick={(event) => handleDelete(doctor.id)}>
        <FontAwesomeIcon icon={faTrash} size="lg"/>
      </button>
    </div>
</div>
}