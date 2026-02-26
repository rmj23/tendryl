import { motion } from "framer-motion";
import {
  CalendarDays,
  Thermometer,
  Radio,
  Users,
  Phone,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Production Scheduling",
    description:
      "Plan crops, track growth cycles, and manage timelines with intelligent scheduling that adapts to your nursery's rhythm.",
    color: "bg-tendryl-forest/10 text-tendryl-forest",
  },
  {
    icon: Thermometer,
    title: "Greenhouse Management",
    description:
      "Monitor and control environments across all your facilities — temperature, ventilation, irrigation — from one screen.",
    color: "bg-tendryl-amber/10 text-tendryl-amber",
  },
  {
    icon: Radio,
    title: "Sensor Integration",
    description:
      "Real-time IoT data streams from temperature, humidity, and soil sensors feed directly into your dashboard and alerts.",
    color: "bg-tendryl-sage/20 text-tendryl-forest",
  },
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Handle scheduling, role assignments, task tracking, and team communication — no more spreadsheet chaos.",
    color: "bg-tendryl-earth/10 text-tendryl-earth",
  },
  {
    icon: Phone,
    title: "WiFi Phone System",
    description:
      "Make calls and send texts over WiFi — no SIM cards needed. Keep your team connected even in dead zones.",
    color: "bg-tendryl-amber/10 text-tendryl-amber",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description:
      "Everything in one place. Production data, sensor readings, schedules, and communications — at a glance.",
    color: "bg-tendryl-forest/10 text-tendryl-forest",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-tendryl-amber font-display font-semibold text-sm tracking-widest uppercase mb-3 block">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Everything Your Nursery Needs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Six powerful modules, one seamless platform. Tendryl replaces your
            entire tech stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:shadow-tendryl-forest/5 hover:border-tendryl-sage/40 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
