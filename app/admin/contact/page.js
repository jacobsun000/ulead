"use client";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/admin/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedContacts }),
      });

      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.filter((contact) => !selectedContacts.includes(contact.id))
        );
        setSelectedContacts([]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to delete contacts");
    }
  };

  const handleDownloadCSV = () => {
    const csvContent =
      ["id,name,contact,source,questions,created_at"]
        .concat(
          contacts.map((contact) =>
            [
              contact.id,
              contact.name,
              contact.contact,
              contact.source || "",
              contact.questions || "",
              contact.created_at,
            ].join(",")
          )
        )
        .join("\n");

    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "contacts.csv");
  };

  const handleSelectContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Contact Manager</h1>

      {loading ? (
        <p>Loading contacts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between p-4">
            <button
              onClick={handleDelete}
              className={`bg-primary text-white px-4 py-2 rounded ${selectedContacts.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={selectedContacts.length === 0}
            >
              Delete Selected
            </button>
            <button
              onClick={handleDownloadCSV}
              className="bg-secondary text-white px-4 py-2 rounded"
            >
              Download CSV
            </button>
          </div>
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedContacts(
                        e.target.checked ? contacts.map((c) => c.id) : []
                      )
                    }
                  />
                </th>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Source</th>
                <th className="p-4">Questions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-100">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleSelectContact(contact.id)}
                    />
                  </td>
                  <td className="p-4">{contact.name}</td>
                  <td className="p-4">{contact.contact}</td>
                  <td className="p-4">{contact.source || "-"}</td>
                  <td className="p-4">{contact.questions || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
