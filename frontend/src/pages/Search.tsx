import { Button } from "@/components/Button";
import { useState } from "react";

type Props = {
  onSubmit: (input: string) => void;
};

export function Search({ onSubmit }: Props) {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex flex-col justify-center h-screen max-w-xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-center text-blue-gray-900">
          <span className="text-orange-500">Lambda</span>{" "}
          <span className="text-black">Readability</span>
        </h1>
        <p className="m-4 text-center text-blue-gray-600">
          Enter a URL to get started
        </p>
      </div>
      <div className="flex">
        <input
          className="w-full rounded-lg rounded-r-none border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-black"
          type="url"
          placeholder="https://example.com"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="rounded-l-none" onClick={() => onSubmit(input)}>
          Read
        </Button>
      </div>
    </div>
  );
}
