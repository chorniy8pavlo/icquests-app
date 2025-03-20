import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

type BreadcrumbsProps = {
  paths: {
    label: string;
    href?: string;
  }[];
  backUrl?: string;
};

export const Breadcrumbs = ({ paths, backUrl }: BreadcrumbsProps) => {
  return (
    <div className="mb-5">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center flex-wrap gap-1 mb-3 text-xs text-white/40">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={12} />}
            {path.href ? (
              <Link
                href={path.href}
                className="hover:text-primary transition-colors"
              >
                {path.label}
              </Link>
            ) : (
              <span className="text-white/70">{path.label}</span>
            )}
          </div>
        ))}
      </div>

      {backUrl && (
        <Link
          href={backUrl}
          className="flex items-center gap-1.5 text-white/60 hover:text-primary text-xs transition-colors"
        >
          <ArrowLeft size={12} />
          <span>Back to all quests</span>
        </Link>
      )}
    </div>
  );
};
