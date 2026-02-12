import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import { Menu, X } from 'lucide-react'
const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
]

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }  z-50`}>
      <nav className='container mx-auto px-6 flex items-center justify-between'>
        <a href='#' className='text-2xl font-bold tracking-tight hover:text-primary'>
          SN<span>.</span>
        </a>
        <div className='hidden md:flex items-center gap-1'>
          <div className='glass rounded-full px-2 py-1 flex items-center gap-1'>
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className='px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface'>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className='hidden md:block'>
          <Button size="sm" href="#contact">
            Contact Me
          </Button>
        </div>

        <button className='md:hidden p-2 text-foreground' onClick={() => setMobileMenuOpen((prev) => !prev)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className='md:hidden glass-strong animate-fade-in'>
          <div className='container mx-auto px-6 py-6 flex flex-col gap-4 '>{navLinks.map((link, index) => (
            <a key={index} href={link.href} className='text-lg text-muted-foreground hover:text-foreground py-2' onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
            <Button onClick={() => setMobileMenuOpen(false)} href="#contact">Contact Me</Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
