const express = require("express")
const router = express.Router()
const Event = require("./Schemas/FormSchema");
const Formschema = require("./Schemas/FormSchema");
const Hackathonschema = require("./Schemas/Hackathonschema")
const RoleUpload = require('./Schemas/RoleUpload')


router.get('/events', async(req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({ 
          success: true, 
          message: 'Events retrieved successfully',
          data: events
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to retrieve events',
          error: error.message
        });
      }
})
router.get('/hackathons', async(req, res) => {
  try {
      const events = await Hackathonschema.find({});
      res.status(200).json({ 
        success: true, 
        message: 'Events retrieved successfully',
        data: events
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve events',
        error: error.message
      });
    }
})

router.get('/hiring', async(req, res) => {
  try {
    const roles = await RoleUpload.find({})
    res.status(200).json({
      success: true,
      message: 'Events retrieved successfully',
      data: roles
    })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve events',
      error: err.message
    });
  }
})

router.post('/events', async (req, res) => {
    try {
      const eventData = req.body;
      
      const requiredFields = [
        'clubName',
        'eventName',
        'eventLink',
        'fee',
        'deadline',
        'startdate',
        'enddate',
        'eventlocation',
        'starttime',
        'endtime',
        'prizepool',
        'firstprize',
        'secondprize',
        'thirdprize',
        'tags',
        'noofcredits',
        'typeofcredits',
        'clublogo',
        'eventposter',
        'discription',
        'organizername1',
        'organizername2',
        'organizername3',
        'contact1',
        'contact2',
        'contact3',
        'imageUrls'
    ];    
      
      for (const field of requiredFields) {
        if (!eventData[field]) {
          return res.status(400).json({ 
            success: false, 
            message: `${field} is required`
          });
        }
      }
      const newEvent = await Event.create(eventData);
      res.status(201).json({ 
        success: true, 
        message: 'Event created successfully',
        data: newEvent 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create event',
        error: error.message
      });
    }
});
router.post('/hackathons', async (req, res) => {
  try {
    const eventData = req.body;
    
    const requiredFields = [
      'clubName',
      'eventName',
      'eventLink',
      'fee',
      'deadline',
      'startdate',
      'enddate',
      'eventlocation',
      'starttime',
      'endtime',
      'prizepool',
      'firstprize',
      'secondprize',
      'thirdprize',
      'tags',
      'noofcredits',
      'typeofcredits',
      'clublogo',
      'eventposter',
      'discription',
      'organizername1',
      'organizername2',
      'organizername3',
      'contact1',
      'contact2',
      'contact3',
      'imageUrls'
  ];    
    
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `${field} is required`
        });
      }
    }
    const newEvent = await Hackathonschema.create(eventData);
    res.status(201).json({ 
      success: true, 
      message: 'Event created successfully',
      data: newEvent 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create event',
      error: error.message
    });
  }
});

router.post('/roleupload', async (req, res) => {
  try {
    const roleData = req.body;

    const requiredFields = ['clubLogo', 'clubName', 'availableRoles']
    for (const field of requiredFields) {
      if (!roleData[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `${field} is required`
        });
      }
    }
    const newEvent1 = await RoleUpload.create(roleData);
    res.status(201).json({ 
      success: true, 
      message: 'Event created successfully',
      data: newEvent1
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to uplaod your role applicatin',
      error: err.message
    });
  }
})

router.patch('/events/:id/close', async (req, res) => {
    try {
      const eventId = req.params.id;
  
      // Find the event and update the `isclosed` status and `deadline` to 0
      const updatedEvent = await Event.findByIdAndUpdate(eventId, {
        isclosed: true,
        deadline: 0,  // Set the deadline to 0 to close it
      });
  
      if (!updatedEvent) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
  
      res.status(200).json({
        success: true,
        message: `Event closed successfully`,
        data: updatedEvent,  // Return the updated event
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to close event',
        error: error.message,
      });
    }
  });

  router.get('/update/:id', (req, res) => {
    const id = req.params.id;
    Formschema.findById(id)
    .then(event => {
        if (!event) {
            return res.status(400).json({ error: "Event not found" });
        }
        res.json(event);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      });

  })

  router.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    Formschema.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
  })
  
  router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { 
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
    } = req.body;
  
    Formschema.findByIdAndUpdate(id, { 
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
    .then(event => {
      if (!event) {
        return res.status(400).json({ error: "Event not found" });
      }
      res.json(event);
    })
    .catch(err => {
      console.error("Error while updating event:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });
  

module.exports = {FormRouter: router};