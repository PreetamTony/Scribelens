import React from 'react';
import { Brain, Languages, DivideIcon as LucideIcon, MessageCircle, Pencil, Save, Search, Share2 } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, accentColor }) => {
  return (
    <div className="flex p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md">
      <div className={`mr-4 p-3 rounded-lg ${accentColor} self-start`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: "AI Comprehension",
      description: "Our AI understands complex academic content from various subjects and makes it accessible.",
      accentColor: "bg-blue-100"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
      title: "Interactive Q&A",
      description: "Ask follow-up questions about the content to deepen your understanding.",
      accentColor: "bg-purple-100"
    },
    {
      icon: <Languages className="h-6 w-6 text-emerald-600" />,
      title: "Multi-language Support",
      description: "Works with content in multiple languages and can provide explanations in your preferred language.",
      accentColor: "bg-emerald-100"
    },
    {
      icon: <Pencil className="h-6 w-6 text-amber-600" />,
      title: "Handwriting Recognition",
      description: "Advanced OCR technology that can recognize even messy handwriting on whiteboards and notes.",
      accentColor: "bg-amber-100"
    },
    {
      icon: <Save className="h-6 w-6 text-rose-600" />,
      title: "Save & Review",
      description: "Save your processed notes for later review and continued learning.",
      accentColor: "bg-rose-100"
    },
    {
      icon: <Search className="h-6 w-6 text-indigo-600" />,
      title: "Knowledge Enhancement",
      description: "Automatically adds relevant context, examples, and references to enrich your notes.",
      accentColor: "bg-indigo-100"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ScribeLens combines advanced AI capabilities to transform how you capture and understand classroom content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;