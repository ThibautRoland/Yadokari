
type IndexProps = {
  posts: any
}

export default function Home({ posts }:IndexProps) {

  console.log(posts)
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

  const res = await fetch('http://localhost:3000/doctors')
  const posts = await res.json()

  console.log("from getStatic" +posts)

  return {
    props: {
      posts,
    },
  }
}