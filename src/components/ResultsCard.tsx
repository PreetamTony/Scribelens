import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy, CheckCircle } from 'lucide-react';
import GlossaryTooltip from './GlossaryTooltip';
import HighlightableText from './HighlightableText';

interface ResultsCardProps {
  title: string;
  content: string;
  showCopy?: boolean;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ title, content, showCopy = true }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative p-6 md:p-8 bg-white/80 dark:bg-white-600 rounded-xl shadow-lg border border-blue-100 backdrop-blur-md transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl group">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold text-blue-800 dark:text-blue-500 tracking-tight drop-shadow-sm group-hover:text-blue-600 transition-colors">{title}</h4>
        {showCopy && (
          <CopyToClipboard text={content} onCopy={handleCopy}>
            <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </CopyToClipboard>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base">
        {/* GlossaryTooltip highlights keywords and shows definitions; HighlightableText enables user highlights */}
        <GlossaryTooltip text={undefined}>
          <HighlightableText text={content} />
        </GlossaryTooltip>
      </div>
    </div>
  );
};

export default ResultsCard;
