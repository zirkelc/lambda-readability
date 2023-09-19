import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useUrlState(
  key: string,
): [string, Dispatch<SetStateAction<string>>] {
  const [state, setState] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    return value !== null ? value : "";
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const value = params.get(key);
      console.log("popstate", value);
      setState(value !== null ? value : "");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [key]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (state !== null && state !== undefined && state !== "") {
      params.set(key, state);
    } else {
      params.delete(key);
    }

    const newSearch = params.toString();
    const newUrl =
      window.location.pathname + (newSearch ? "?" + newSearch : "");

    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.pushState({}, "", newUrl);
    }
  }, [key, state]);

  return [state, setState];
}
