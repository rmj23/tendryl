import { motion } from "framer-motion";

const stats = [
  { value: "50%", label: "Less Downtime" },
  { value: "3x", label: "Faster Scheduling" },
  { value: "99.9%", label: "Uptime" },
  { value: "200+", label: "Sensor Integrations" },
];

const testimonials = [
  {
    quote:
      "Tendryl transformed how we run our 12-greenhouse operation. What used to take hours of coordination now happens automatically.",
    author: "Maria Chen",
    role: "Operations Director, Greenleaf Gardens",
  },
  {
    quote:
      "The WiFi phone system alone saved us thousands. No more dropped calls in the back lots. Our team actually stays connected now.",
    author: "James Hollowell",
    role: "Owner, Hollowell & Sons Nursery",
  },
  {
    quote:
      "We replaced five different tools with Tendryl. The unified dashboard gives me visibility I never had before.",
    author: "Ayesha Patel",
    role: "Head Grower, Valley Bloom Farms",
  },
];

const SocialProof = () => {
  return (
    <section className="py-24 bg-tendryl-deep">
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-tendryl-amber mb-2">
                {stat.value}
              </div>
              <div className="text-tendryl-sage/70 text-sm font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-tendryl-amber font-display font-semibold text-sm tracking-widest uppercase mb-3 block">
            Trusted by Growers
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
            What Our Users Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-2xl bg-tendryl-forest/20 border border-tendryl-sage/20 backdrop-blur-sm"
            >
              <p className="text-tendryl-sage/90 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-display font-semibold text-primary-foreground">
                  {testimonial.author}
                </div>
                <div className="text-tendryl-sage/60 text-sm">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
