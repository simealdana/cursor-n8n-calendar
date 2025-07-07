"use client";
import { useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_CREATE_RESERVATION_URL } from "@/apiUrls";

export interface CreateReservationParams {
  roomId: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
  attendees: string[];
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
  const createReservation = async (params: {
    roomId: string;
    startDate: string;
    endDate: string;
    name: string;
    description: string;
    attendees: string[];
  }): Promise<CreateReservationResult> => {
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
            roomId: params.roomId,
            startDate: params.startDate,
            endDate: params.endDate,
            name: params.name,
            description: params.description,
            attendees: params.attendees,
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
