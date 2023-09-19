import { Spinner } from "@/components/Spinner";
import { Error } from "@/components/Error";
import { useRequest } from "@/hooks/useRequest";

type Props = {
  url: string;
};

export function Content({ url }: Props) {
  const { data, isLoading, isError, isSuccess } = useRequest(url);

  if (isLoading) return <Spinner />;

  if (isError) return <Error error={data} />;

  return isSuccess ? (
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
        dangerouslySetInnerHTML={{ __html: data }}
      />
      <footer className="flex flex-row w-full"></footer>
    </div>
  ) : null;
}
