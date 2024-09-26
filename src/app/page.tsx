import Link from "next/link";
// import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  BookOpen,
  Clock,
  RefreshCw,
  Moon,
  Sun,
  Globe,
  Mountain,
} from "lucide-react";
import HeroSection from "@/src/components/landing/hero-section";
import BooksMarque from "@/src/components/landing/books-marquee";
import { fetchBooks } from "@/src/lib/actions";
import { IBook, IPagedResponse } from "@/src/lib/definitions";
import Features from "@/src/components/landing/features-section";
import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "@/src/components/localeSwitcher";
import LocaleSwitcherSelect from "../components/localeSwitcherSelect";
import { ModeToggle } from "@/src/components/ui/theme-change";

const LandingPage = async () => {
  // const { theme, setTheme } = useTheme();
  const books = (await fetchBooks(
    {
      offset: 0,
      limit: 8,
    },
    undefined,
    {
      sortBy: "id",
      sortOrder: "asc",
    }
  )) as IPagedResponse<IBook>;

  const t = await getTranslations("LandingPage");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navbar */}
      <nav className=" m-auto fixed top-0 left-0 right-0 z-50  backdrop-blur-sm mt-5 rounded-xl max-w-[1280px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-6 w-6" />
              <span className="font-bold text-2xl">BookNest</span>
            </Link>
            <div className="flex items-center space-x-4">
              <LocaleSwitcher />
              <ModeToggle />
              <Button variant="outline" asChild>
                <Link href="/login">{t("logIn")}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{t("signUp")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Book Marquee */}
      <BooksMarque books={books.items} />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl mb-8">{t("cta.description")}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">{t("cta.button")}</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">{t("footer.quicklinks.title")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/signup" className="hover:underline">
                    {t("footer.quicklinks.getStarted")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    {t("footer.quicklinks.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    {t("footer.quicklinks.terms")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    {t("footer.quicklinks.privacyPolicy")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t("footer.contact.title")}</h3>
              <ul className="space-y-2">
                <li>{t("footer.contact.email")}</li>
                <li>{t("footer.contact.phone")}</li>
                <li>{t("footer.contact.address")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t("footer.socials.title")}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    {t("footer.socials.facebook")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("footer.socials.instagram")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("footer.socials.linkedin")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("footer.socials.twitter")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4"> {t("footer.connect.title")}</h3>
              <p className="mb-4">{t("footer.connect.description")}</p>
              <input
                type="email"
                placeholder={t("footer.connect.enterEmail")}
                className="w-full p-2 mb-2 border rounded"
              />
              <Button className="w-full">{t("footer.connect.button")}</Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <p>&copy; 2023 BookNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
