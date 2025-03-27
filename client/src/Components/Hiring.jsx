import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Hiring = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/evently/hiring');
        if (response.data.success) {
          setRoles(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to fetch roles data');
        toast.error('Failed to fetch roles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="hiring-container">
      <h1>Hiring Roles</h1>
      {roles.length === 0 ? (
        <p>No roles available at the moment.</p>
      ) : (
        <div className="roles-list">
          {roles.map((role) => (
            <div key={role._id} className="role-card">
              <h3>{role.clubName}</h3>
              <p><strong>Roles Available:</strong> {role.availableRoles}</p>
              <p><strong>Logo:</strong> <img src={role.clubLogo} alt={role.clubName} width="50" /></p>
              <button className="apply-button">Apply</button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Hiring;
