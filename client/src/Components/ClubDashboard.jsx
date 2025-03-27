import EventUploadForm from "./EventUploadForm";
import Navbar from "./Navbar";
import Hackathons from "./Hackathons"; // Ensure this component is imported
import { useState } from "react";
import UploadedEvents from "./UploadedEvents";

const ClubDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(1);
  
  const showComponent = (componentNumber) => {
    setActiveComponent(componentNumber);
  };

  const getButtonClass = (componentNumber) => {
    return activeComponent === componentNumber ? "btn-dark" : "btn-light";
  };

  return (
    <div>
      <Navbar />
      <hr className="hr-1" />
      <div className="upload-uploaded-btns three-section-btns">
        <button
          onClick={() => showComponent(1)}
          className={getButtonClass(1)}
        >
          UPLOAD EVENTS
        </button>
        <button
          onClick={() => showComponent(2)}
          className={getButtonClass(2)}
        >
          UPLOADED EVENTS
        </button>
      </div>
      {activeComponent === 1 && <EventUploadForm />}
      {activeComponent === 2 && <UploadedEvents />}
    </div>
  );
};

export default ClubDashboard;
