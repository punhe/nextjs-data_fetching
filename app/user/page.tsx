"use client";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { User } from "../../types/user";
import UserDetails from "../../components/UserDetails";

interface UserDetailProps {
  user: User | null;
  error: string | null;
}

export default function UserDetail({ user, error }: UserDetailProps) {
  const router = useRouter();

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-4 text-red-500">{error}</p>
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">User not found</h1>
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return <UserDetails user={user} onBack={() => router.back()} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const response = await fetch(`http://localhost:3000/api/users?id=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user: User = await response.json();
    return { props: { user, error: null } };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {
      props: {
        user: null,
        error: "Failed to fetch user details. Please try again later.",
      },
    };
  }
};
