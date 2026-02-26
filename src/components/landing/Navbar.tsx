import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tendryl-deep/80 backdrop-blur-xl border-b border-tendryl-sage/10">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-tendryl-amber" />
          <span className="font-display text-xl font-bold text-primary-foreground">
            Tendryl
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-tendryl-sage/70 hover:text-primary-foreground text-sm transition-colors"
          >
            Features
          </a>
          <a
            href="#"
            className="text-tendryl-sage/70 hover:text-primary-foreground text-sm transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-tendryl-sage/70 hover:text-primary-foreground text-sm transition-colors"
          >
            About
          </a>
          <Button
            size="sm"
            className="bg-tendryl-amber text-tendryl-deep hover:bg-tendryl-amber/90 font-display font-semibold rounded-lg"
          >
            Request Demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-tendryl-deep/95 backdrop-blur-xl border-b border-tendryl-sage/10 px-6 py-6 space-y-4">
          <a
            href="#features"
            className="block text-tendryl-sage/70 hover:text-primary-foreground text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </a>
          <a href="#" className="block text-tendryl-sage/70 hover:text-primary-foreground text-sm">
            Pricing
          </a>
          <a href="#" className="block text-tendryl-sage/70 hover:text-primary-foreground text-sm">
            About
          </a>
          <Button
            size="sm"
            className="w-full bg-tendryl-amber text-tendryl-deep hover:bg-tendryl-amber/90 font-display font-semibold rounded-lg"
          >
            Request Demo
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
