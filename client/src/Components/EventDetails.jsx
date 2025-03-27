import Navbar from "./Navbar"
import eventimage from "../assets/event-1.jpg"
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const EventDetails = () => {
  const event=useLocation().state.event
  const calculateTimeLeft = () => {
          const deadline = new Date(event.deadline);
          const now = new Date();
          const difference = deadline - now;
      
  
          if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }; // Event expired
          }
      
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
          return { days, hours, minutes, seconds, expired: false };
        };
      
        // State to hold the time left
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(event.deadline));
      
        // Update the timer every second
        useEffect(() => {
          if (timeLeft.expired) return; // Stop updating when expired
      
          const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(event.deadline));  // Recalculate time left for the event's deadline
          }, 1000); // Update every second
      
          return () => clearInterval(interval); // Cleanup the interval on component unmount
        }, [timeLeft.expired, event.deadline]);
  
  return (
    <div>
      <Navbar />
      <hr className="hr-1" />
      <center>
        <p className="page2-title">{event.eventName}</p>
      </center>
      <div className="page2-body">
      <div className="page2-details">
        <div className="page2-main-details">
            <img src={event.eventposter} alt="" className="event-image1" />
            <div className="page2-main-details-1" >
                <p className="page2-title2">{event.eventName}</p>
                {/* <p className="page2-description">ETHDenver is the world’s largest and longest running blockchain-powered #BUIDLathon (FKA hackathon). Every year, more than 25,000+ innovators from over 125 countries converge to create a week-long festival of innovation. ETHDenver is a world renowned gathering place where developers, creators, and visionaries come together to address critical challenges and bring groundbreaking ideas to life in the fields of blockchain and distributed computing.</p>
                <p className="page2-description">ETHDenver’s impact extends beyond the event. Our alumni have collectively raised over $300 million in funding (excluding undisclosed grants and early-stage investments). Past #BUIDL teams— such as 1Inch, POAP.xyz, Huma Finance, Harpie, and others— have evolved from humble beginnings at ETHDenver into key players and contributors to the blockchain ecosystem. Some have even become sponsors, partners, and integral contributors to the ETHDenver Community Innovation Festival.</p>
                <p className="page2-description">ETHDenver is the world’s largest and longest running blockchain-powered #BUIDLathon (FKA hackathon). Every year, more than 25,000+ innovators from over 125 countries converge to create a week-long festival of innovation. ETHDenver is a world renowned gathering place where developers, creators, and visionaries come together to address critical challenges and bring groundbreaking ideas to life in the fields of blockchain and distributed computing.</p>
                <p className="page2-description">ETHDenver is the world’s largest and longest running blockchain-powered #BUIDLathon (FKA hackathon). Every year, more than 25,000+ innovators from over 125 countries converge to create a week-long festival of innovation. ETHDenver is a world renowned gathering place where developers, creators, and visionaries come together to address critical challenges and bring groundbreaking ideas to life in the fields of blockchain and distributed computing.</p> */}
                <p className="page2-description">{event.discription}</p>
                <div className="prize-pool-div">
                  <center>
                    <p className="mega-prize-pool">₹{event.prizepool}</p>
                    <p className="available-in-prizes">Available in Prizes</p>
                  </center>
                </div>
                <div className="organizers-div">
                  <p className="organizers-text">Organizers</p>
                  <div className="organizing-people">
                    {/* first person */}
                    <div className="people-div">
                      <img src={event.imageUrls[0]} alt="" className="people-profile"/>
                      <div className="people-info">
                        <p className="people-name">{event.organizername1}</p>
                        <p className="people-contact">Contact-{event.contact1}</p>
                      </div>
                    </div>
                    {/* second person */}
                    <div className="people-div">
                    <img src={event.imageUrls[1]} alt="" className="people-profile"/>
                      <div className="people-info">
                        <p className="people-name">{event.organizername2}</p>
                        <p className="people-contact">Contact-{event.contact2}</p>
                      </div>
                    </div>
                  </div>
                  <div className="people-div2">
                    <img src={event.imageUrls[2]} alt="" className="people-profile"/>
                      <div className="people-info">
                        <p className="people-name">{event.organizername3}</p>
                        <p className="people-contact">Contact-{event.contact3}</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="page2-sticky-details">
          <div className="page2-location-date">
            <div className="straight-line2">
            </div>
            <div className="page2-location-date-textbox">
              <div className="page2-date">
                <p className="runs-from">Runs from</p>
                <p className="page2-date-text">
                  {new Date(event.startdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} -  
                  {new Date(event.enddate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>

              </div>
              <div className="page2-location">
                <p className="happening-in2">Happening in</p>
                <p className="page2-location-text">{event.eventlocation}</p>
              </div>
            </div>
          </div>
          <div className="page2-winnings">
            <p className="winnings">Winnings</p>
            <div className="first-prize-div">
              <p className="first-prize prize-money-text">🥇 1st Price Money</p>
              <p className="first-prize dash">-</p>
              <p className="first-prize prize-money-amount">₹{event.firstprize}</p>
            </div>
            <div className="first-prize-div">
              <p className="first-prize prize-money-text">🥈 2nd Price Money</p>
              <p className="first-prize dash">-</p>
              <p className="first-prize prize-money-amount">₹{event.secondprize}</p>
            </div>
            <div className="first-prize-div">
              <p className="first-prize prize-money-text">🥉 3rd Price Money</p>
              <p className="first-prize dash">-</p>
              <p className="first-prize prize-money-amount">₹{event.thirdprize}</p>
            </div>
          </div>
          <div className="page2-credits-bg">
          <div className="credits-div">
              <p className="first-prize prize-money-text">🌟 Credits</p>
              <p className="first-prize dash">-</p>
              <p className="first-prize prize-money-amount">{event.noofcredits} {event.typeofcredits}</p>
            </div>
          </div>
          <div className="page2-fee-bg">
          <div className="credits-div">
              <p className="first-prize prize-money-text">💵 Registration fee</p>
              <p className="first-prize dash">-</p>
              <p className="first-prize prize-money-amount">₹{event.fee}</p>
            </div>
          </div>
          <div className='event-deadline2'>
                    <p className='application-date'>Application Deadline :</p>
                    {timeLeft.expired ? (
                            <div className="timer-expired">
                            <p className='timer'>Deadline Reached</p>
                            </div>
                        ) : (
                            <div className="timer">
                            <p>
                                {timeLeft.days}d, {timeLeft.hours}h, {timeLeft.minutes}m, {timeLeft.seconds}s
                            </p>
                            </div>
                        )}
                </div>
            <button className="apply-here-btn">Apply here!</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EventDetails
