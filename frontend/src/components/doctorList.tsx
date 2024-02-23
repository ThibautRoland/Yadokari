import { Doctor } from "../interface/doctor"
import { DoctorCard } from './doctorCard';

type DoctorListProps = {
  doctors: Array<Doctor>
}

export const DoctorList = ({ doctors}: DoctorListProps) => {
  return     <div className="">
  <h1 className="text-3xl text-center py-4"> See all doctors</h1>
  <div className="flex flex-row">
    <div className="basis-1/12"></div>

    <div className="basis-10/12 grid grid-cols-4 space-y-2 gap-2">
    {doctors.map((d: Doctor, i: number) => (
              <DoctorCard key = {i} doctor={d}/>
          )) }
    </div>

    <div className="basis-1/12"></div>
  </div>
</div>
}