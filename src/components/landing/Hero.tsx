import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tendryl-deep">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--tendryl-sage) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--tendryl-sage) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] w-72 h-72 rounded-full bg-tendryl-forest/20 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-tendryl-amber/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tendryl-sage/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-tendryl-sage/30 bg-tendryl-forest/20 backdrop-blur-sm">
            <Leaf className="w-4 h-4 text-tendryl-amber" />
            <span className="text-sm font-medium text-tendryl-sage tracking-wide">
              ALL-IN-ONE NURSERY PLATFORM
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-primary-foreground"
        >
          The Operating System
          <br />
          <span className="text-tendryl-amber">for Modern Nurseries</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-tendryl-sage/80 leading-relaxed"
        >
          Tendryl unifies production scheduling, greenhouse controls, IoT sensors,
          team management, and WiFi-powered communications — all in one powerful platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-tendryl-amber text-tendryl-deep hover:bg-tendryl-amber/90 font-display font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-tendryl-amber/20"
          >
            Request a Demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-tendryl-sage/30 text-tendryl-sage hover:bg-tendryl-forest/30 font-display font-semibold text-base px-8 py-6 rounded-xl backdrop-blur-sm"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          >
            See Features
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-tendryl-sage/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
