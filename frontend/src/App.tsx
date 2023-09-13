import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [url, setUrl] = useState<string>();
  const [content, setContent] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (!url) return;

    setLoading(true);
    const request = new URL(
      "https://2d22e8b86h.execute-api.eu-west-1.amazonaws.com/prod",
    );
    request.searchParams.append("url", url);

    const response = await fetch(request);
    const data = await response.text();
    setContent(data);
    setLoading(false);
  };

  const handleReset = () => {};

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : content ? (
        <>
          <button onClick={handleReset}>Reset</button>
          <article
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </>
      ) : (
        <>
          <input
            type="url"
            placeholder="https://example.com"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
