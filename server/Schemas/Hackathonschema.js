const mongoose = require("mongoose")

const HackathonSchema = new mongoose.Schema({
    clubName: {type:String, required: true},
    eventName: {type:String, required: true},
    eventLink: {type:String, required: true},
    fee: {type:Number, required: true},
    deadline: {type:String, required:true},
    startdate: {type: String, require:true},
    enddate: {type:String, required:true},
    eventlocation: {type: String, required: true},
    starttime: {type:String, required:true},
    endtime: {type:String, required:true},
    prizepool: {type: Number, required: true},
    firstprize: {type: Number, required: true},
    secondprize: {type: Number, required: true},
    thirdprize: {type: Number, required: true},
    tags: {type:String, required:true},
    noofcredits: {type: String, required: true},
    typeofcredits: {type: String, required: true},
    clublogo: {type:String, required: true},
    eventposter: {type:String, required: true},
    discription: {type:String, required: true},
    organizername1: {type: String, required: true},
    organizername2: {type: String, required: true},
    organizername3: {type: String, required: true},
    contact1: {type: Number, required: true},
    contact2: {type: Number, required: true},
    contact3: {type: Number, required: true},
    imageUrls: {type:Array, require: true},
});

const Hackathonschema = mongoose.model("HackathonSchema", HackathonSchema, "hackathons")
module.exports = Hackathonschema;
