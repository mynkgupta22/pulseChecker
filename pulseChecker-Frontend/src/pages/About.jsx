import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Users, Target, Heart } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      description:
        "Passionate about improving team collaboration and productivity.",
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      description:
        "Expert in building scalable and user-friendly applications.",
    },
    {
      name: "Mike Johnson",
      role: "Product Designer",
      description:
        "Focused on creating intuitive and beautiful user experiences.",
    },
  ];

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Our Mission",
      description:
        "To empower teams with the tools and insights they need to work better together.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Our Vision",
      description:
        "A world where every team can reach its full potential through better collaboration.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Our Values",
      description:
        "We believe in transparency, collaboration, and continuous improvement.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-8" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* About Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About PulseCheck
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            We're on a mission to transform how teams work together by providing
            real-time insights into team health and collaboration.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-indigo-600">{value.icon}</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {value.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Meet the passionate individuals behind PulseCheck.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-indigo-600">{member.role}</p>
              <p className="mt-2 text-base text-gray-500">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to join us?
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Start using PulseCheck today and transform how your team works
            together.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
