
type IndexProps = {
  histories: any
  d: any
}

export default function Home({ histories, d }:IndexProps) {

  //console.log(histories)
  console.log(d)

  async function searchDoctor(doctorName:string){
    console.log(doctorName)
   // const res = await fetch(`http://127.0.0.1:3001/doctors/${doctorName}`)

    const res = await fetch(`http://localhost:3001/doctors/${doctorName}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": 'true',
      }
    });
    console.log(res)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col">

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            
            onClick = { () => searchDoctor('Doctor8') }>OU C KIL EST</button>
         

      {histories.map((d: any) => (

            <div key = {d.id}>
                {d.doctorName} - {d.dateSearched}
            </div>
            )) }

          </div>

    </main>
  );

}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3001/doctors/history')
  const histories = await res.json()

  //console.log("from getServersideprops" +histories)

  const resD = await fetch('http://localhost:3001/doctors/Doctor6')
  const resDJ = await resD.json()
  console.log("from getServersideprops search docteur" +resDJ)

  return {
    props: {
      histories,
      d: resDJ
    },
  }
}