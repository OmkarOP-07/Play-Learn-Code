import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJavaPoints } from "../Java/JavaPointsContext";
import Form from "./Form";
import Certificate from "./Certificate";
import "./CertGen.css";
import { Lock, Trophy, ArrowLeft } from "lucide-react";

const CertGen = () => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useAuth();
  const { points } = useJavaPoints();
  const navigate = useNavigate();
  
  // Calculate percentage of course completed
  const totalPoints = 170; // Total points in the course
  const percentageCompleted = Math.round((points / totalPoints) * 100);
  const isCertificationEligible = percentageCompleted >= 80;
  const pointsNeeded = Math.ceil((totalPoints * 0.8) - points);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  
  // If not eligible for certification, show message
  if (!isCertificationEligible) {
    return (
      <div className="app-container flex justify-center items-center pt-16 bg-gradient-to-b from-indigo-950 via-purple-950 to-violet-950 h-screen overflow-y-auto">
        <div className="max-w-md w-full bg-black/30 p-8 rounded-xl border border-white/10 shadow-lg mt-[5.6rem]">
          <div className="flex flex-col items-center text-center">
            <Lock className="h-16 w-16 text-yellow-500 mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Certificate Locked</h1>
            <p className="text-gray-300 mb-6">
              You need to complete at least 80% of the course to get a certificate.
            </p>
            
            <div className="w-full bg-gray-700/50 rounded-full h-4 mb-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full" 
                style={{ width: `${percentageCompleted}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between w-full text-sm mb-6">
              <span className="text-gray-300">0%</span>
              <span className="text-gray-300">80%</span>
              <span className="text-gray-300">100%</span>
            </div>
            
            <div className="bg-red-900/30 p-4 rounded-lg mb-6 w-full">
              <p className="text-white font-medium">Current Progress: {percentageCompleted}%</p>
              <p className="text-gray-300 mt-1">You need {pointsNeeded} more points to unlock the certificate.</p>
            </div>
            
            <button
              onClick={() => navigate("/learn")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container flex justify-center items-center pt-16 bg-gradient-to-b from-indigo-950 via-purple-950 to-violet-950 h-screen overflow-y-auto">
      {!userData ? <Form setUserData={setUserData} /> : <Certificate userData={userData} />}
    </div>
  );
};

export default CertGen;
