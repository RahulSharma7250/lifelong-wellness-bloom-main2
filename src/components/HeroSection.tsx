import { Button } from "@/components/ui/button"
import { Heart, Phone, ArrowRight } from "lucide-react"
import heroImage from "@/assets/hero-wellness.jpg"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Wellness and healing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-4 py-2 rounded-full mb-6 animate-fade-in-up">
            <Heart className="w-4 h-4 text-secondary-accent" />
            <span className="text-sm font-medium">Transform Your Health Naturally</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="text-foreground">Heal from the</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Root</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up max-w-3xl mx-auto leading-relaxed">
            Live pain-free, energetic, and medicine-free — naturally. 
            <span className="text-primary font-medium"> Dr. Megha Shaha</span> helps women reverse chronic diseases through holistic healing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
            <Button variant="healing" size="xl" className="animate-glow">
              <Phone className="w-5 h-5" />
              Book Free Consultation
            </Button>
            <Button variant="nature" size="xl">
              Join the Community
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1,00,000+</div>
              <div className="text-sm text-muted-foreground">Women to be Educated</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary-accent">100%</div>
              <div className="text-sm text-muted-foreground">Medicine-Free Approach</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-warm">24x7</div>
              <div className="text-sm text-muted-foreground">WhatsApp Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-lotus rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-nature rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  )
}

export default HeroSection