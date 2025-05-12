import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X, PlusCircle, Image } from "lucide-react";
import { MenuData, MenuItem } from "../types";

interface MenuFormProps {
  menuData: MenuData;
  onBusinessInfoChange: (field: keyof Omit<MenuData, 'items'>, value: string) => void;
  onMenuItemAdd: (item: MenuItem) => void;
  onMenuItemUpdate: (index: number, item: MenuItem) => void;
  onMenuItemRemove: (index: number) => void;
  onStyleChange: (field: 'photoSize' | 'photoShape' | 'backgroundColor', value: string) => void;
}

export default function MenuForm({ 
  menuData, 
  onBusinessInfoChange, 
  onMenuItemAdd, 
  onMenuItemUpdate, 
  onMenuItemRemove,
  onStyleChange
}: MenuFormProps) {
  const [newItem, setNewItem] = useState<MenuItem>({
    name: "",
    price: "",
    photo: ""
  });

  const handleNewItemChange = (field: keyof MenuItem, value: string) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const handleNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      onMenuItemAdd(newItem);
      setNewItem({ name: "", price: "", photo: "" });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'itemPhoto', itemIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === 'logo') {
        onBusinessInfoChange('logo', reader.result as string);
      } else if (field === 'itemPhoto' && itemIndex === undefined) {
        handleNewItemChange('photo', reader.result as string);
      } else if (field === 'itemPhoto' && itemIndex !== undefined) {
        const updatedItem = { ...menuData.items[itemIndex], photo: reader.result as string };
        onMenuItemUpdate(itemIndex, updatedItem);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Business Information */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Tasty Bites Cafe" 
                  value={menuData.businessName}
                  onChange={(e) => onBusinessInfoChange('businessName', e.target.value)}
                />
              </FormControl>
            </FormItem>
            
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 123 Stockbridge Rd, Edinburgh" 
                  value={menuData.address}
                  onChange={(e) => onBusinessInfoChange('address', e.target.value)}
                />
              </FormControl>
            </FormItem>
            
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {menuData.logo ? (
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img 
                        src={menuData.logo} 
                        alt="Logo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-md">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                  />
                </FormControl>
              </div>
            </FormItem>
          </div>
        </CardContent>
      </Card>
      
      {/* Menu Items */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
          
          {/* Menu Item List */}
          {menuData.items.length > 0 && (
            <div className="space-y-6 mb-6">
              {menuData.items.map((item, index) => (
                <div key={index} className="p-4 border rounded-md relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => onMenuItemRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input 
                          value={item.name}
                          onChange={(e) => onMenuItemUpdate(index, { ...item, name: e.target.value })}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          value={item.price}
                          onChange={(e) => onMenuItemUpdate(index, { ...item, price: e.target.value })}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <div className="flex items-center space-x-2">
                        {item.photo && (
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img 
                              src={item.photo} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <FormControl>
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'itemPhoto', index)}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Add New Item Form */}
          <form onSubmit={handleNewItemSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Classic Burger" 
                    value={newItem.name}
                    onChange={(e) => handleNewItemChange('name', e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., £5.99" 
                    value={newItem.price}
                    onChange={(e) => handleNewItemChange('price', e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'itemPhoto')}
                  />
                </FormControl>
              </FormItem>
            </div>
            
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Customization Options */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Customization Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormItem>
              <FormLabel>Photo Size</FormLabel>
              <Select 
                value={menuData.photoSize} 
                onValueChange={(value) => onStyleChange('photoSize', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            
            <FormItem>
              <FormLabel>Photo Shape</FormLabel>
              <Select 
                value={menuData.photoShape} 
                onValueChange={(value) => onStyleChange('photoShape', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            
            <FormItem>
              <FormLabel>Background Color</FormLabel>
              <div className="flex space-x-2 items-center">
                <Input 
                  type="color" 
                  value={menuData.backgroundColor}
                  onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input 
                  type="text" 
                  value={menuData.backgroundColor}
                  onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
                  className="flex-1"
                  placeholder="#FFFFFF"
                />
              </div>
            </FormItem>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
