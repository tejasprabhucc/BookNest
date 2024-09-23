"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const t = useTranslations("LandingPage");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {t("description")}
          </p>
          <Button className="rounded-lg" size="lg" asChild>
            <Link href="/login">
              <span>{t("button")}</span>
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
