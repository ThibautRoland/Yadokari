import { Doctor } from "../interface/doctor"
import { deleteDoctorFromApi } from "../api/doctor"

type DoctorCardProps = {
  doctor: Doctor
}

export const DoctorCard = ({ doctor}: DoctorCardProps) => {

  const handleDelete = async (id: number) => {
    const res = deleteDoctorFromApi(id)
    console.log(res)
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
  return <div className="flex flex-row max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
  <img
    className="object-cover w-full h-10"
    src="https://www.svgrepo.com/show/48298/doctor.svg"
    alt="Card Image"
  />
  <div className="p-6">
    <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
    <p className="text-gray-700 mb-4">{getSpecialityNameBySpecialityKey(doctor.speciality)}</p>
    <div className="text-blue-700"> {doctor.x} - {doctor.y}   </div>
  </div>
  <button onClick={(event) => handleDelete(doctor.id)}>delete</button>
</div>
}