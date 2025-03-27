import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import linkimage from "../assets/attachment.png"
import axios from "axios"
const Hackathons = () => {
    const [buttonText, setButtonText] = useState('Copy');


const [allevents, setAllEvents] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/evently/hackathons")
      .then((response) => {
        console.log(response.data.data);
        console.log("getting data");
  
        if (response.data.success) {
          setAllEvents(response.data.data); 
        } else {
          console.log("Failed to fetch events: ", response.data.message);
        }
      })
      .catch((err) => {
        console.log("Error fetching events:", err);
      });
  }, []);
  
    const handleClick = async () => {
        await navigator.clipboard.writeText('www.youtube.com');
        setButtonText('Copied!');
    
        setTimeout(() => {
          setButtonText('Copy');
        }, 2000);
      };





    //   timer for applications


    const calculateTimeLeft = (deadline) => {
        const deadlineDate = new Date(deadline);  // Convert string to Date object
        const now = new Date();
        const difference = deadlineDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }; // Event expired
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, expired: false };
    };

    // Timer update hook for each event
    const [timers, setTimers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers) => {
                const updatedTimers = {};
                allevents.forEach((event) => {
                    updatedTimers[event._id] = calculateTimeLeft(event.deadline); // Use the event's deadline
                });
                return updatedTimers;
            });
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [allevents]); // Re-run effect when allevents change




  return (
    <div className='discover-body'>
        {/* <center>
        <div class="group-evently">
                <svg class="icon-evently" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
                <input placeholder="Welcome to Evently, Type to begin search" type="search" class="input-evently" />
            </div>
        </center> */}
        {allevents.map((event) => {
            const timer = timers[event._id] || calculateTimeLeft(event.deadline);
        
        return (
            
        <div className='discover-events'>
            <img src={event.eventposter} alt="" className='event-image' />
            <div className='event-details'>
                <p className='event-heading'>{event.eventName}</p>
                <div className='tag-div'>
                <p className='tag'>{event.tags}</p>
                <p className='tag'>#Internships for Top Performers</p>
                <p className='tag'>#Professional Courses for Top performers</p>
                </div>
                <div className='link-div'>
                    <img src={linkimage} alt="" className='link-image' />
                    <div className='link-input-1'>
                    <input type="text" value={event.eventLink} className='link-input' />
                    <button className='copy-btn' onClick={handleClick}>{buttonText}</button>
                    </div>
                </div>
                <div className='location-div'>
                    <div className='straight-line'>
                    </div>
                    <div className='location-details-div'>
                        <p className='happening-in'>Happening in </p>
                        <p className='kalasalingam-univeristy-p'>{event.eventlocation}</p>
                    </div>
                </div>
                <div className='fee-div'>
                    <div className='straight-line'>
                    </div>
                    <div className='fee-details-div'>
                        <p className='registration-fee'>Registration fee</p>
                        <p className='event-price'>{event.fee} /-</p>
                    </div>
                </div>
                <div className='event-deadline'>
                    <p className='application-date'>Application Deadline :</p>
                    {timer.expired ? (
                                    <div className="timer-expired">
                                        <p className='timer'>Deadline Reached</p>
                                    </div>
                                ) : (
                                    <div className="timer">
                                        <p>{timer.days}d, {timer.hours}h, {timer.minutes}m, {timer.seconds}s</p>
                                    </div>
                                )}
                </div>
                <div className='more-details-div' onClick={()=>{
                    navigate("/eventdetails",{state:{event}})
                }}>
                    <center>
                    <p className='more-details'>More details</p>
                    </center>
                </div>

            
            </div>
            
        </div>
        );
        })}
            
        {/* hdhd */}
    
    </div>
  )
}

export default Hackathons
