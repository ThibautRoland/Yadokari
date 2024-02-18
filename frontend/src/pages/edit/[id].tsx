import { useRouter } from 'next/router';

function DoctorPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Doctor Page</h1>
      <p>Doctor ID: {id}</p>
      {/* Fetch and render doctor information here */}
    </div>
  );
}

export default DoctorPage;