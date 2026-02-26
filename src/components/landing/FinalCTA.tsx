import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Leaf } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-tendryl-forest/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Leaf className="w-10 h-10 text-tendryl-amber mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Ready to Modernize Your Nursery?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Request a demo and see how Tendryl can transform your operation.
          </p>

          <form
            className="space-y-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              placeholder="Your name"
              className="rounded-xl py-5 bg-card border-border focus:border-tendryl-sage"
            />
            <Input
              type="email"
              placeholder="Email address"
              className="rounded-xl py-5 bg-card border-border focus:border-tendryl-sage"
            />
            <Input
              placeholder="Nursery name"
              className="rounded-xl py-5 bg-card border-border focus:border-tendryl-sage"
            />
            <Textarea
              placeholder="Tell us about your operation (optional)"
              className="rounded-xl bg-card border-border focus:border-tendryl-sage resize-none"
              rows={3}
            />
            <Button
              type="submit"
              className="w-full bg-tendryl-amber text-tendryl-deep hover:bg-tendryl-amber/90 font-display font-semibold text-base py-6 rounded-xl shadow-lg shadow-tendryl-amber/20"
            >
              Request a Demo
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            No commitment required. We&apos;ll reach out within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
