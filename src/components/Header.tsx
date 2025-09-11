import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  className?: string;
  isHeroPage?: boolean; // 👈 pass this when rendering header
}

const defaultNavItems: NavItem[] = [
  { label: "home", href: "/" },
  { label: "projects", href: "/Projects" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

const Header: React.FC<HeaderProps> = ({
  logo = "Irtiza",
  navItems = defaultNavItems,
  className,
  isHeroPage = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparentHero = isHeroPage && !isScrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        transparentHero
          ? "bg-transparent border-none"
          : "bg-background border-b border-border",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className={cn(
              "text-xl font-bold font-serif text-foreground transition-opacity duration-300",
              transparentHero && "opacity-0 pointer-events-none"
            )}
          >
            {logo}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  transparentHero
                    ? "text-white hover:text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={item.onClick}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 px-4 space-y-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
