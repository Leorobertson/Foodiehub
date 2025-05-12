import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MenuForm from "../components/MenuForm";
import MenuPreview from "../components/MenuPreview";
import { MenuData, MenuItem } from "../types";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MenuBuilder() {
  const { toast } = useToast();
  const [menuData, setMenuData] = useState<MenuData>({
    businessName: "",
    address: "",
    logo: "",
    items: [],
    photoSize: "medium",
    photoShape: "rounded",
    backgroundColor: "#ffffff"
  });

  const handleBusinessInfoChange = (field: keyof Omit<MenuData, 'items'>, value: string) => {
    setMenuData(prev => ({ ...prev, [field]: value }));
  };

  const handleMenuItemAdd = (item: MenuItem) => {
    setMenuData(prev => ({ ...prev, items: [...prev.items, item] }));
  };

  const handleMenuItemUpdate = (index: number, item: MenuItem) => {
    setMenuData(prev => {
      const newItems = [...prev.items];
      newItems[index] = item;
      return { ...prev, items: newItems };
    });
  };

  const handleMenuItemRemove = (index: number) => {
    setMenuData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  const handleStyleChange = (field: 'photoSize' | 'photoShape' | 'backgroundColor', value: string) => {
    setMenuData(prev => ({ ...prev, [field]: value }));
  };

  const generateMenuPage = () => {
    // This would normally make an API call to save the menu and generate a URL
    const businessNameSlug = menuData.businessName.toLowerCase().replace(/\s+/g, '-');
    const fakeUrl = `quickmenu.co/${businessNameSlug}`;
    
    toast({
      title: "Menu Page Generated!",
      description: `Your menu is available at: ${fakeUrl}`,
      duration: 5000,
    });
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${menuData.businessName.replace(/\s+/g, '-')}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const shareToSocial = (platform: string) => {
    const businessNameSlug = menuData.businessName.toLowerCase().replace(/\s+/g, '-');
    const fakeUrl = `quickmenu.co/${businessNameSlug}`;
    
    // This would normally generate actual sharing links
    toast({
      title: `Share to ${platform}`,
      description: `Sharing ${fakeUrl} to ${platform}`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Digital Menu</h1>
      
      <Tabs defaultValue="editor" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <MenuForm 
            menuData={menuData}
            onBusinessInfoChange={handleBusinessInfoChange}
            onMenuItemAdd={handleMenuItemAdd}
            onMenuItemUpdate={handleMenuItemUpdate}
            onMenuItemRemove={handleMenuItemRemove}
            onStyleChange={handleStyleChange}
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <MenuPreview menuData={menuData} />
          
          {menuData.businessName && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Generate Menu Page</h3>
                  <p className="text-gray-600 mb-4">
                    Create a public page for your menu that you can share with customers.
                  </p>
                  <Button 
                    onClick={generateMenuPage}
                    className="w-full"
                  >
                    Generate Menu Page
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">QR Code</h3>
                  <div className="flex flex-col items-center">
                    <div className="mb-4 border p-4 bg-white">
                      <QRCodeSVG
                        id="qr-code-canvas"
                        value={`https://quickmenu.co/${menuData.businessName.toLowerCase().replace(/\s+/g, '-')}`}
                        size={200}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Button
                        variant="outline"
                        onClick={downloadQRCode}
                        className="flex items-center justify-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => shareToSocial('Instagram')}
                        className="flex items-center justify-center"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
