import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Components/Home'
import EventUploadForm from "./Components/EventUploadForm"
import './App.css'
import UpdateEvent from "./Components/UpdateEvent"
import "./styles.css"
import './index.css'
import Hiring from "./Components/Hiring"
import EventDetails from "./Components/EventDetails"
import ClubDashboard from "./Components/ClubDashboard"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/hiring" element={<Hiring />} />
      <Route path="/form" element={<ClubDashboard />} />
      <Route path="/update/:id" element={<UpdateEvent />} />
      <Route path='/eventdetails' element={<EventDetails />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App



// import React, { useState } from 'react';

// // Component 1
// const Component1 = () => <div><h2>This is Component 1 (Default)</h2></div>;

// // Component 2
// const Component2 = () => <div><h2>This is Component 2</h2></div>;

// // Component 3
// const Component3 = () => <div><h2>This is Component 3</h2></div>;

// function App() {
//     // State to track which component is displayed
//     const [activeComponent, setActiveComponent] = useState(1);

//     // Function to handle button clicks and set the active component
//     const showComponent = (componentNumber) => {
//         setActiveComponent(componentNumber);
//     };

//     return (
//         <div>
//             <div className="button-container">
//                 <button onClick={() => showComponent(1)}>Component 1</button>
//                 <button onClick={() => showComponent(2)}>Component 2</button>
//                 <button onClick={() => showComponent(3)}>Component 3</button>
//             </div>

//             {/* Render the active component based on the state */}
//             {activeComponent === 1 && <Component1 />}
//             {activeComponent === 2 && <Component2 />}
//             {activeComponent === 3 && <Component3 />}
//         </div>
//     );
// }

// export default App;
