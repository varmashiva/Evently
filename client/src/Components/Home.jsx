import Discover from "./Discover";
import Hackathons from "./Hackathons";
import Winners from "./Winners";
import GetIntoClubs from "./GetIntoClubs";
import { useState } from "react";
import Navbar from "./Navbar"
const Home = () => {
    const [activeComponent, setActiveComponent] = useState(1);

    const showComponent = (componentNumber) => {
        setActiveComponent(componentNumber);
    };

    const getButtonClass = (componentNumber) => {
        // Return dark for the active button and light for others
        return activeComponent === componentNumber ? "btn-dark" : "btn-light";
      };

  return (
    <div>
        <Navbar />
        <hr className="hr-1" />
        <div className="three-section-btns">
            <button onClick={()=> showComponent(1)} className={getButtonClass(1)}>DISCOVER</button>
            <button onClick={() => showComponent(2)} className={getButtonClass(2)}>HACKATHONS</button>
            <button onClick={() => showComponent(3)} className={getButtonClass(3)}>WINNERS</button>
            <button onClick={() => showComponent(4)} className={getButtonClass(4)}>GET INTO CLUBS</button>
        </div>

        {activeComponent === 1 && <Discover />}
        {activeComponent === 2 && <Hackathons />}
        {activeComponent === 3 && <Winners />}
        {activeComponent === 4 && <GetIntoClubs />}
    </div>
  )
}

export default Home
