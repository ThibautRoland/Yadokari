import { Doctor } from "../interface/doctor"

type ResSearch = {
    doctor: Doctor | null,
    status : number
  }

type ResNearbySearch = {
    doctors: Array<Doctor> | null, 
    status: number
}

export async function  searchDoctorFromApi(name : string) : Promise<ResSearch> {
    
    const resDoctor = await fetch(`http://localhost:3001/doctors/${name}`)

    const resStatus = resDoctor.status
    if ( resStatus != 200) {
        return  { doctor : null , status : resStatus}
    }

    const doctor = await resDoctor.json()
    return  { doctor : doctor , status : resStatus}
}

export async function searchNearbyDoctorsFromApi(long: number, lat: number, distance: number, specialty: string) : Promise<ResNearbySearch> {
    const resNearbyDoctors = await fetch(`http://localhost:3001/doctors/${distance}/${long}/${lat}/${specialty}`)

    const resStatus = resNearbyDoctors.status
    if ( resStatus != 200) {
        return  { doctors : null , status : resStatus}
    }

    const nearbyDoctors = await resNearbyDoctors.json()
    return { doctors: nearbyDoctors, status: resStatus }
}