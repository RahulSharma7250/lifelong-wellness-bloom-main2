import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Phone } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import lotusSymbol from "@/assets/lotus-symbol.jpg"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Methods", href: "/methods" },
    { name: "Contact", href: "/contact" }
  ]

  const scrollToBooking = () => {
    if (location.pathname === '/') {
      const element = document.querySelector('#booking')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = '/#booking'
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={lotusSymbol} alt="Lifelong Wellness" className="w-8 h-8 rounded-full" />
            <div>
              <h1 className="font-serif font-semibold text-lg text-foreground">Lifelong Wellness</h1>
              <p className="text-xs text-muted-foreground">Dr. Megha Shaha</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary transition-colors duration-200 font-medium ${
                  location.pathname === item.href ? 'text-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="healing" size="sm" onClick={scrollToBooking}>
              <Phone className="w-4 h-4" />
              Book Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-6 border-b border-border">
                  <img src={lotusSymbol} alt="Lifelong Wellness" className="w-10 h-10 rounded-full" />
                  <div>
                    <h1 className="font-serif font-semibold text-xl text-foreground">Lifelong Wellness</h1>
                    <p className="text-sm text-muted-foreground">Dr. Megha Shaha</p>
                  </div>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-left text-lg text-foreground hover:text-primary transition-colors duration-200 py-2 block ${
                      location.pathname === item.href ? 'text-primary' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-6 border-t border-border">
                  <Button variant="healing" size="lg" className="w-full" onClick={scrollToBooking}>
                    <Phone className="w-5 h-5" />
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navigation