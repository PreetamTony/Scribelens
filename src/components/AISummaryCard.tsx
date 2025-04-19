import React from 'react';
import { BookOpen, Lightbulb, Sparkles, Link2 } from 'lucide-react';

interface AISummaryCardProps {
  summary: string;
  example?: string;
  suggestions?: string[];
  books?: { title: string; url: string }[];
  links?: { title: string; url: string }[];
}

const AISummaryCard: React.FC<AISummaryCardProps> = ({ summary, example, suggestions, books, links }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-blue-700 text-xl font-bold">
        <Sparkles className="w-6 h-6 text-yellow-400" />
        <span>AI Summary</span>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 text-gray-800 prose prose-blue max-w-none">
        <div>{summary}</div>
      </div>
      {example && (
        <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-green-500 mt-1" />
          <div>
            <div className="font-semibold text-green-700 mb-1">Fun Example</div>
            <div>{example}</div>
          </div>
        </div>
      )}
      {suggestions && suggestions.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="font-semibold text-yellow-700 mb-1">Suggestions to Explore</div>
          <ul className="list-disc pl-5 space-y-1">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {books && books.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 font-semibold text-purple-700 mb-1">
            <BookOpen className="w-5 h-5" /> Related Books
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {books.map((b, i) => (
              <li key={i}><a href={b.url} target="_blank" rel="noopener noreferrer" className="text-purple-700 underline hover:text-purple-900">{b.title}</a></li>
            ))}
          </ul>
        </div>
      )}
      {links && links.length > 0 && (
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-2 font-semibold text-blue-700 mb-1">
            <Link2 className="w-5 h-5" /> Related Links
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {links.map((l, i) => (
              <li key={i}><a href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">{l.title}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AISummaryCard;
