import { Doctor } from "../interface/doctor"

type ResSearch = {
    doctor: Doctor | null,
    status : number
  }

export async function  searchDoctor(name : string) : Promise<ResSearch> {
    
    const resDoctor = await fetch(`http://localhost:3001/doctors/${name}`)

    const resStatus = resDoctor.status
    if ( resStatus != 200) {
        return  { doctor : null , status : resStatus}
    }

    const doctor = await resDoctor.json()
    return  { doctor : doctor , status : resStatus}
}