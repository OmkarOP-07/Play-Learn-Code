import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

const Certificate = () => {
  const [data, setData] = useState({});
  const certificateRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("certificateData");
    if (storedData) setData(JSON.parse(storedData));
  }, []);

  const downloadCertificate = () => {
    html2canvas(certificateRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "certificate.png";
      link.click();
    });
  };

  return (
    <div className="flex justify-center items-center h-screen pt-16 bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 pt-16" >
          <div className="certificate-wrapper bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16">
      {/* Logo at the Top Right */}

      
      
      <div ref={certificateRef} className="certificate">
      <div className="logo-container">
    <img src="/CodeQuest name.png" alt="Code Quest Logo" className="logo" />
  </div>
        <h1 className="title">CERTIFICATE</h1>
        <h2 className="subtitle">Of Completion</h2>
        <p className="text">This certificate is proudly presented to</p>
        <h2 className="name">{data.name || "Your Name"}</h2>
        <p className="text">For Completing Course Of</p>
        <h3 className="competition">{data.competition || "Competition Name"}</h3>
        <p className="date">Date: {data.date || "DD/MM/YYYY"}</p>
        <p className="signature">Certification Issued By: {data.signature || "Authorized Signatory"}</p>
      </div>
      <button className="download-btn" onClick={downloadCertificate}>Download Certificate</button>
    </div>
    </div>
      
  );
};

export default Certificate;
