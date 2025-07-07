"use client";
import { useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_CREATE_RESERVATION_URL } from "@/apiUrls";

export interface CreateReservationParams {
  date: string;
  time: string;
  roomId: string;
  email: string;
}

export interface CreateReservationResponse {
  message: string;
}

export interface CreateReservationResult {
  success: boolean;
  loading: boolean;
  error: string | null;
  data: CreateReservationResponse | null;
}

export function useCreateReservation() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateReservationResponse | null>(null);

  const createReservation = async (
    params: CreateReservationParams
  ): Promise<CreateReservationResult> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetchApi<CreateReservationResponse>(
        API_CREATE_RESERVATION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: params.date,
            time: params.time,
            roomId: params.roomId,
            email: params.email,
          }),
        }
      );

      setData(response);
      return {
        success: true,
        loading: false,
        error: null,
        data: response,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create reservation";
      setError(errorMessage);
      return {
        success: false,
        loading: false,
        error: errorMessage,
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createReservation,
    loading,
    error,
    data,
  };
}
