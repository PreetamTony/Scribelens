import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, avatar, rating }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">{content}</p>
      <div className="flex items-center">
        <img
          src={avatar}
          alt={author}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "ScribeLens has completely transformed how I take notes in my physics lectures. Thanks to Preetam Tony J for this wonderful application.",
      author: "Shah Rukh Khan",
      role: "Engineering Student",
      avatar: "https://i.pinimg.com/474x/bc/38/4c/bc384c0d110b73f20946b91ce3fb1523.jpg",
      rating: 5
    },
    {
      content: "As a student with dyslexia, classroom notes have always been challenging. ScribeLens helps me organize information in a way that works for my brain.",
      author: "Samantha",
      role: "Biology Student",
      avatar: "https://i.pinimg.com/474x/d0/30/28/d030283fca4b297a01969e284d657bb3.jpg",
      rating: 5
    },
    {
      content: "I use ScribeLens to process notes from my organic chemistry class. Being able to ask follow-up questions about complex concepts is a game-changer.",
      author: "Vijay",
      role: "Chemistry Student",
      avatar: "https://i.pinimg.com/474x/eb/53/d5/eb53d500375467c65a8f31a22a0e067c.jpg",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover how ScribeLens is helping students succeed in their academic journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;