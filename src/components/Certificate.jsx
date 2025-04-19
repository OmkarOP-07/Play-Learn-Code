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
  const DownloadIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-white" 
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
      />
    </svg>
  );
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black-950 via-purple-900 to-violet-950 w-full pt-[3rem]">
      <div className="certificate-wrapper bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 aspect-w-16 aspect-h-9 mx-auto h-auto w-full max-w-4xl">
        {/* Logo at the Top Right */}

        <div ref={certificateRef} className="certificate">
          <h1 className="title">CERTIFICATE</h1>
          <h2 className="subtitle">Of Completion</h2>
          <p className="text">This certificate is proudly presented to</p>
          <h2 className="name">{data.name || "Your Name"}</h2>
          <p className="text">For Completing Course Of</p>
          <h3 className="competition">{data.competition || "Competition Name"}</h3>
          <p className="date">Date: {data.date || "DD/MM/YYYY"}</p>
          <p className="signature">Certification Issued By: {data.signature || "Authorized Signatory"}</p>
        </div>
       <div className="fixed bottom-0 left-0 flex justify-center items-center z-50">
          <button 
            className="w-12 h-12 flex justify-center items-center bg-gradient-to-l from-black to-purple-900 rounded-full shadow-lg hover:from-purple-900 hover:to-black transition-all duration-300 hover:scale-110 ml-2 mb-2"
            onClick={downloadCertificate}
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      <style jsx>{`
        .certificate-wrapper {
          position: relative;
          padding: 20px;
          border: 12px double #d4af37;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png');
          background-color: #f9f5e0;
          overflow: hidden;
        }

        .certificate {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 20px;
        }

        .title {
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 3px;
          color: #2c3e50;
          margin-bottom: 5px;
          padding-top: 10px;
          text-transform: uppercase;
          font-family: 'Playfair Display', serif;
          text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
        }

        .subtitle {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .name {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .competition {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .date, .signature {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .download-btn {
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .certificate-wrapper {
            width: 100%;
            height: auto;
          }

          .certificate {
            width: 100%;
            height: auto;
            padding: 10px;
          }

          .title {
            font-size: 28px;
          }

          .subtitle {
            font-size: 20px;
          }

          .name {
            font-size: 24px;
          }

          .competition {
            font-size: 20px;
          }

          .date, .signature {
            font-size: 16px;
          }

          .download-btn {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .certificate-wrapper {
            width: 100%;
            height: auto;
          }

          .certificate {
            width: 100%;
            height: auto;
            padding: 5px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 18px;
          }

          .name {
            font-size: 20px;
          }

          .competition {
            font-size: 18px;
          }

          .date, .signature {
            font-size: 14px;
          }

          .download-btn {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificate;
