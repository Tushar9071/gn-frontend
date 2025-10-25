import { useState } from "react";

interface ReturnData {
  statusCode?: number;
  isError: boolean;
  message: string;
  data?: any;
}

export const useFetchApi = () => {
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState<ReturnData>();

  const callApi = async (
    url: string,
    options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    body?: Record<string, any>
  ): Promise<any> => {
    setPending(true);
    try {
      const fetchOptions: RequestInit = {
        ...options,
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(url, fetchOptions);

      let result: any;
      if (!res.ok) {
        const errorData = await res.json();
        result = {
          statusCode: res.status,
          isError: true,
          message: errorData?.message || `HTTP error! Status: ${res.status}`,
        };
      } else {
        const data = await res.json();
        result = {
          ...data,
          statusCode: res.status,
        };
      }

      setResponse(result);
      return result;
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

  return [callApi, pending, response] as [
    typeof callApi,
    boolean,
    ReturnData | null
  ];
};
