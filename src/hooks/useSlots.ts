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
  refresh: () => Promise<void>;
}

export function useSlots({ date, roomId }: UseSlotsParams): UseSlotsResult {
  const [slots, setSlots] = useState<SlotsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = async () => {
    if (!date || !roomId) {
      setSlots(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_SLOTS_URL}?date=${date}&roomId=${encodeURIComponent(
        roomId
      )}`;
      const data = await fetchApi<SlotsResponse>(url);
      setSlots(data || null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch slots";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [date, roomId]);

  return { slots, loading, error, refresh: fetchSlots };
}
