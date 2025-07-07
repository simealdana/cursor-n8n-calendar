"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_ROOMS_URL } from "@/apiUrls";

export interface Room {
  id: string;
  name: string;
  email: string;
}

interface UseRoomsResult {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

export function useRooms(): UseRoomsResult {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchApi<{ rooms: Room[] }>(API_ROOMS_URL)
      .then((data) => {
        if (isMounted) {
          setRooms(data.rooms);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch rooms");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { rooms, loading, error };
}
