import { Doctor } from "../interface/doctor"
import { DoctorCard } from './doctorCard';

type DoctorListProps = {
  doctors: Array<Doctor>
}

export const DoctorList = ({ doctors}: DoctorListProps) => {
  return     <div>
  <h1 className="text-3xl"> get all doctors</h1>

  <div className="grid grid-cols-4 space-y-2 gap-2">
  {doctors.map((d: Doctor, i: number) => (
            <DoctorCard key = {i} doctor={d}/>
        )) }
</div>
      </div>
}