import { useState, useEffect } from 'react';
import axios from 'axios';
import useSideBar from "../../re-components/Admin/UseSidebar";
import { TextField, Select, MenuItem, Button, Snackbar } from '@mui/material';
import { v4 as uuid } from 'uuid'; // Import UUID generator

const FundingForm = ({ students }) => {
  useSideBar();

  const [studentId, setStudentId] = useState('');
  const [temporaryStudentId, setTemporaryStudentId] = useState('');
  const [tuitionFees, setTuitionFees] = useState('');
  const [financialAid, setFinancialAid] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle changes when a student is selected
  const handleStudentChange = async (id) => {
    setStudentId(id);
    setTemporaryStudentId(''); // Clear any previously generated temporary ID
    if (!id) {
      setTuitionFees('');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/request/tuition-fee/${id}`);
      if (response.data && response.data.tuitionFees) {
        setTuitionFees(response.data.tuitionFees);
      } else {
        setTuitionFees('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tuition fee for the selected student.');
    }
  };

  // Generate a temporaryStudentId if no student is selected
  useEffect(() => {
    if (!studentId) {
      setTemporaryStudentId(uuid());
    }
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedTuitionFees = parseFloat(tuitionFees);
    const parsedFinancialAid = parseFloat(financialAid);

    if (isNaN(parsedTuitionFees) || isNaN(parsedFinancialAid)) {
      setError('Tuition Fees and Financial Aid must be valid numbers.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/fundings', {
        studentId: studentId || null, // Send null if student doesn't exist
        temporaryStudentId: !studentId ? temporaryStudentId : null, // Only send temporary ID if no student exists
        tuitionFees: parsedTuitionFees,
        financialAid: parsedFinancialAid,
      });
      console.log('Funding Created:', response.data);
      setSuccess(true);
      setStudentId('');
      setTemporaryStudentId('');
      setTuitionFees('');
      setFinancialAid('');
    } catch (err) {
      console.error(err);
      setError('Failed to create funding.');
    }
  };

  return (
    <div className="main" id="main">
      <form onSubmit={handleSubmit}>
        <Select
          value={studentId}
          onChange={(e) => handleStudentChange(e.target.value)}
          required
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a Student
          </MenuItem>
          {(students || []).map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Tuition Fees"
          type="number"
          value={tuitionFees}
          onChange={(e) => setTuitionFees(e.target.value)}
          required
          disabled={!studentId} // Disable input if no student is selected
        />
        <TextField
          label="Financial Aid"
          type="number"
          value={financialAid}
          onChange={(e) => setFinancialAid(e.target.value)}
          required
        />
        <Button type="submit">Create Funding</Button>
        {error && <Snackbar open={true} message={error} onClose={() => setError('')} />}
        {success && <Snackbar open={true} message="Funding created successfully!" onClose={() => setSuccess(false)} />}
      </form>
    </div>
  );
};

export default FundingForm;
