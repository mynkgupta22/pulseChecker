import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Users,
  MessageSquare,
  FileText,
  Shield,
  Zap,
} from "lucide-react";
import LandingNavbar from "../components/layout/LandingNavbar";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-600/5 to-background -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              About Pulse Checker
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to revolutionize team collaboration and make
              work more efficient, enjoyable, and productive.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Pulse Checker, we believe that great teams deserve great
                tools. Our platform is designed to bring people together,
                streamline communication, and make collaboration effortless.
              </p>
              <p className="text-lg text-muted-foreground">
                We're committed to creating a workspace that not only meets your
                needs but exceeds your expectations, helping you and your team
                achieve more together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-card border border-purple-200/50">
                <Shield className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-purple-200/50">
                <Zap className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Built for speed and performance
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-purple-200/50">
                <Users className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Team Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Designed for teams of all sizes
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-purple-200/50">
                <MessageSquare className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Seamless Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time communication made easy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-card border border-purple-200/50 hover:border-purple-600/50 transition-colors">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly push boundaries to deliver cutting-edge solutions
                that transform how teams work together.
              </p>
            </div>
            <div className="p-8 rounded-lg bg-card border border-purple-200/50 hover:border-purple-600/50 transition-colors">
              <h3 className="text-xl font-semibold mb-4">Simplicity</h3>
              <p className="text-muted-foreground">
                We believe in making complex things simple, ensuring our
                platform is intuitive and easy to use.
              </p>
            </div>
            <div className="p-8 rounded-lg bg-card border border-purple-200/50 hover:border-purple-600/50 transition-colors">
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-muted-foreground">
                We're building more than a product - we're creating a community
                of teams that thrive together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Be part of the future of team collaboration
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
