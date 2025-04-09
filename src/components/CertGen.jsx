import { useState } from "react";
import Form from "./Form";
import Certificate from "./Certificate";
import "./CertGen.css";

const CertGen = () => {
  const [userData, setUserData] = useState(null);

  return (
    <div className="app-container flex justify-center items-center pt-16 bg-gradient-to-b from-indigo-950 via-purple-950 to-violet-950 h-screen overflow-y-auto">
      {!userData ? <Form setUserData={setUserData} /> : <Certificate />}
    </div>
  );
};

export default CertGen;
