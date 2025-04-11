interface FieldErrorProps {
  errors?: string[];
  className?: string;
}

export function FieldError({ errors, className = "" }: FieldErrorProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className={`text-red-500 text-sm flex items-start gap-1 ${className}`}>
      <div>
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    </div>
  );
}
// import React from "react";

// export default function ErrorMessage({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <p className="text-center text-red-500 font-bold ">{children}</p>
//     </>
//   );
// }
