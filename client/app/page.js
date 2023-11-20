import { MovieRecommendations } from './components/MovieRecommendations'

export default async function Home() {

  const res = await fetch('http://localhost:3030/users')
  const users = await res.json()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8 bg-gray-900 text-white">
      <MovieRecommendations users={users} />
    </main>
  )
}