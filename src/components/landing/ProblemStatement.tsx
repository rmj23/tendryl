import { motion } from "framer-motion";
import { AlertTriangle, Clock, Wifi } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Disconnected Tools",
    description:
      "Juggling spreadsheets, paper logs, and separate apps for every part of your operation wastes time and creates costly blind spots.",
  },
  {
    icon: Clock,
    title: "Manual Scheduling",
    description:
      "Planning crop cycles and employee shifts by hand leads to missed deadlines, overstaffing, and crops left unattended.",
  },
  {
    icon: Wifi,
    title: "Unreliable Communication",
    description:
      "Cell service in rural areas and large greenhouse complexes is spotty. Your team needs a better way to stay connected.",
  },
];

const ProblemStatement = () => {
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
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Nurseries Deserve Better Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The horticulture industry runs on outdated systems. It&apos;s time for a change.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-tendryl-sage/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-tendryl-amber/10 flex items-center justify-center mb-5 group-hover:bg-tendryl-amber/20 transition-colors">
                <problem.icon className="w-6 h-6 text-tendryl-amber" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
