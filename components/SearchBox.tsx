"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-react";
import { Button } from "@/components/ui/button";
import SearchResetForm from "@/components/SearchResetForm";
import { CloseCircle } from "iconsax-react";
import Link from "next/link";

export const Searchbox = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full h-full">
      <form
        action=""
        onSubmit={handleSubmit}
        id="search-form"
        className="w-full h-full"
      >
        <Input
          id="search-input"
          placeholder="Search Books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full pl-10 pr-10" // Added pr-10 for right padding
          name="query"
        />
        <div className="absolute inset-y-0 left-3 flex items-center">
          <Button className="hidden" id="btnSubmit" type="submit"></Button>
          <label htmlFor="btnSubmit" className="cursor-pointer">
            <SearchNormal1 size="20" color="#000" />
          </label>
        </div>
        {query && (
          <SearchResetForm query={query} onReset={() => setQuery("")} />
        )}
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Link href="/" id="btnSubmit" type="reset">
            <CloseCircle
              onClick={() => setQuery("")}
              size="20"
              color="black"
            />
          </Link>
        </div>
      </form>
    </div>
  );
};