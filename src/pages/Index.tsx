import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Image, Download, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-campaign-light via-background to-campaign-blue/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl text-primary-foreground">★</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Campaign Support Card Generator
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Create professional campaign support cards in seconds. Perfect for political campaigns, 
            advocacy groups, and community support initiatives.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/generator")}
            className="h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Personalized Cards</h3>
            <p className="text-muted-foreground text-sm">
              Add your name and photo to create unique support cards
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2">High Quality Export</h3>
            <p className="text-muted-foreground text-sm">
              Download as 1080×1350 PNG perfect for social media sharing
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-campaign-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-campaign-blue" />
            </div>
            <h3 className="font-bold text-lg mb-2">Instant Download</h3>
            <p className="text-muted-foreground text-sm">
              Generate and download your card instantly, no signup required
            </p>
          </Card>
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">How It Works</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Enter Your Name</h4>
                <p className="text-muted-foreground text-sm">
                  Type in the name you want to appear on the support card
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Upload Your Photo</h4>
                <p className="text-muted-foreground text-sm">
                  Upload a clear photo that will appear on your card
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Download Your Card</h4>
                <p className="text-muted-foreground text-sm">
                  Click download to save your professional support card as PNG
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => navigate("/generator")}
              className="h-12 px-8"
            >
              Create Your Card Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
