'use client'

import { useState } from 'react'

export function Matches({ users }) {

  const [selectedUser, setSelectedUser] = useState('')
  const [content, setContent] = useState({ users: [], movies: [] })
  const [activeTab, setActiveTab] = useState('movies')

  const handleSearch = async () => {
    if (!selectedUser) return
    const res = await fetch(`http://localhost:3030/${selectedUser}`)
    const result = await res.json()
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
              {user.id}. {user.name}
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
          className={`py-2 px-4 flex-1 ${activeTab === 'movies' ? 'bg-gray-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('movies')}
        >
          Movie Recommendations
        </button>
        <button
          className={`py-2 px-4 flex-1 ${activeTab === 'users' ? 'bg-gray-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('users')}
        >
          Matching Users
        </button>
      </div>

      <div className="mt-4 px-8 text-gray-300 overflow-x-auto">
        {activeTab === 'movies' && content.movies.length > 0 && (
          <table className="min-w-full bg-gray-800 rounded-md">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="w-2/3 px-4 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody>
              {content.movies.map((movie) => (
                <tr key={movie.id} className="border-b border-gray-700">
                  <td className="w-1/6 px-4 py-2 whitespace-nowrap">{movie.id}</td>
                  <td className="w-2/3 text-center px-4 py-2 whitespace-nowrap">{movie.title}</td>
                  <td className="w-1/6 px-4 py-2 whitespace-nowrap">{movie.weightedScore.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'users' && content.users.length > 0 && (
          <table className="min-w-full bg-gray-800 rounded-md">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="w-2/3 px-4 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Similarity</th>
              </tr>
            </thead>
            <tbody>
              {content.users.map((user) => (
                <tr key={user.userId} className="border-b border-gray-700">
                  <td className="w-1/6 px-4 py-2 whitespace-nowrap">{user.userId}</td>
                  <td className="w-2/3 px-4 py-2 text-center whitespace-nowrap">{user.name}</td>
                  <td className="w-1/6 px-4 py-2 whitespace-nowrap">{user.similarity.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


    </div>
  )
}