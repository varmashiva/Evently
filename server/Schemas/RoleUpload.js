const mongoose = require("mongoose")


const RoleUploadSchema = new mongoose.Schema({
    clubLogo: {type: String, required: true},
    clubName: {type: String, required: true},
    availableRoles: {type: String}
})

const RoleUpload = mongoose.model("RoleUploaSchema", RoleUploadSchema, "clubHiring")
module.exports = RoleUpload