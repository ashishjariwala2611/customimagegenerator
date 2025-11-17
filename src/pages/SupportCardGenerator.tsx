import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Upload, User } from "lucide-react";
import barAssociationSeal from "@/assets/bar-association-seal.png";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const SupportCardGenerator = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    
    if (!photo) {
      toast.error("Please upload a photo");
      return;
    }

    try {
      toast.loading("Generating image...");
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `support-card-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.dismiss();
      toast.success("Card downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate image");
      console.error("Download error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-campaign-light via-background to-campaign-light py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Support Card Generator
          </h1>
          <p className="text-muted-foreground">
            Create your personalized campaign support card
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <Card className="p-6 space-y-6 sticky top-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                Enter Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter supporter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="text-lg font-semibold">
                Upload Photo
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="photo"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload photo (Max 5MB)
                  </span>
                  {photo && (
                    <img
                      src={photo}
                      alt="Preview"
                      className="mt-4 w-32 h-32 object-cover rounded-lg border-2 border-primary"
                    />
                  )}
                </label>
              </div>
            </div>

            <Button
              onClick={handleDownload}
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Card (1080×1350)
            </Button>
          </Card>

          {/* Card Preview Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                ref={cardRef}
                className="shadow-2xl overflow-hidden"
                style={{
                  width: "540px",
                  height: "675px",
                  position: "relative",
                  background: "#f5f1e8",
                }}
              >
                {/* Top Orange Wave */}
                <div className="absolute top-0 left-0 right-0" style={{ height: "120px" }}>
                  <svg viewBox="0 0 540 120" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                    <defs>
                      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#ff8c42", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#8b4513", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path d="M0,0 L540,0 L540,90 Q405,110 270,90 T0,70 Z" fill="url(#orangeGradient)" />
                  </svg>
                  
                  {/* Header Text */}
                  <div className="absolute top-4 left-6 right-28">
                    <h1 className="text-white font-bold text-xl leading-tight">
                      Surat District Bar<br />Association Election - 2026
                    </h1>
                  </div>

                  {/* Seal Logo */}
                  <div className="absolute top-2 right-4">
                    <img 
                      src={new URL("../assets/bar-association-seal.png", import.meta.url).href}
                      alt="Seal"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Decorative Dots Pattern */}
                <div className="absolute left-6 top-32 opacity-30">
                  <div className="flex gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="absolute top-140 left-6 right-6" style={{ top: "145px" }}>
                  {/* Gujarati Heading */}
                  <div className="mb-3">
                    <p className="text-lg font-bold leading-tight" style={{ color: "#2c3e50" }}>
                      આદરણીય સિનીયર તથા જુનીયર વકીલ મિત્રો
                    </p>
                    <p className="text-lg font-bold leading-tight" style={{ color: "#2c3e50" }}>
                      આપ સઘના સાથે, સહકાર અને આશીર્વાદથી
                    </p>
                  </div>

                  {/* Decorative Diamonds */}
                  <div className="flex gap-1 mb-3 items-center">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rotate-45 bg-orange-700"></div>
                      <div className="w-2.5 h-2.5 rotate-45 bg-orange-700"></div>
                      <div className="w-2.5 h-2.5 rotate-45 bg-orange-700"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Main Text Content */}
                  <div className="mb-3">
                    <p className="text-base leading-tight mb-1" style={{ color: "#8b4513" }}>
                      સુરત ડિસ્ટ્રીકટ બાર એસોસીએશન
                    </p>
                    <p className="text-base leading-tight mb-1" style={{ color: "#1e3a8a" }}>
                      ની આવનારા વર્ષ <span className="font-bold text-lg" style={{ color: "#8b4513" }}>૨૦૨૭</span> ની ચૂંટણીમાં હુ
                    </p>
                    <p className="text-2xl font-bold leading-tight mb-1" style={{ color: "#d97706" }}>
                      અંકુરકુમાર નરેન્દ્રકુમાર લીખામીયા
                    </p>
                    <p className="text-xl font-bold leading-tight mb-1" style={{ color: "#d97706" }}>
                      સહામંત્રી (જોઈન્ટર સેક્રેટરી)
                    </p>
                    <p className="text-base leading-tight" style={{ color: "#1e3a8a" }}>
                      ના પદ માટે ઉમેદવારી કરવા જઈ રહ્યો છું.
                    </p>
                  </div>

                  {/* Bottom Paragraph */}
                  <div className="mb-3">
                    <p className="text-sm leading-relaxed" style={{ color: "#2c3e50" }}>
                      આપ વકીલ મિત્રો આ ચૂંટણી<br />
                      પર્વમાં આપનો તથા આપના મિત્રોનો<br />
                      <span className="font-bold" style={{ color: "#d97706" }}>અમૂલ્ય અને કિંમતી મત મને આશીર્વાદ</span><br />
                      <span className="font-bold" style={{ color: "#d97706" }}>રૂપી આપી અને આપાવી જંગી બહુમતિથી</span><br />
                      વિજયી બનાવશો એવી અભ્યર્થના 🙏
                    </p>
                  </div>
                </div>

                {/* Right Side Circular Photo Frame with Orange Wave */}
                <div className="absolute right-0" style={{ top: "180px", width: "280px", height: "400px" }}>
                  {/* Orange Curved Background */}
                  <svg viewBox="0 0 280 400" preserveAspectRatio="none" style={{ position: "absolute", width: "100%", height: "100%" }}>
                    <defs>
                      <linearGradient id="rightOrangeGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#ff8c42", stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#8b4513", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path d="M100,0 Q50,50 80,100 T120,200 Q140,250 120,300 T80,400 L280,400 L280,0 Z" fill="url(#rightOrangeGradient)" />
                  </svg>

                  {/* Gray Accent Curve */}
                  <div className="absolute right-0 top-0 w-32 h-64 bg-gray-400 opacity-40" style={{
                    clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)"
                  }}></div>

                  {/* Circular Photo Frame */}
                  <div className="absolute" style={{ top: "50px", right: "40px", zIndex: 10 }}>
                    <div className="relative" style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid #8b4513",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                    }}>
                      {photo ? (
                        <img
                          src={photo}
                          alt="Supporter"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <User className="h-24 w-24 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Contact Section */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between" style={{ height: "140px" }}>
                  {/* Brown Curved Wave */}
                  <svg viewBox="0 0 540 140" preserveAspectRatio="none" style={{ position: "absolute", width: "100%", height: "100%", bottom: 0 }}>
                    <defs>
                      <linearGradient id="bottomBrownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#8b4513", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path d="M0,50 Q135,30 270,50 T540,50 L540,140 L0,140 Z" fill="url(#bottomBrownGradient)" />
                  </svg>

                  {/* Left Side - Name Box */}
                  <div className="relative z-10 ml-6 mb-4" style={{
                    background: "white",
                    padding: "12px 20px",
                    borderRadius: "30px",
                    border: "2px solid #8b4513",
                    maxWidth: "280px"
                  }}>
                    <p className="text-xs mb-1" style={{ color: "#d97706" }}>આપનો હિતેચ્છુ 🙏</p>
                    <p className="text-lg font-bold leading-tight" style={{ color: "#8b4513" }}>
                      {name || "અંકુરકુમાર નરેન્દ્રકુમાર લીખામીયા"}
                    </p>
                    <p className="text-sm" style={{ color: "#6b7280" }}>(એડવોકેટ)</p>
                  </div>

                  {/* Right Side - Phone Number */}
                  <div className="relative z-10 mr-6 mb-6" style={{
                    background: "#1e3a8a",
                    padding: "12px 24px",
                    borderRadius: "30px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                  }}>
                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                      📞 97228 43086
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 text-sm text-muted-foreground">
                Preview • 1080×1350px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCardGenerator;
