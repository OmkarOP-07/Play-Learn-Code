import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

const VideoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Simulate fetching videos from an API
    const fetchVideos = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockVideos = [
        {
          id: 1,
          title: 'Introduction to Java Programming',
          channel: 'CodeQuest Academy',
          thumbnail: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
        },
        {
          id: 2,
          title: 'Advanced Java Concepts',
          channel: 'CodeQuest Academy',
          thumbnail: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
        },
        {
          id: 3,
          title: 'Java for Beginners',
          channel: 'CodeQuest Academy',
          thumbnail: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
        },
        {
          id: 4,
          title: 'Object-Oriented Programming in Java',
          channel: 'CodeQuest Academy',
          thumbnail: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
        },
        {
          id: 5,
          title: 'Java Collections Framework',
          channel: 'CodeQuest Academy',
          thumbnail: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
        },
        {
          id: 6,
          title: 'Java Exception Handling',
          channel: 'CodeQuest Academy',
          thumbnail: 'https://cdn-icons-png.flaticon.com/512/226/226777.png'
        }
      ];
      
      setVideos(mockVideos);
      setLoading(false);
    };
    
    fetchVideos();
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
        Featured Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loading cards
          Array(6).fill(0).map((_, index) => (
            <VideoCard key={index} isLoading={true} />
          ))
        ) : (
          // Show actual video cards
          videos.map(video => (
            <VideoCard key={video.id} isLoading={false} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoGrid; 