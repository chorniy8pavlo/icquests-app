import { Clock, Tag } from 'lucide-react';

type QuestHeaderProps = {
  title: string;
  subtitle: string;
  // Add optional metadata for enhanced display
  dateCreated?: string;
  estimatedTime?: string;
  categories?: string[];
};

export const QuestHeader = ({
  title,
  subtitle,
  estimatedTime,
  categories = [],
}: QuestHeaderProps) => {
  return (
    <div className="bg-secondary rounded-xl p-6 mb-6 border border-white/5">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded"
            >
              <Tag size={10} />
              {category}
            </span>
          ))}
        </div>
      )}

      <h1 className="font-semibold text-2xl text-white leading-tight">
        {title}
      </h1>
      <p className="text-white/60 text-base mt-2 mb-4 leading-relaxed">
        {subtitle}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/40">
        {estimatedTime && (
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>Est. Time: {estimatedTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};
