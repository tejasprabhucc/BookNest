"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to BookNest
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover a world of knowledge at your fingertips. Borrow, read, and
            explore with our extensive digital library.
          </p>
          <Button size="lg" asChild>
            <Link href="/login">
              <span>{"Get Started"}</span>
            </Link>
          </Button>
        </motion.div>
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/library-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
    </section>
  );
};

export default HeroSection;
