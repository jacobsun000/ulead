'use client'
import { useState, useEffect } from 'react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/contact')
        .then((response) => response.json())
        .then((data) => setContacts(data.contacts))
        .catch((error) => console.error('Error fetching contacts:', error));
    }
  }, [isLoggedIn]);

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
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Source</th>
              <th className="py-2 px-4 border-b">Questions</th>
              <th className="py-2 px-4 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="py-2 px-4 border-b">{contact.name}</td>
                <td className="py-2 px-4 border-b">{contact.contact}</td>
                <td className="py-2 px-4 border-b">{contact.source}</td>
                <td className="py-2 px-4 border-b">{contact.questions}</td>
                <td className="py-2 px-4 border-b">{contact.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Notes:
// 1. The credentials are hardcoded as 'admin' and 'password123' for simplicity.
// 2. The /api/contact endpoint should be updated to support a GET request to return all contacts.
