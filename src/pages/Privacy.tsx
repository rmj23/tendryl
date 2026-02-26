import { Link } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-tendryl-deep border-b border-tendryl-sage/10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-tendryl-amber" />
            <span className="font-display text-xl font-bold text-primary-foreground">Tendryl</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-tendryl-sage/60 hover:text-tendryl-amber text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-2 text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tendryl ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our all-in-one nursery management platform, including our website, applications, and services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We collect the following types of information:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span><strong className="text-foreground">Account Information:</strong> Name, email address, phone number, business name, and billing details provided during registration.</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span><strong className="text-foreground">Usage Data:</strong> Information about how you interact with the platform, including feature usage, scheduling activity, and dashboard interactions.</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span><strong className="text-foreground">Sensor Data:</strong> Environmental data collected from connected IoT sensors, including temperature, humidity, and soil moisture readings.</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span><strong className="text-foreground">Communication Records:</strong> Metadata related to calls and messages made through our WiFi phone system, including timestamps and duration. Message content is encrypted and not accessed by Tendryl.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Provide, maintain, and improve the Tendryl platform and its features</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Process and manage your account, subscriptions, and billing</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Deliver customer support and respond to your inquiries</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Analyze usage patterns to improve our services and develop new features</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Ensure the security and integrity of our platform</span></li>
            </ul>
          </section>

          <section className="bg-tendryl-forest/5 border border-tendryl-sage/20 rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">4. Data Sharing — Our Commitment</h2>
            <p className="text-foreground leading-relaxed font-medium">
              Tendryl will NOT share, sell, rent, or distribute your personal information, business data, sensor data, or communication records to any third parties for any purpose. Your data will NOT be used for marketing purposes, advertising, or any form of commercial exploitation by external entities.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your data is used solely to operate and improve the Tendryl platform for your benefit. We do not engage in data brokering or third-party advertising.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption at rest and in transit, regular security audits, access controls, and secure data centers. While no system is 100% secure, we are committed to protecting your information using best-in-class practices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide you with our services. If you close your account, we will delete or anonymize your data within 90 days, unless retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Access the personal data we hold about you</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Request correction of inaccurate data</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Request deletion of your data</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Export your data in a portable format</span></li>
              <li className="flex gap-2"><span className="text-tendryl-amber font-bold">•</span><span>Withdraw consent at any time</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
            </p>
            <div className="mt-4 p-4 bg-card rounded-xl border border-border">
              <p className="text-foreground font-medium">Tendryl Privacy Team</p>
              <p className="text-muted-foreground text-sm">Email: privacy@tendryl.com</p>
              <p className="text-muted-foreground text-sm">Phone: (555) 123-4567</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
