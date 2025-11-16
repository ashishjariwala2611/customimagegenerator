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
                className="bg-white shadow-2xl"
                style={{
                  width: "540px",
                  height: "675px",
                  position: "relative",
                }}
              >
                {/* Header with Logo */}
                <div className="absolute top-0 left-0 right-0 bg-campaign-blue text-white p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-campaign-blue font-bold text-xl">★</span>
                    </div>
                    <div>
                      <div className="font-bold text-lg">DISTRICT</div>
                      <div className="text-sm opacity-90">BAR ASSOCIATION</div>
                    </div>
                  </div>
                  <div className="w-12 h-12 border-2 border-white rounded-full"></div>
                </div>

                {/* Main Content Area */}
                <div className="absolute top-28 left-0 right-0 bottom-20 px-8">
                  {/* I Support Section */}
                  <div className="text-center mb-8">
                    <div
                      className="inline-block px-8 py-3 rounded-lg mb-3"
                      style={{ backgroundColor: "#f0f4f8" }}
                    >
                      <h2 className="text-campaign-red font-bold text-4xl tracking-wide">
                        I Support
                      </h2>
                    </div>
                  </div>

                  {/* Name and Photo Section */}
                  <div className="flex items-center justify-between gap-6 mb-8">
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-campaign-red to-red-600 text-white px-6 py-4 rounded-lg shadow-lg">
                        <h3 className="font-bold text-3xl leading-tight break-words">
                          {name || "Your Name Here"}
                        </h3>
                      </div>
                      <div
                        className="mt-2 px-6 py-2 rounded-lg inline-block"
                        style={{ backgroundColor: "#fff4e6" }}
                      >
                        <span className="text-campaign-red font-semibold text-lg">
                          (Advocate)
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {photo ? (
                        <div className="relative">
                          <img
                            src={photo}
                            alt="Supporter"
                            className="w-40 h-40 object-cover rounded-2xl border-4 border-primary shadow-xl"
                          />
                        </div>
                      ) : (
                        <div className="w-40 h-40 bg-muted rounded-2xl border-4 border-dashed border-border flex items-center justify-center">
                          <User className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description Text */}
                  <div className="bg-campaign-light p-4 rounded-lg text-sm text-foreground leading-relaxed">
                    <p className="text-center">
                      I hereby extend my support and best wishes to the candidate
                      for their dedication to serving the legal community and
                      upholding justice.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-campaign-blue text-white p-6 text-center">
                  <div className="font-bold text-2xl tracking-wider">
                    ELECTION DATE: {new Date().toLocaleDateString("en-GB").replace(/\//g, "-")}
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
