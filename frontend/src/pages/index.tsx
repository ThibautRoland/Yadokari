
type IndexProps = {
  posts: any
}

export default function Home({ posts }:IndexProps) {

  console.log(posts)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col">

      {posts.map((d: any) => (

            <div key = {d.id}>
                {d.name}
            </div>
            )) }

          </div>

    </main>
  );

}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3001/doctors')
  const posts = await res.json()

  console.log("from getStatic" +posts)

  return {
    props: {
      posts,
    },
  }
}