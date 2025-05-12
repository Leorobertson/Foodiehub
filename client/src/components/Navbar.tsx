import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Utensils, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu Builder", path: "/menu-builder" },
    { name: "Recipes", path: "/recipes" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Community", path: "/community" },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Utensils className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl text-gray-900">QuickMenu</span>
              </div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <a
                    className={`px-2 py-1 text-sm font-medium rounded-md transition-colors ${
                      location === link.path
                        ? "text-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <Button 
              variant="secondary"
              asChild
            >
              <Link href="/menu-builder">
                Create Menu
              </Link>
            </Button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b shadow-sm">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path}>
                <a
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <div className="pt-2">
              <Button 
                variant="secondary"
                className="w-full"
                asChild
              >
                <Link href="/menu-builder">
                  Create Menu
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
