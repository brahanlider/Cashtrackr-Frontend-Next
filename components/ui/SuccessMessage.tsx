export default function SuccessMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="text-center bg-amber-500 font-bold p-2">{children}</p>
    </>
  );
}
