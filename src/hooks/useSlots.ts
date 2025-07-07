"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_SLOTS_URL } from "@/apiUrls";

export interface Slot {
  id: string;
  name: string;
  description: string;
  status: "available" | "occupied" | "unavailable";
  startDate: string;
  endDate: string;
}

interface UseSlotsParams {
  date: string;
  roomId: string;
}

interface SlotsResponse {
  slots: Slot[];
}

interface UseSlotsResult {
  slots: SlotsResponse | null;
  loading: boolean;
  error: string | null;
}

export function useSlots({ date, roomId }: UseSlotsParams): UseSlotsResult {
  const [slots, setSlots] = useState<SlotsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if we don't have both required parameters
    if (!date || !roomId) {
      setSlots(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    const url = `${API_SLOTS_URL}?date=${date}&roomId=${encodeURIComponent(
      roomId
    )}`;

    fetchApi<SlotsResponse>(url)
      .then((data) => {
        if (isMounted) {
          setSlots(data || null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch slots");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [date, roomId]);

  return { slots, loading, error };
}
