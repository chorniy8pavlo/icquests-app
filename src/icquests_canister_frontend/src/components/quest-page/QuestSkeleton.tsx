import React from 'react';

export const QuestSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen py-10 bg-dark">
      <div className="px-3 max-w-[1392px] mx-auto">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-16 bg-white/10 rounded" />
          <div className="h-4 w-4 bg-white/10 rounded" />
          <div className="h-4 w-24 bg-white/10 rounded" />
          <div className="h-4 w-4 bg-white/10 rounded" />
          <div className="h-4 w-32 bg-white/10 rounded" />
        </div>

        {/* Back button skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-4 bg-white/10 rounded-full" />
          <div className="h-4 w-32 bg-white/10 rounded" />
        </div>

        {/* Campaign Banner skeleton */}
        <div className="p-6 rounded-xl bg-secondary border border-white/5">
          <div className="flex flex-col md:flex-row md:items-center md:gap-10">
            <div className="flex gap-4 items-center">
              {/* Campaign logo skeleton */}
              <div className="w-20 h-20 bg-dark rounded-xl" />
              <div>
                {/* Campaign title skeleton */}
                <div className="h-6 w-48 bg-white/10 rounded mb-2" />
                {/* View campaign link skeleton */}
                <div className="h-4 w-32 bg-primary/20 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Quest Header skeleton */}
            <div className="bg-secondary rounded-xl p-6 border border-white/5">
              {/* Categories skeleton */}
              <div className="flex gap-2 mb-3">
                <div className="h-5 w-20 bg-primary/10 rounded" />
                <div className="h-5 w-24 bg-primary/10 rounded" />
              </div>
              {/* Title skeleton */}
              <div className="h-8 w-3/4 bg-white/10 rounded mb-4" />
              {/* Subtitle skeleton */}
              <div className="h-6 w-1/2 bg-white/10 rounded mb-4" />
              {/* Meta skeleton */}
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="h-4 w-32 bg-white/10 rounded" />
              </div>
            </div>

            {/* Description skeleton */}
            <div className="bg-secondary rounded-xl border border-white/5">
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-primary/20 rounded" />
                  <div className="h-4 w-32 bg-white/10 rounded" />
                </div>
                <div className="h-4 w-4 bg-white/10 rounded" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Prerequisites skeleton */}
                <div className="mb-5 p-3 bg-dark rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <div className="h-4 w-24 bg-white/10 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/10 rounded" />
                    <div className="h-3 w-5/6 bg-white/10 rounded" />
                    <div className="h-3 w-4/6 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Description text skeleton */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Rewards skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-xl border border-white/5">
              {/* Header */}
              <div className="p-5 border-b border-white/5">
                <div className="h-4 w-32 bg-white/10 rounded" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Reward cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  {/* XP card */}
                  <div className="bg-dark rounded-lg p-4 border border-white/5">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-md" />
                      <div>
                        <div className="h-3 w-16 bg-white/10 rounded mb-1" />
                        <div className="h-5 w-20 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Difficulty card */}
                  <div className="bg-dark rounded-lg p-4 border border-white/5">
                    <div className="h-3 w-20 bg-white/10 rounded mb-2" />
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-5 rounded-sm ${
                            i < 3 ? 'bg-primary' : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="h-3 w-24 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Button */}
                <div className="mt-6">
                  <div className="w-full py-2 rounded bg-primary h-9" />
                </div>

                {/* Status message */}
                <div className="h-3 w-full bg-white/10 rounded mt-3 mx-auto text-center" />
              </div>
            </div>
          </div>
        </div>

        {/* Related quests skeleton */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <div className="h-6 w-40 bg-white/10 rounded" />
            <div className="h-5 w-20 bg-primary/20 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-secondary p-4 rounded-lg border border-white/5"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 bg-primary/20 rounded-full" />
                    <div className="h-4 w-16 bg-primary/20 rounded" />
                  </div>
                  <div className="h-4 w-20 bg-dark rounded" />
                </div>

                <div className="h-5 w-3/4 bg-white/10 rounded mb-1" />
                <div className="h-3 w-full bg-white/10 rounded mb-3" />
                <div className="h-3 w-24 bg-primary/20 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation links skeleton */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex-1 p-4 rounded-xl bg-secondary border border-white/5"
              >
                <div className="flex flex-col items-center">
                  <div className="h-6 w-48 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-40 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
