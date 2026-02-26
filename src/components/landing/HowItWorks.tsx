import { motion } from "framer-motion";
import { Cable, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Cable,
    number: "01",
    title: "Connect",
    description:
      "Plug in your sensors, onboard your team, and link your greenhouses. Setup takes minutes, not months.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Manage",
    description:
      "Schedule production, monitor environments, assign tasks, and communicate — all from one unified dashboard.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Grow",
    description:
      "Watch efficiency soar. Reduce waste, hit deadlines, and scale your operation with data-driven confidence.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-tendryl-amber font-display font-semibold text-sm tracking-widest uppercase mb-3 block">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Three Steps to Smarter Growing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-tendryl-sage/30 via-tendryl-amber/40 to-tendryl-sage/30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="relative mx-auto w-20 h-20 rounded-full bg-tendryl-deep flex items-center justify-center mb-6 border-2 border-tendryl-sage/30 shadow-lg shadow-tendryl-forest/10">
                <step.icon className="w-8 h-8 text-tendryl-amber" />
                <span className="absolute -top-2 -right-2 text-xs font-display font-bold bg-tendryl-amber text-tendryl-deep w-7 h-7 rounded-full flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
