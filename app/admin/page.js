'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState(1);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, page }),
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
        setIsLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <div className="mb-2">
          <label className="block text-lg">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-lg">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleLogin}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
      {contacts.length === 0 ? (
        <p>No contact submissions available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 border-b text-left font-semibold text-gray-600">Name</th>
                <th className="py-3 px-6 border-b text-left font-semibold text-gray-600">Contact</th>
                <th className="py-3 px-6 border-b text-left font-semibold text-gray-600">Source</th>
                <th className="py-3 px-6 border-b text-left font-semibold text-gray-600">Questions</th>
                <th className="py-3 px-6 border-b text-left font-semibold text-gray-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6 border-b text-gray-700">{contact.name}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{contact.contact}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{contact.source}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{contact.questions}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{contact.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
