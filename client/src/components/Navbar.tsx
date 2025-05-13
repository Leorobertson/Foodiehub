import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Utensils, Menu, X, Home, Video, Heart, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "For You", icon: <Video className="h-5 w-5" />, path: "/" },
    { name: "Explore", icon: <Search className="h-5 w-5" />, path: "/home" },
    { name: "Menu Builder", icon: <Utensils className="h-5 w-5" />, path: "/menu-builder" },
    { name: "Recipes", icon: <Heart className="h-5 w-5" />, path: "/recipes" },
    { name: "Profile", icon: <User className="h-5 w-5" />, path: "/profile/masterchef" },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Utensils className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl text-gray-900">FoodTok</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-12">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  onClick={() => window.location.href = link.path}
                  className={`flex flex-col items-center transition-colors cursor-pointer ${
                    location === link.path
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div>{link.icon}</div>
                  <span className="text-xs mt-1 font-medium">{link.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="default"
              size="sm"
              className="hidden md:flex"
              asChild
            >
              <Link href="/upload">
                <div className="flex items-center space-x-1">
                  <span>+</span>
                  <span>Upload</span>
                </div>
              </Link>
            </Button>
            
            <Avatar 
              className="h-8 w-8 cursor-pointer" 
              onClick={() => window.location.href = "/profile/masterchef"}
            >
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=user1" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
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
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b shadow-sm">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path}>
                <a
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </a>
              </Link>
            ))}
            <div className="pt-2">
              <Button 
                variant="default"
                className="w-full"
                asChild
              >
                <Link href="/upload">
                  <div className="flex items-center justify-center space-x-1">
                    <span>+</span>
                    <span>Upload</span>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
