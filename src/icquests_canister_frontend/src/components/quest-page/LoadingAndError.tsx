import Link from 'next/link';
import Web3Loader from '../web3-loader';

export const QuestLoading = () => {
  return <Web3Loader message="Loading quest details..." minDisplayTime={2500} />;
};

export const QuestError = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white/5 p-8 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-4">Error Loading Quest</h2>
        <p className="text-white/70 mb-6">
          There was an error loading quest details.
        </p>
        <Link
          href="/all-quests"
          className="inline-block bg-white/10 hover:bg-white/20 py-2 px-4 rounded text-white transition-colors"
        >
          Go back to all quests
        </Link>
      </div>
    </div>
  );
};

export const QuestNotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white/5 p-8 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-4">Quest Not Found</h2>
        <p className="text-white/70 mb-6">
          The quest you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/all-quests"
          className="inline-block bg-white/10 hover:bg-white/20 py-2 px-4 rounded text-white transition-colors"
        >
          Browse all quests
        </Link>
      </div>
    </div>
  );
};
