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

const LandingPage = async () => {
  // const { theme, setTheme } = useTheme();
  const books = (await fetchBooks(
    {
      offset: 0,
      limit: 10,
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-6 w-6" />
              <span className="font-bold text-2xl">BookNest</span>
            </Link>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">{t("language")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Español</DropdownMenuItem>
                  <DropdownMenuItem>Français</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
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
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Email: info@booknest.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Library St, Booktown, BT 12345</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="mb-4">
                Stay updated with our latest books and features.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mb-2 border rounded"
              />
              <Button className="w-full">Subscribe</Button>
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
