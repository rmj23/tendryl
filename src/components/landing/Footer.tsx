import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-tendryl-deep border-t border-tendryl-sage/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-tendryl-amber" />
              <span className="font-display text-xl font-bold text-primary-foreground">
                Tendryl
              </span>
            </div>
            <p className="text-tendryl-sage/60 text-sm leading-relaxed">
              The all-in-one operating system for modern plant nurseries.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm tracking-wide">
              PRODUCT
            </h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-tendryl-sage/60 hover:text-tendryl-amber text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm tracking-wide">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-tendryl-sage/60 hover:text-tendryl-amber text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm tracking-wide">
              LEGAL
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-tendryl-sage/60 hover:text-tendryl-amber text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-tendryl-sage/60 hover:text-tendryl-amber text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-tendryl-sage/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-tendryl-sage/40 text-sm">
            © {new Date().getFullYear()} Tendryl. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-tendryl-sage/40 hover:text-tendryl-amber text-sm transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
