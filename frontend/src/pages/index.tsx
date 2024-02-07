
type IndexProps = {
  doctors: any
  doctor: any
}

export default function Home({ doctors, doctor }:IndexProps) {

  console.log("from home function", doctors)
  async function test(){

  }

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    const res = await fetch('http://localhost:3000/doctors')
  const posts = await res.json()
  console.log(posts)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col">

      <button onClick={handleClick}>
      Click me!
    </button>

      {doctors.map((d: any) => (

            <div key = {d.id}>
                {d.doctorName} - {d.dateSearched}
            </div>
            )) }

          </div>

    </main>
  );

}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3000/doctors')
  const doctors = await res.json()

  console.log("from getServersideprops doctors:" +doctors);

  const resD = await fetch('http://localhost:3001/doctors/Doctor6')
  const doctor = await resD.json();
  console.log("from getServersideprops search docteur" +doctor);

  return {
    props: {
      doctors,
      doctor
    },
  }
}