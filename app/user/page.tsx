"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserDetails from "../../components/UserDetails";

export default function UserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://nest-prisma-mongo.onrender.com/users/${id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError("Failed to fetch user details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return <UserDetails user={user} onBack={() => router.back()} />;
}
