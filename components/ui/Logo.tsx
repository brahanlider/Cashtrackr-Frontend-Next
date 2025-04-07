import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <>
      <Image
        className="w-full"
        src="/logo.svg"
        width={0}
        height={0}
        alt="Logo de CashTrackr"
        priority
      />
    </>
  );
}
