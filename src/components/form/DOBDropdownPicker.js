import React, { useState, useEffect } from "react";

export default function DOBDropdownPicker() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [days, setDays] = useState([]);

  useEffect(() => {
    if (selectedYear && selectedMonth !== "") {
      const monthIndex = parseInt(selectedMonth);
      const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
      const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      setDays(newDays);
    }
  }, [selectedYear, selectedMonth]);

//   const handleSubmit = () => {
//     if (selectedYear && selectedMonth !== "" && selectedDay) {
//       const dob = `${selectedYear}-${String(parseInt(selectedMonth) + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
//       alert(`DOB Selected: ${dob}`);
//     } else {
//       alert("Please select complete date of birth");
//     }
//   };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">DOB Dropdown Picker</h2>

      <div className="flex gap-3 mb-4">
        <select
          className="flex-1 p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <select
          className="flex-1 p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Month</option>
          {months.map((month, idx) => (
            <option key={month} value={idx}>{month}</option>
          ))}
        </select>

        <select
          className="flex-1 p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* <button
        className="w-full py-2 bg-slate-800 text-white rounded-lg hover:opacity-90"
        onClick={handleSubmit}
      >
        Submit
      </button> */}

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
        This version uses three dropdowns (Day, Month, Year) — ideal for DOB selection, simple, and mobile-friendly.
      </p>
    </div>
  );
}
