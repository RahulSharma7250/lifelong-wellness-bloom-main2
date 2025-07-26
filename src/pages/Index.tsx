import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import MethodSection from "@/components/MethodSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import BookingForm from "@/components/BookingForm"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Award, Heart, CheckCircle, Calendar, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const Index = () => {
  const { toast } = useToast()
  const [isFlipped, setIsFlipped] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Consultation Request Sent!",
      description: "We'll contact you within 24 hours to schedule your discounted consultation.",
    })
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsFlipped(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        {/* Brief About Section */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - About Dr. Megha */}
                <div className="text-center lg:text-left">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                    Meet <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Dr. Megha Shaha</span>
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    A dedicated healer with over 10 years of experience in holistic medicine, 
                    helping women achieve optimal health through natural, evidence-based treatments.
                  </p>
                  <Link to="/about">
                    <Button variant="nature" size="lg">
                      Learn More About Dr. Megha
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Right Side - Consultation Offer Card with Flip */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-md h-[28rem] perspective-1000">
                    <div 
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front Side - Offer */}
                      <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 border-2 border-primary/20 shadow-glow">
                        <CardContent className="p-6 h-full flex flex-col justify-between">
                          <div>
                            <div className="text-center mb-4">
                              <div className="inline-block bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-lg font-bold mb-2">
                                50% OFF
                              </div>
                              <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                                First Health Consultation!
                              </h3>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              <p className="text-center text-muted-foreground mb-4">
                                In this consultation, you will get:
                              </p>
                              {[
                                "Root Cause Diagnosis",
                                "Blood Report Analysis", 
                                "Weight Check",
                                "Body Measurements",
                                "Diet & Exercise Guidance",
                                "Ideal Body Weight (IBW) Advice",
                                "Healthy Lifestyle Recommendations"
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-sm text-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                              Take the first step towards a healthier you!
                            </p>
                            </div>
                            <div className="mt-6">
                            <Button 
                              variant="healing" 
                              size="lg" 
                              className="w-full"
                              onClick={() => setIsFlipped(true)}
                            >
                              <Calendar className="w-4 h-4" />
                              Book Consultation
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Back Side - Booking Form */}
                      <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-background border-2 border-primary/20 shadow-glow">
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif text-xl font-bold text-primary">
                              Book Your Consultation
                            </h3>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setIsFlipped(false)}
                            >
                              ← Back
                            </Button>
                          </div>
                          
                          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="name" className="text-sm">Full Name *</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  type="text"
                                  required
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="mt-1"
                                  placeholder="Enter your full name"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="email" className="text-sm">Email *</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="mt-1"
                                  placeholder="your.email@example.com"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="phone" className="text-sm">Phone *</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  required
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="mt-1"
                                  placeholder="+91 98765 43210"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="message" className="text-sm">Health Concerns</Label>
                                <Textarea
                                  id="message"
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  className="mt-1"
                                  rows={3}
                                  placeholder="Brief description of your health goals..."
                                />
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <Button type="submit" variant="healing" size="lg" className="w-full">
                                <Phone className="w-4 h-4" />
                                Get 50% OFF Consultation
                              </Button>
                              <p className="text-xs text-muted-foreground text-center mt-2">
                                We'll contact you within 24 hours
                              </p>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Unique Approach */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Unique Approach</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We don't just treat symptoms - we address the root causes of illness 
                  through a comprehensive, personalized approach to healing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6 text-center hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-3">Personalized Care</h3>
                    <p className="text-muted-foreground">
                      Every treatment plan is uniquely designed based on your individual 
                      constitution, health history, and specific needs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6 text-center hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Award className="w-12 h-12 text-secondary-accent mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-3">Evidence-Based</h3>
                    <p className="text-muted-foreground">
                      Our methods combine ancient wisdom with modern science, 
                      backed by research and proven results.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6 text-center hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Heart className="w-12 h-12 text-accent-warm mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-3">Holistic Healing</h3>
                    <p className="text-muted-foreground">
                      We treat the whole person - mind, body, and spirit - 
                      for lasting transformation and optimal wellness.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Explore Our Services
                </h2>
                <p className="text-muted-foreground">
                  Discover how we can help you achieve lasting wellness
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <h3 className="font-serif text-2xl font-semibold mb-4">About Dr. Megha</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Learn about Dr. Megha's journey, education, and passion for holistic healing. 
                      Discover why thousands of women trust her with their health.
                    </p>
                    <Link to="/about">
                      <Button variant="outline">
                        Read Full Story
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <h3 className="font-serif text-2xl font-semibold mb-4">Methods & Techniques</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Explore our comprehensive range of natural healing methods including 
                      Ayurveda, mindfulness, nutrition, and lifestyle medicine.
                    </p>
                    <Link to="/methods">
                      <Button variant="outline">
                        Explore Methods
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <BookingForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;