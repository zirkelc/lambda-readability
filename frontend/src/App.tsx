import { useUrlState } from "./hooks/useUrlState";
import { Content } from "./pages/Content";
import { Search } from "./pages/Search";

function App() {
  const [url, setUrl] = useUrlState("url");

  const handleSubmit = (input: string) => {
    const inputUrl = new URL(input);
    setUrl(inputUrl.toString());
  };

  return (
    <div className="container mx-auto">
      {url ? <Content url={url} /> : <Search onSubmit={handleSubmit} />}
    </div>
  );
}

export default App;
