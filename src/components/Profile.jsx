import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) return null;

  // Mock data for course progress
  const courses = [
    {
      name: "Java Basics",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      lastAccessed: "2 days ago"
    },
    {
      name: "Object-Oriented Programming",
      progress: 45,
      totalLessons: 25,
      completedLessons: 11,
      lastAccessed: "1 week ago"
    },
    {
      name: "Data Structures in Java",
      progress: 20,
      totalLessons: 30,
      completedLessons: 6,
      lastAccessed: "2 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
              {user.email.split('@')[0].charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.displayName || 'User'}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-primary font-semibold">Level 3</span>
                  <div className="ml-2 w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-2/3 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-primary font-semibold">XP: 1250</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Learning Progress</h2>
          <div className="space-y-6">
            {courses.map((course, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                  <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
                  <span>{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-2">
                🏆
              </div>
              <p className="text-sm font-medium text-gray-900">First Challenge</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-2">
                ⭐
              </div>
              <p className="text-sm font-medium text-gray-900">Perfect Score</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-2">
                🎯
              </div>
              <p className="text-sm font-medium text-gray-900">Streak Master</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-2">
                🏅
              </div>
              <p className="text-sm font-medium text-gray-900">Java Expert</p>
              <p className="text-xs text-gray-500">Locked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 