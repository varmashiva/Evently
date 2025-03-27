import {  useState, useEffect } from "react";
import axios from "axios"
import {Link, useParams, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateEvent = () => {
    const [clubName, setClubName] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventLink, setEventLink] = useState("");
    const [fee, setFee] = useState(null);
    const [deadline, setDeadlineDate] = useState("");
    const [startdate, setStartDate] = useState("")
    const [enddate, setEndDate] = useState("")
    const [eventlocation, setEventLocation] = useState("")
    const [starttime, setStartTime] = useState("")
    const [endtime, setEndTime] = useState("")
    const [prizepool, setPrizePool] = useState(null)
    const [firstprize, setFirstPrize] = useState(null)
    const [secondprize, setSecondPrize] = useState(null)
    const [thirdprize, setThirdPrize] = useState(null)
    const [tags, setTags] = useState("")
    const [noofcredits, setNoOfCredits] = useState(null)
    const [typeofcredits, setTypeOfCredits] = useState("")
    const [clublogo, setClubLogo] = useState("")
    const [eventposter, setEventPoster] = useState("")
    const [discription, setDiscription] = useState("")
    const [organizername1, setOrganizername1] = useState("")
    const [organizername2, setOrganizername2]  = useState("")
    const [organizername3, setOrganizername3] = useState("")
    const [contact1, setContact1] = useState(null)
    const [contact2, setContact2] = useState(null)
    const [contact3, setContact3] = useState(null)
    const [imageUrls, setImageUrls] = useState([null, null, null]);

    const navigate = useNavigate()

    const { id } = useParams();


    const [loading, setLoading] = useState(false);


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
    
        reader.onloadend = async () => {
          try {
            const response = await axios.post(
              'https://api.cloudinary.com/v1_1/dxflnmfxl/image/upload',
              {
                file: reader.result,
                upload_preset: 'evently',
              }
            );
    
            // Set the URL from Cloudinary response
            if (e.target.id === "clublogo") {
              setClubLogo(response.data.secure_url);
              toast("Club logo upload successfully")
            } else if (e.target.id === "eventposter") {
              setEventPoster(response.data.secure_url);
              toast("Event poster upload successfully")
            }
          } catch (error) {
            console.error("Upload failed:", error);
          }
        };
    
        reader.readAsDataURL(file);
      };


      const handleClubNameChange = (e) => {
        setClubName(e.target.value);
      };
    
      const handleEventNameChange = (e) => {
        setEventName(e.target.value);
      };

      const handleFileChange = async (e, index) => {
        try {
          setLoading(true);
          const file = e.target.files[0];
    
          if (file) {
            const reader = new FileReader();
    
            reader.onloadend = async (e) => {
              try {
                console.log(e.target.result)
                const response = await axios.post('https://api.cloudinary.com/v1_1/dxflnmfxl/image/upload', {
                  file: reader.result,
                  upload_preset: 'evently',
                });
    
                const newImageUrls = [...imageUrls];
                newImageUrls[index] = response.data.url;
                setImageUrls(newImageUrls);
                console.log(imageUrls)
    
                toast("Image uploaded successfully!");
              } catch (error) {
                console.error("Error uploading file:", error);
                toast.error("Error uploading the image.");
              } finally {
                setLoading(false);
              }
            };
            reader.readAsDataURL(file);
          }
        } catch (error) {
          console.error("Error in file change:", error);
        }
      };

      useEffect(() => {
        axios
          .get(`http://localhost:3001/evently/update/${id}`)
          .then((response) => {
            const event = response.data;
            if (event) {
                setClubName(event.clubName);
                setEventName(event.eventName);
                setEventLink(event.eventLink);
                setFee(event.fee);
                setDeadlineDate(event.deadline);
                setStartDate(event.startdate);
                setEndDate(event.enddate);
                setEventLocation(event.eventlocation);
                setStartTime(event.starttime);
                setEndTime(event.endtime);
                setPrizePool(event.prizepool);
                setFirstPrize(event.firstprize);
                setSecondPrize(event.secondprize);
                setThirdPrize(event.thirdprize);
                setTags(event.tags);
                setNoOfCredits(event.noofcredits);
                setTypeOfCredits(event.typeofcredits);
                setClubLogo(event.clublogo);
                setEventPoster(event.eventposter);
                setDiscription(event.discription);
                setOrganizername1(event.organizername1);
                setOrganizername2(event.organizername2);
                setOrganizername3(event.organizername3);
                setContact1(event.contact1);
                setContact2(event.contact2);
                setContact3(event.contact3);
                setImageUrls(event.imageUrls);
            }
          })
          .catch((err) => console.log(err));
      }, [id]);

      const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/evently/update/${id}`, {
            clubName, 
            eventName,
            eventLink,
            fee,
            deadline,
            startdate,
            enddate,
            eventlocation,
            starttime,
            endtime,
            prizepool,
            firstprize,
            secondprize,
            thirdprize,
            tags,
            noofcredits,
            typeofcredits,
            clublogo,
            eventposter,
            discription,
            organizername1,
            organizername2,
            organizername3,
            contact1,
            contact2,
            contact3,
            imageUrls
        })
        .then((result) => {
            console.log(result)
            navigate('/form')
        })
        .catch((err) => {
            console.log(err);
          });
      }


    
  return (
    <div className="form-body">
        <center>
        <p className="page2-title">{eventName}</p>
      </center>
      <form className="form">
        <div className="page3-clubname-eventname">
          <div className="page3-clubname">
            <label htmlFor="club-name-input">Club Name</label><br />
            <input
              type="text"
              id="club-name-input"
              className="clubname text-input"
              placeholder="Club Name"
              value={clubName}
              onChange={handleClubNameChange}
            />
          </div>

          <div className="page3-eventname">
            <label htmlFor="event-name-input">Event Name</label><br />
            <input
              type="text"
              id="event-name-input"
              className="eventname text-input"
              placeholder="Event Name"
              value={eventName}
              onChange={handleEventNameChange}
            />
          </div>
        </div>
        {/* event-link */}
        <div className="page3-eventlink">
            <label htmlFor="event-name label">Event Link</label><br />
            <input type="text" className="event-name text-input2" id="event-name" placeholder="Event Link" value={eventLink} onChange={(e) => setEventLink(e.target.value)} />
        </div>

        <div className="page3-fee-deadline">
            <div className="page3-fee">
                <label htmlFor="registrationfee">Registration fee</label>
                <input type="number" id="registrationfee" className="fee text-input" placeholder="Registration fees" value={fee} onChange={(e) => setFee(e.target.value)} />
            </div>
            <div className="page3-deadline">
                <label htmlFor="deadline">Application deadline</label>
                <input type="date" id="deadline" className="deadline text-input" placeholder="Choose deadline date" value={deadline} onChange={(e) => setDeadlineDate(e.target.value)} />
            </div>
        </div>

        <div className="page3-eventlocation">
            <label htmlFor="event-venue">Event venue</label>
            <input type="text" id="event-venue" className="event-venue text-input2" placeholder="Event venue in your university" value={eventlocation} onChange={(e) => setEventLocation(e.target.value)} />
        </div>

        <div className="page3-startdate-enddate">
            <div className="page3-startdate">
                <label htmlFor="startdate">Starting Date</label>
                <input type="date" id="startdate" className="start-date text-input" value={startdate} onChange={(e) => setStartDate(e.target.value)}/>
            </div>
            <div className="page3-startdate">
                <label htmlFor="enddate">Ending Date</label>
                <input type="date" id="enddate" className="end-date text-input" value={enddate} onChange={(e) => setEndDate(e.target.value)}/>
            </div>
        </div>

        <div className="page3-starttime-endtime">
            <div className="page3-starttime">
                <label htmlFor="starttime">Starting Time</label>
                <input type="time" id="starttime" className="start-time text-input" value={starttime} onChange={(e) => setStartTime(e.target.value)}/>
            </div>
            <div className="page3-endtime">
                <label htmlFor="endtime">Ending TIme</label>
                <input type="time" id="endtime" className="end-time text-input" value={endtime} onChange={(e) => setEndTime(e.target.value)}/>
            </div>
        </div>

        <div className="page3-prizepool-placespool">
            <div className="page3-prizepool">
                <label htmlFor="prizpool">Total Prize Pool</label>
                <input type="number" id="prizepool" className="prize-pool text-input" placeholder="Total prize pool" value={prizepool} onChange={(e) => setPrizePool(e.target.value)} />
            </div>
            <div className="page3-placespool">
                <div className="first-prize-pool">
                    <center>
                    <p className="first-prize-medal medal">🥇</p>
                    </center>
                    <input type="number" className="first-prize-amount prize-amount-input" placeholder="first" value={firstprize} onChange={(e) => setFirstPrize(e.target.value)} />
                </div>
                <div className="first-prize-pool">
                    <center>
                    <p className="first-prize-medal medal">🥈</p>
                    </center>
                    <input type="number" className="first-prize-amount prize-amount-input" placeholder="second" value={secondprize} onChange={(e) => setSecondPrize(e.target.value)} />
                </div>
                <div className="first-prize-pool">
                    <center>
                    <p className="first-prize-medal medal">🥉</p>
                    </center>
                    <input type="number" className="first-prize-amount prize-amount-input" placeholder="third" value={thirdprize} onChange={(e) => setThirdPrize(e.target.value)} />
                </div>
            </div>
        </div>
        <div className="page3-tags">
            <label htmlFor="tags">Tags for the event</label>
            <input type="text" id="tags" className="tags text-input2" placeholder="Mention tags here like #Stipend Internships for Top Performers" value={tags} onChange={(e) => setTags(e.target.value)}/>
        </div>
        <div className="page3-noofcredits-typeofcredits">
            <div className="page3-noofcredits">
                <label htmlFor="noofcredits">Number of Credits</label>
                <input type="number" id="noofcredits" className="noofcredits text-input" placeholder="Number of credits" value={noofcredits} onChange={(e) => setNoOfCredits(e.target.value)} />
            </div>
            {/* add a label like type of credits create a dropdown list input for "EE", "EC", "UI" */}
            <div className="page3-typeofcredits">
                <label htmlFor="typeofcredits">Type of Credits</label>
                    <select
                    id="typeofcredits"
                    className="typeofcredits text-input"
                    value={typeofcredits}
                    onChange={(e) => setTypeOfCredits(e.target.value)}
                    >
                    <option value="">Select Type</option>
                    <option value="EE">EE</option>
                    <option value="EC">EC</option>
                    <option value="UI">UI</option>
                    </select>
            </div>
        </div>

        <div className="page3-clublogo-eventposter">
            <div className="page3-clublogo">
                <label htmlFor="clublogo">Club logo</label>
                <input type="file" id="clublogo" className="club-logo text-input" placeholder="Paste the link of logo"  onChange={handleUpload} />
            </div>
            <div className="page3-eventposter">
                <label htmlFor="eventposter">Event Poster</label>
                <input type="file" id="eventposter" className="event-poster text-input" placeholder="Paste the link of poster" onChange={handleUpload} />
            </div>
        </div>

         <div className="page3-eventdiscription">
            <label htmlFor="discription">Event Discription</label>
            <textarea id="discription" className="text-input2 discription" value={discription} onChange={(e) => setDiscription(e.target.value)} rows="5" ></textarea>
         </div>
         {/* first organizer details */}
         <div className="page3-organizername-contact">
            <div className="page3-organizername">
                <label htmlFor="organizername">Organizer Name</label>
                <input type="text" id="organizername" className="organizername text-input" placeholder="First organizer name" value={organizername1} onChange={(e) => setOrganizername1(e.target.value)}  />
            </div>
            <div className="page3-contact">
                <label htmlFor="contact">Contact Number</label>
                <input type="number" max={10} id="contact" className="contact text-input" placeholder="First contact number" value={contact1} onChange={(e) => setContact1(e.target.value)} />
            </div>
         </div>
         {/* second organizer details */}
         <div className="page3-organizername-contact">
            <div className="page3-organizername">
                <label htmlFor="organizername">Organizer Name</label>
                <input type="text" id="organizername" className="organizername text-input" placeholder="Second organizer name" value={organizername2} onChange={(e) => setOrganizername2(e.target.value)}  />
            </div>
            <div className="page3-contact">
                <label htmlFor="contact">Contact Number</label>
                <input type="number" max={10} id="contact" className="contact text-input" placeholder="Second contact number" value={contact2} onChange={(e) => setContact2(e.target.value)} />
            </div>
         </div>
         {/* third-organizer-details */}
         <div className="page3-organizername-contact">
            <div className="page3-organizername">
                <label htmlFor="organizername">Organizer Name</label>
                <input type="text" id="organizername" className="organizername text-input" placeholder="Third organizer name" value={organizername3} onChange={(e) => setOrganizername3(e.target.value)}  />
            </div>
            <div className="page3-contact">
                <label htmlFor="contact">Contact Number</label>
                <input type="number" max={10} id="contact" className="contact text-input" placeholder="Third contact number" value={contact3} onChange={(e) => setContact3(e.target.value)} />
            </div>
         </div>
         {/* photos upload */}
         <div className="page3-photos-upload">
                <div className="photo-upload-section">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 0)}
                    disabled={loading}
                    className="image-input"
                    />
                    {imageUrls[0] && <img src={imageUrls[0]} alt="Uploaded 1" width="250" className="profile-image"/>}
                </div>

                <div className="photo-upload-section">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 1)}
                    disabled={loading}
                    className="image-input"
                    />
                    {imageUrls[1] && <img src={imageUrls[1]} alt="Uploaded 2" width="250"  className="profile-image"/>}
                </div>

                <div className="photo-upload-section">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 2)}
                    disabled={loading}
                    className="image-input"
                    />
                    <center>
                    {imageUrls[2] && <img src={imageUrls[2]} alt="Uploaded 3" width="250" className="profile-image"/>}
                    </center>
                </div>
         </div>
         <div className="upload-event-btn-div">
            <center>
                <button className="upload-event-btn" onClick={handleUpdate} >Upload Event</button>
            </center>
         </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default UpdateEvent
