"use client";

import { useState } from "react";
import { User } from "../types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://nest-prisma-mongo.onrender.com/users"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-indigo-800 p-6 bg-indigo-50">
          User Management
        </h1>

        <div className="p-6">
          <button
            onClick={fetchUsers}
            className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Show All Users"}
          </button>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg"
              role="alert"
            >
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
              <p>
                No users available. Please click the button to show all users.
              </p>
            </div>
          )}

          {users.length > 0 && (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="py-3 px-4 font-semibold text-indigo-800 border-b border-indigo-200">
                      First Name
                    </th>
                    <th className="py-3 px-4 font-semibold text-indigo-800 border-b border-indigo-200">
                      Last Name
                    </th>
                    <th className="py-3 px-4 font-semibold text-indigo-800 border-b border-indigo-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                      }
                    >
                      <td className="py-3 px-4 border-b border-indigo-100 font-medium">
                        {user.firstName}
                      </td>
                      <td className="py-3 px-4 border-b border-indigo-100 font-medium">
                        {user.lastName}
                      </td>
                      <td className="py-3 px-4 border-b border-indigo-100">
                        <button
                          className="view-details-button"
                          onClick={() =>
                            (window.location.href = `/user?id=${user.id}`)
                          }
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
