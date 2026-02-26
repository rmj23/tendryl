import { Link } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

const Terms = () => {
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
        <h1 className="font-display text-4xl font-bold mb-2 text-foreground">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">1. Program Information</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Program Name:</strong> Tendryl
              </p>
              <p>
                <strong className="text-foreground">Program Description:</strong> Tendryl is an all-in-one nursery management platform designed for plant nurseries and horticultural businesses. The platform provides production scheduling, greenhouse environment management, IoT sensor integration, employee management, and a WiFi-based communication system that enables phone calls and text messaging directly over WiFi — no SIM card required.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">2. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the Tendryl platform, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use the platform. These terms constitute a legally binding agreement between you and Tendryl.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">3. Account Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate and complete information during registration and keep your account information up to date.
            </p>
          </section>

          <section className="bg-tendryl-forest/5 border border-tendryl-sage/20 rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">4. Messaging & Communication Terms</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Message & Data Rates:</strong> Standard message and data rates may apply when using the Tendryl platform, depending on your internet service provider and mobile carrier. Tendryl's WiFi phone system operates over WiFi and does not require a SIM card; however, data charges from your internet provider may still apply.
              </p>
              <p>
                <strong className="text-foreground">Message Frequency:</strong> The frequency of messages you receive from Tendryl varies based on your account activity, notification settings, team communications, and system alerts. You can manage your notification preferences at any time through your account settings.
              </p>
              <p>
                <strong className="text-foreground">Support Contact:</strong> For questions, technical support, or account assistance, you can reach us at:
              </p>
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="text-foreground font-medium">Tendryl Support</p>
                <p className="text-muted-foreground text-sm">Email: support@tendryl.com</p>
                <p className="text-muted-foreground text-sm">Phone: (555) 123-4567</p>
              </div>
              <div className="mt-4 p-4 bg-tendryl-amber/5 border border-tendryl-amber/20 rounded-xl">
                <p className="text-foreground font-medium mb-2">Opt-Out Instructions:</p>
                <p className="text-muted-foreground">
                  To opt out of receiving text messages from Tendryl, reply <strong className="text-foreground text-lg">STOP</strong> to any message. You will receive a confirmation and no further messages will be sent. To resume messages, text START.
                </p>
                <p className="text-muted-foreground mt-2">
                  For help or assistance at any time, reply <strong className="text-foreground text-lg">HELP</strong> to any message, or contact our support team at the information listed above.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">5. Use of Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use the Tendryl platform only for lawful purposes and in accordance with these terms. You must not use the platform to transmit harmful, abusive, or illegal content, attempt to gain unauthorized access to systems, or interfere with the platform's functionality or security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Tendryl platform, including its design, code, features, and content, is the intellectual property of Tendryl. You are granted a limited, non-exclusive, non-transferable license to use the platform in accordance with your subscription. You may not copy, modify, distribute, or reverse-engineer any part of the platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Tendryl shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the platform. Our total liability shall not exceed the amount you paid for the service in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your access to the platform at any time if you violate these terms. You may cancel your account at any time through your account settings. Upon termination, your right to use the platform ceases immediately, and your data will be handled in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update these Terms & Conditions at any time. We will notify you of material changes via email or through the platform. Continued use of the platform after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any questions regarding these Terms & Conditions, please contact us:
            </p>
            <div className="mt-4 p-4 bg-card rounded-xl border border-border">
              <p className="text-foreground font-medium">Tendryl Legal Team</p>
              <p className="text-muted-foreground text-sm">Email: legal@tendryl.com</p>
              <p className="text-muted-foreground text-sm">Phone: (555) 123-4567</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
