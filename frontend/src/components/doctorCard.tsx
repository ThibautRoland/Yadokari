import { Doctor } from "../interface/doctor"

type DoctorCardProps = {
  doctor: Doctor
}

export const DoctorCard = ({ doctor}: DoctorCardProps) => {
  return <div className="flex flex-row max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
  <img
    className="object-cover w-full h-10"
    src="https://www.svgrepo.com/show/48298/doctor.svg"
    alt="Card Image"
  />
  <div className="p-6">
    <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
    <p className="text-gray-700 mb-4">{doctor.speciality}</p>
    <div className="text-blue-700"> {doctor.x} - {doctor.y}   </div>
  </div>
</div>
}