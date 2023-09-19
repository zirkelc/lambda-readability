type Props = {
  error: string;
};

export function Error({ error }: Props) {
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      {error}
    </div>
  );
}
