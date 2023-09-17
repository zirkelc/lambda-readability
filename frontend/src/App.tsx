import { useState } from "react";
import { Button } from "./components/Button";
import { Spinner } from "./components/Spinner";
import { useContent } from "./hooks/useContent";
import { useUrlState } from "./hooks/useUrlState";

function App() {
  const [input, setInput] = useState<string>("");
  const [url, setUrl] = useUrlState("url");
  const { content, isLoading } = useContent(url);

  console.log("url", url);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const inputUrl = new URL(input);
    setUrl(inputUrl.toString());
  };

  return (
    <div className="container mx-auto">
      {url ? (
        isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col items-center justify-center py-4 space-y-4 divide-y divide-solid">
            <nav className="flex flex-row w-full">
              <a
                href={url}
                target="_blank"
                referrerPolicy="no-referrer"
                className="font-mono"
              >
                {url.toString()}
              </a>
            </nav>
            <article
              className="prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <footer className="flex flex-row w-full"></footer>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-screen max-w-xl mx-auto">
          <input
            className="w-full rounded-lg rounded-r-none border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-black"
            type="url"
            placeholder="https://example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="rounded-l-none" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
