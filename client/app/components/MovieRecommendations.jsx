'use client'

import { useState } from 'react'

export function MovieRecommendations({users }) {


  const [selectedUser, setSelectedUser] = useState('')
  const [content, setContent] = useState({ users: [], movies: [] })
  const [activeTab, setActiveTab] = useState('movies')



  const handleSearch = async () => {
    const res = await fetch(`http://localhost:3030/${selectedUser}`)
    const result = await res.json()
    console.log(result)
    setContent(result)
  }

  return (
    <div className="w-full max-w-xl p-6 bg-gray-800 rounded shadow-md">

    <div className="mb-4">
      <label htmlFor="user-select" className="block text-sm font-medium text-gray-300">Select User</label>
      <select
        id="user-select"
        className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="" className="text-gray-300">Select a user...</option>
        {users.map((user) => (
          <option key={user.id} value={user.id} className="text-gray-900">
            {user.name}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={handleSearch}
      className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Search
    </button>



    <div className="flex mt-6">
      <button
        className={`py-2 px-4 ${activeTab === 'movies' ? 'bg-gray-700' : 'bg-gray-600'}`}
        onClick={() => setActiveTab('movies')}
      >
        Movie Recommendations
      </button>
      <button
        className={`py-2 px-4 ${activeTab === 'users' ? 'bg-gray-700' : 'bg-gray-600'}`}
        onClick={() => setActiveTab('users')}
      >
        Matching Users
      </button>
    </div>

    <div className="mt-4 text-gray-300">
      {activeTab === 'movies' && (
        <ul>
          {content.movies.map((movie) => (
            <li key={movie.id}>{movie.id}. {movie.title} - Score: {movie.weightedScore.toFixed(4)}</li>
          ))}
        </ul>
      )}
      {activeTab === 'users' && (
        <ul>
          {content.users.map((user) => (
            <li key={user.userId}>{user.userId}. {user.name} - Similarity: {user.similarity.toFixed(4)}</li>
          ))}
        </ul>
      )}
    </div>

  </div>
  );
}