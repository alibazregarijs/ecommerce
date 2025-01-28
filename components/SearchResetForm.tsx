"use client";
import React from "react";
import { CloseCircle } from "iconsax-react";
import Link from "next/link";

const SearchResetForm = ({ query, onReset }: { query: string; onReset: () => void }) => {
  const handleResetFormFunc = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <div
      className="absolute inset-y-0 right-3 flex items-center"
      onClick={handleResetFormFunc}
    >
      <Link href="/" id="btnSubmit" type="reset">
        <CloseCircle onClick={handleResetFormFunc} size="20" color="black" />
      </Link>
    </div>
  );
};

export default SearchResetForm;
