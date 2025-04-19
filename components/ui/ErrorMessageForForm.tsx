export default function ErrorMessageForForm({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="text-center text-red-500 font-bold ">{children}</p>
    </>
  );
}
