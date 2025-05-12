import { Card, CardContent } from "@/components/ui/card";
import { Utensils, MapPin } from "lucide-react";
import { MenuData } from "../types";

interface MenuPreviewProps {
  menuData: MenuData;
}

export default function MenuPreview({ menuData }: MenuPreviewProps) {
  const { 
    businessName, 
    address, 
    logo, 
    items, 
    photoSize, 
    photoShape, 
    backgroundColor 
  } = menuData;

  if (!businessName) {
    return (
      <div className="text-center py-12 border rounded-md">
        <Utensils className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg mb-2">Start building your menu</p>
        <p className="text-gray-500">Fill in your business information to preview your menu</p>
      </div>
    );
  }

  return (
    <div 
      className="border rounded-lg shadow-sm overflow-hidden" 
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center">
          {logo ? (
            <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
              <img 
                src={logo} 
                alt={businessName} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md mr-4">
              <Utensils className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{businessName}</h2>
            {address && (
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Our Menu</h3>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No menu items yet. Add some items to see them here.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center space-x-4">
                  {item.mediaType === 'image' && item.photo ? (
                    <div className={`overflow-hidden flex-shrink-0 
                      menu-shape-${photoShape} 
                      menu-size-${photoSize}`}
                    >
                      <img 
                        src={item.photo} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : item.mediaType === 'video' && item.video ? (
                    <div className={`overflow-hidden flex-shrink-0 
                      menu-shape-${photoShape} 
                      menu-size-${photoSize}`}
                    >
                      <video 
                        src={item.video}
                        loop
                        muted
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`bg-gray-100 flex items-center justify-center flex-shrink-0
                      menu-shape-${photoShape} 
                      menu-size-${photoSize}`}
                    >
                      <Utensils className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="text-primary font-medium">{item.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
