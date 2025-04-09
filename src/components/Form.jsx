import { useState } from "react";

const Form = ({ setUserData }) => {
  const [formData, setFormData] = useState({
    name: "",
    competition: "",
    date: "",
    signature: "CodeQuest", // Set default value to CodeQuest
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("certificateData", JSON.stringify(formData));
    setUserData(formData);
  };

  return (
    <div className="form-container bg-black/50 backdrop-blur-lg">
      <h2>Enter Certificate Details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Recipient Name" onChange={handleChange} required />
        <input type="text" name="competition" placeholder="Course Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input 
          type="text" 
          name="signature" 
          value="CodeQuest" 
          readOnly 
          className="read-only-input"
        />
        <button type="submit">Generate Certificate</button>
      </form>
    </div>
  );
};

export default Form;