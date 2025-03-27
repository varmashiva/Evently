import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Upload, ChevronDown, X, Users } from 'react-feather'; // Assuming you are using react-feather

const clubs = [
  {
    name: "Club Name 1",
    roles: ["Designer", "Developer"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=faces&auto=format"
  },
  {
    name: "Club Name 2",
    roles: ["Manager", "Marketer"],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=150&h=150&fit=crop&crop=faces&auto=format"
  },
  {
    name: "Club Name 3",
    roles: ["Photographer", "Editor"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=faces&auto=format"
  }
];

const AVAILABLE_ROLES = [
  'Technical team',
  'Web team',
  'Event organiser',
  'Design team',
  'Social media team',
  'Event co-ordinator',
  'Secretary',
  'Content writer',
  'President'
];

const GetIntoClubs = () => {
  const [modal2, setModal2] = useState(false);
  const [clubName, setClubName] = useState('');
  const [roles, setRoles] = useState([]);
  const [clubLogo, setClubLogo] = useState(null); // Store Cloudinary image URL
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Filter out the roles that have already been selected
  const availableRoles = AVAILABLE_ROLES.filter(role => !roles.includes(role));

  // Handle image upload to Cloudinary and backend
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        // Upload to Cloudinary
        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dxflnmfxl/image/upload',
          {
            file: reader.result,
            upload_preset: 'evently',
          }
        );

        // Get the Cloudinary URL
        const uploadedImageUrl = cloudinaryResponse.data.secure_url;
        setClubLogo(uploadedImageUrl);
        setPreviewUrl(uploadedImageUrl);
        toast.success("Club logo uploaded successfully");

      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddRole = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole && !roles.includes(selectedRole)) {
      setRoles([...roles, selectedRole]);
    }
  };

  // Remove a selected role
  const handleRemoveRole = (roleToRemove) => {
    setRoles(roles.filter(role => role !== roleToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      clubLogo,
      clubName,
      availableRoles: roles.join(', ')
    };

    try {
      const response = await axios.post('http://localhost:3001/evently/roleupload', roleData);
      toast.success("Role uploaded successfully");
      setModal2(false)
      console.log('Backend response:', response.data);
    } catch (error) {
      toast.error("Failed to create the club. Please try again.");
      console.error("Error creating club:", error);
    }
  };

  return (
    <div className="clubs-container">
      <div className="content-wrapper">
        <div className="header">
          <h1 className='join-our-clubs'>Join Our Clubs</h1>
          <p className='tag'>Find your perfect role in our growing community</p>
        </div>

        <div className="clubs-list">
          {clubs.map((club, index) => (
            <div key={index} className="club-card">
              <div className="club-content">
                <div className="club-image-container">
                  <div className="club-image-wrapper">
                    {club.image ? (
                      <img
                        src={club.image}
                        alt={`${club.name} logo`}
                        className="club-image"
                      />
                    ) : (
                      <div className="fallback-icon">
                        <Users size={32} color="rgba(0, 100, 0, 0.4)" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="club-info">
                  <h3 className="club-name">{club.name}</h3>
                  <div className="roles-list">
                    {club.roles.map((role, roleIndex) => (
                      <button key={roleIndex} className="role-button">
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="join-button" onClick={() => setModal2(true)}>
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal2 && (
        <div className="modal2">
          <div onClick={() => setModal2(false)} className="overlay1"></div>
          <div className="modal2-content">
            <form className="create-club-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Create New Club</h2>

              {/* Club Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="clubName">Your Resume</label>
                <input
                  type="text"
                  id="clubName"
                  className="form-input"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="Enter club name"
                  required
                />
              </div>

              {/* Club Logo */}
              <div className="form-group">
                <label className="form-label">Upload your resume</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                    id="clublogo"
                  />
                  <div
                    className="image-upload-box"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="preview-image"
                      />
                    ) : (
                      <>
                        <Upload size={24} className="upload-icon" />
                        <span>Click to upload logo</span>
                        <span className="upload-hint">JPG, PNG up to 5MB</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Available Roles */}
              <div className="form-group">
                <label className="form-label" htmlFor="roles">Available Roles</label>
                <select
                  id="roles"
                  className="roles-dropdown text-input"
                  onChange={handleAddRole}
                  value=""
                >
                  <option value="">Select a role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                <div className="roles-list">
                  {roles.map((role, index) => (
                    <div key={index} className="role-tag">
                      {role}
                      <button
                        type="button"
                        className="remove-role-button"
                        onClick={() => handleRemoveRole(role)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                Create Club
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default GetIntoClubs;
