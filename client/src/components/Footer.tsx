import { Link } from "wouter";
import { Instagram, Twitch, Utensils } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Utensils className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">QuickMenu</span>
            </div>
            <p className="text-gray-400 mb-4">
              Create beautiful digital menus for your restaurant and join our food community.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/QuickMenuApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://tiktok.com/@QuickMenuApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitch"
              >
                <Twitch className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu-builder">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Create a Menu
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/recipes">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Recipes
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/recommendations">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Recommendations
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Join the Challenge</h3>
            <p className="text-gray-400 mb-2">
              Share your menu or recipe with #QuickMenuChallenge
            </p>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary-foreground">
                #QuickMenuChallenge
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              Questions or feedback? Reach out to us.
            </p>
            <a 
              href="mailto:hello@quickmenu.co" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              hello@quickmenu.co
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} QuickMenu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
