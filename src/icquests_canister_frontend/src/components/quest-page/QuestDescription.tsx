import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
  Copy,
} from 'lucide-react';

type QuestDescriptionProps = {
  description: string;
  status?: string;
  prerequisites?: string;
};

export const QuestDescription = ({
  description,
  status,
  prerequisites,
}: QuestDescriptionProps) => {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process content strings to handle newlines
  const processContent = (content: string) => {
    return content.replace(/\\n/g, '\n');
  };

  return (
    <div
      id="quest-description"
      className="bg-secondary rounded-xl overflow-hidden border border-white/5"
    >
      {/* Description Header */}
      <div
        className="p-5 border-b border-white/5 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-primary" />
          <h3 className="font-medium text-sm text-white">QUEST DETAILS</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
            className="p-1 rounded-md bg-dark text-white/50 hover:text-white transition-colors"
            title="Copy description"
          >
            {copied ? (
              <span className="text-xs">Copied</span>
            ) : (
              <Copy size={14} />
            )}
          </button>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {expanded && (
        <div className="p-5">
          {/* Prerequisites Section */}
          {prerequisites && (
            <div className="mb-5 p-3 bg-dark rounded-md">
              <h4 className="text-white text-xs font-medium mb-2 flex items-center gap-2">
                <span className="text-primary">●</span> Prerequisites
              </h4>
              <div
                className="text-white/70 leading-relaxed prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: processContent(prerequisites),
                }}
              />
            </div>
          )}

          {/* Main Description */}
          <div
            className="text-white/70 leading-relaxed prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: processContent(description) }}
          />

          {status === 'inactive' && (
            <div className="mt-4 p-3 bg-dark rounded-md flex items-start gap-2">
              <AlertCircle size={14} className="text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-medium text-xs">
                  Quest Inactive
                </h4>
                <p className="text-white/50 text-xs mt-1">
                  This quest is currently unavailable. Check back later.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
