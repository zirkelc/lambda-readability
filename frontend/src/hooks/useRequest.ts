import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useRequest(url?: string | URL) {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<string>("");

  useEffect(() => {
    if (!url) return;

    const request = async (url: string | URL) => {
      setStatus("loading");
      const request = new URL(import.meta.env.VITE_API_URL);
      request.searchParams.append("url", url.toString());

      try {
        const response = await fetch(request, {
          mode: "cors",
          headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
        });

        if (response.ok) {
          setData(await response.text());
          setStatus("success");
        } else {
          setData(response.statusText);
          setStatus("error");
        }
      } catch (error) {
        const { message } = error as Error;
        setData(message);
        setStatus("error");
      }
    };

    request(url);
  }, [url]);

  return {
    status,
    data,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
