import { useState } from "react";

interface ReturnData {
  isError: boolean;
  message: string;
  data?: any;
}

export const useFetchApi = () => {
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState<ReturnData | null>(null);

  const callApi = async (
    url: string,
    options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    body?: Record<string, any>
  ): Promise<void> => {
    setPending(true);
    try {
      const fetchOptions: RequestInit = {
        ...options,
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(url, fetchOptions);

      if (!res.ok) {
        setResponse({
          isError: true,
          message: `HTTP error! Status: ${res.status}`,
        });
        return;
      }

      const data = (await res.json()) as ReturnData;
      setResponse(data);
    } catch (error: any) {
      console.error("Error in API fetching:", error);
      setResponse({
        isError: true,
        message: error.message ?? "Unexpected error occurred",
      });
    } finally {
      setPending(false);
    }
  };

  return { pending, response, callApi };
};
