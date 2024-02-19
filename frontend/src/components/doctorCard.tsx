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
  return <div className="flex flex-col max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
    <div className="flex flex-row bg-slate-100">
      <img
        className="basis-1/3 w-full h-10"
        src="https://www.svgrepo.com/show/48298/doctor.svg"
        alt="Card Image"
      />
      <div className="basis-2/3 flex content-center justify-end">
        <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
      </div>
    </div>
  <div className="p-6">
    <p className="text-gray-700 mb-4">{getSpecialityNameBySpecialityKey(doctor.speciality)}</p>
    <div className="text-blue-700"> {doctor.x} - {doctor.y}   </div>
  </div>
  <button onClick={(event) => handleDelete(doctor.id)}>
    <FontAwesomeIcon icon={faTrash}/>
  </button>
  {/* <button onClick={(event) => handleEdit(doctor.id)}>edit</button> */}
  <Link href={`/edit/${doctor.id}`}><FontAwesomeIcon icon={faPencil}/></Link>
</div>
}