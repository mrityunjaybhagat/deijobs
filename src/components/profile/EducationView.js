import React, { useState, useEffect } from "react";
import { postData } from "../../services/apiAxios";

const EducationView = () => {
  const userId = localStorage.getItem("login_token");

  const [formData, setFormData] = useState({
    degree: "",
    university: "",
    yearOfPassing: "",
    percentage: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        console.log("📡 Sending userId:", userId);

        // ✅ POST request with userId
        const res = await postData("get-profile-data", { userId });
        console.log("📥 Full API Response:", res);

        const edu = res?.data?.education_data;

        if (edu) {
          setFormData({
            degree: edu.degree || "",
            university: edu.university || "",
            yearOfPassing: edu.yearOfPassing || "",
            percentage: edu.percentage || "",
            description: edu.description || "",
          });
        } else {
          console.warn("⚠️ No education_data found in response");
        }
      } catch (err) {
        console.error("❌ Error fetching education data:", err);
        setError("Failed to load education data");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>⏳ Loading your education details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <form className="p-2" style={{ marginTop: 10 }}>
      <div className="d-flex form-row">
        <label>Degree</label>
        <input
          type="text"
          name="degree"
          className="form-control"
          value={formData.degree}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex form-row">
        <label>University</label>
        <input
          type="text"
          name="university"
          className="form-control"
          value={formData.university}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex form-row">
        <label>Year Of Passing</label>
        <input
          type="date"
          name="yearOfPassing"
          className="form-control"
          value={formData.yearOfPassing}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex form-row">
        <label>Percentage (%)</label>
        <input
          type="text"
          name="percentage"
          className="form-control"
          value={formData.percentage}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex form-row">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-sm btn-primary" type="submit">
        Save / Update
      </button>
    </form>
  );
};

export default EducationView;
