import { Doctor, DoctorModel } from "../interface/doctor"

type ResSearch = {
    doctor: Doctor | null,
    status : number
  }

type ResNearbySearch = {
    doctors: Array<Doctor> | null, 
    status: number
}

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function  getAllDoctorFromApi() : Promise<Array<Doctor>> {

    const url = `http://${API_HOST}:${API_PORT}/doctors`
    const res = await fetch(url)
    const doctors = await res.json() as Array<Doctor>

    return  doctors
}

export async function  searchDoctorFromApi(name : string) : Promise<ResSearch> {


    const resDoctor = await fetch(`http://${API_HOST}:${API_PORT}/doctors/${name}`)

    const resStatus = resDoctor.status
    if ( resStatus != 200) {
        return  { doctor : null , status : resStatus}
    }

    const doctor = await resDoctor.json()
    return  { doctor : doctor , status : resStatus}
}

export async function searchNearbyDoctorsFromApi(long: number, lat: number, distance: number, specialty: string) : Promise<ResNearbySearch> {
    const resNearbyDoctors = await fetch(`http://${API_HOST}:${API_PORT}/doctors/${distance}/${long}/${lat}/${specialty}`)

    const resStatus = resNearbyDoctors.status
    if ( resStatus != 200) {
        return  { doctors : null , status : resStatus}
    }

    const nearbyDoctors = await resNearbyDoctors.json()
    return { doctors: nearbyDoctors, status: resStatus }
}

export async function postDoctor(d : DoctorModel) : Promise<boolean> {

    const url = `http://${API_HOST}:${API_PORT}/doctors`
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(d),
        headers: {'Content-Type':'application/json', 'yadokari_admin':'true'},
      });

    return true
}