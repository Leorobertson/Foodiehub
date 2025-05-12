import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, BookOpen, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
          Create Beautiful Digital Menus for Your Restaurant
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          QuickMenu helps small restaurants create stunning online menus, share recipes,
          and connect with food lovers in a thriving community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu-builder">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Utensils className="mr-2 h-5 w-5" />
              Create Your Menu
            </Button>
          </Link>
          <Link href="/recipes">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Recipes
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Menu Builder</h3>
              <p className="text-gray-600">
                Create a beautiful digital menu for your restaurant with customizable options for photos, colors, and layout.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recipe Sharing</h3>
              <p className="text-gray-600">
                Share your favorite recipes with the community and discover new dishes from other food enthusiasts.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
              <p className="text-gray-600">
                Find and recommend the best restaurants in your area with honest reviews from our community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-gray-50 -mx-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Join Our Food Community</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with food lovers, share your culinary creations, and discover new restaurants and recipes.
          </p>
          
          <div className="flex justify-center">
            <Link href="/community">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="mr-2 h-5 w-5" />
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Card className="bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Digital Menu?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get started in minutes with our easy-to-use menu builder.
            </p>
            <Link href="/menu-builder">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Create Menu Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
