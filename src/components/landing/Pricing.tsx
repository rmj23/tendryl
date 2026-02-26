import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    description: "For small nurseries getting started",
    features: [
      "Up to 3 greenhouses",
      "Basic scheduling",
      "5 team members",
      "Email support",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing operations that need more",
    features: [
      "Unlimited greenhouses",
      "Advanced scheduling & analytics",
      "25 team members",
      "Sensor integration",
      "WiFi phone system",
      "Priority support",
    ],
    cta: "Contact Us",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale commercial nurseries",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-site onboarding",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-tendryl-amber font-display font-semibold text-sm tracking-widest uppercase mb-3 block">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Plans That Grow With You
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Flexible pricing for nurseries of every size. No hidden fees, no long-term contracts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all ${
                tier.highlighted
                  ? "bg-tendryl-deep border-tendryl-amber/40 shadow-2xl shadow-tendryl-amber/10 scale-[1.02]"
                  : "bg-card border-border hover:border-tendryl-sage/40"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tendryl-amber text-tendryl-deep text-xs font-display font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <h3
                className={`font-display text-2xl font-bold mb-2 ${
                  tier.highlighted ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  tier.highlighted ? "text-tendryl-sage/70" : "text-muted-foreground"
                }`}
              >
                {tier.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        tier.highlighted ? "text-tendryl-amber" : "text-tendryl-forest"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        tier.highlighted
                          ? "text-tendryl-sage/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full font-display font-semibold rounded-xl py-5 ${
                  tier.highlighted
                    ? "bg-tendryl-amber text-tendryl-deep hover:bg-tendryl-amber/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
