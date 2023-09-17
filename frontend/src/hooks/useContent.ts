import { useEffect, useState } from "react";

export function useContent(url?: string | URL) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    console.log("useContent", url);
    if (!url) return;

    const fetcher = async (url: string | URL) => {
      setLoading(true);
      const request = new URL(
        "https://2d22e8b86h.execute-api.eu-west-1.amazonaws.com/prod",
      );
      request.searchParams.append("url", url.toString());

      const response = await fetch(request);
      const data = await response.text();
      setContent(data);
      setLoading(false);
    };

    // const fetch = async () => {
    //   setLoading(true);
    //   const data = await fetchReaderView(url);
    //   setContent(data);
    //   setLoading(false);
    // };

    fetcher(url);
  }, [url]);

  return { isLoading, content };
}
