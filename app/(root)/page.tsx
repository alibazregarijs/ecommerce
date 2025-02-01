import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

const page = async () => {

  const session = await auth();
  const userId = session?.user?.id;

  return (
    <>
      <Navbar />
      <Header />
      <Hero  userId={userId as string} />
      <Footer />
    </>
  );
};

export default page;
