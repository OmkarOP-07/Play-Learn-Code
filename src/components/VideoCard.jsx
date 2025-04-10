import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function VideoCard({ isLoading, video }) {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-1">
      {isLoading ? (
        <div>
          <Skeleton height={180} baseColor="#3b0764" highlightColor="#9333ea" /> {/* thumbnail placeholder */}
          <Skeleton count={2} className="mt-2" baseColor="#3b0764" highlightColor="#9333ea" /> {/* text lines */}
        </div>
      ) : (
        <div>
          <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-lg" />
          <h3 className="text-xl font-bold mt-3 text-white">{video.title}</h3>
          <p className="text-purple-200 mt-1">{video.channel}</p>
        </div>
      )}
    </div>
  );
}

export default VideoCard; 