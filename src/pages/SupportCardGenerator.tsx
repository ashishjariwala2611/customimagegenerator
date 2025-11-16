import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Upload, User } from "lucide-react";
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
                className="shadow-2xl"
                style={{
                  width: "540px",
                  height: "675px",
                  position: "relative",
                  background: "linear-gradient(135deg, #e8e0f5 0%, #f5f0ff 50%, #e8e0f5 100%)",
                }}
              >
                {/* Top Header */}
                <div className="absolute top-0 left-0 right-0 px-6 py-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-campaign-blue font-bold text-2xl leading-tight" style={{ fontFamily: "serif" }}>
                      સુરત જિલ્લા વકીલ મંડળ
                    </h1>
                  </div>
                  <div className="w-16 h-16 flex-shrink-0">
                    <div className="w-full h-full rounded-full border-4 border-campaign-blue flex items-center justify-center text-xs text-center bg-white">
                      <span className="text-campaign-blue font-bold">SEAL</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Section */}
                <div className="absolute top-24 left-0 right-0 px-6">
                  <div className="flex gap-4 mb-4">
                    {/* Large Candidate Photo - LEFT SIDE */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-40 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                        <User className="h-20 w-20 text-white opacity-50" />
                      </div>
                    </div>
                    
                    {/* Candidate Name */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="font-bold text-4xl mb-1" style={{
                        color: "#d32f2f",
                        textShadow: "2px 2px 0px #ff6b6b, 3px 3px 0px #ff8787",
                        lineHeight: "1.2"
                      }}>
                        ઉદય એચ. પટેલ
                      </h2>
                      <p className="text-campaign-red text-xl font-semibold">(એડવોકેટ)</p>
                      <p className="text-gray-700 text-sm mt-1">મો.નં.: ૯૮૨૫૪૬૦૯૧</p>
                    </div>
                  </div>

                  {/* Gujarati Description Text */}
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border-2 border-campaign-blue/20 mb-4">
                    <p className="text-xs leading-relaxed text-gray-800" style={{ fontFamily: "serif" }}>
                      હું આપને મારા પરિચિત અને વહીલાતના ક્ષેત્રે તેમજ અન્ય રીતે ખુબ જ સેવા ભાવી અને અનુભવી તથા વકીલોના હિતમાં હમેશા અગ્રેસર રહેતા "ઉદય એચ. પટેલ" (એડવોકેટ)ને "પ્રમુખ" તરીકે ચૂંટવા આપનો તથા આપના પરિવાર સાથી વકીલ મિત્રોની મત આપી અખાલી વિજયશી બનાવી વકીલ મંડળની સેવા કરવાની તક આપવા વિનંતી કરું છું.
                    </p>
                  </div>

                  {/* I Support Section with border */}
                  <div className="border-t-4 border-b-4 border-campaign-blue py-4 mb-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-campaign-red font-bold text-2xl mb-1" style={{ fontFamily: "serif" }}>
                          I Support
                        </h3>
                        <h2 className="font-bold text-3xl" style={{
                          color: "#d32f2f",
                          textShadow: "2px 2px 0px #ff6b6b, 3px 3px 0px #ff8787",
                          lineHeight: "1.1"
                        }}>
                          Uday H. Patel
                        </h2>
                      </div>

                      {/* Supporter Photo - RIGHT SIDE */}
                      <div className="flex-shrink-0">
                        {photo ? (
                          <div className="relative">
                            <img
                              src={photo}
                              alt="Supporter"
                              className="w-28 h-32 object-cover rounded-lg border-3 border-gray-300 shadow-lg"
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-32 bg-gray-200 rounded-lg border-3 border-dashed border-gray-400 flex items-center justify-center">
                            <User className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Supporter Name */}
                    <div className="mt-2 text-right">
                      <div className="inline-block bg-white px-4 py-1 rounded-full border border-campaign-red">
                        <p className="text-campaign-red font-bold text-base">
                          {name || "Your Name"}
                        </p>
                      </div>
                      <p className="text-gray-700 text-sm mt-1">Advocate</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-campaign-blue text-white py-4 px-6 text-center border-t-4 border-campaign-blue">
                  <div className="font-bold text-xl tracking-wide" style={{ fontFamily: "serif" }}>
                    મતદાન તારીખ : {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-")}
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
