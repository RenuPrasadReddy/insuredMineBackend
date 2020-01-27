const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    dob: String,
    address: String,
    phone: String,
    state: String,
    zip: String,
    email: String,
    gender: String,
    gender: String

});
const User = mongoose.model("User", userSchema);
//-------

const agentSchema = new Schema({
    agent: String
});
const Agent = mongoose.model("Agent", agentSchema);

//-------

const userAccountSchema = new Schema({
    accountName: String
});
const UserAccount = mongoose.model("UserAccount", userAccountSchema);

//-------

const lobSchema = new Schema({
    category_name: String
});
const LOB = mongoose.model("LOB", lobSchema);
//-------

const policyCarrierSchema = new Schema({
    company_name: String
});
const PolicyCarrier = mongoose.model("PolicyCarrier", policyCarrierSchema);

const policyInfoSchema = new Schema({
    policy_mode: String,
    policy_start_date: String,
    policy_end_date: String,
    companyId: String,
    userId: String
});
const PolicyInfo = mongoose.model("PolicyInfo", policyInfoSchema);

const messageSchema = new Schema({
    message: String,
    dateAndTime: Date
});
const Message = mongoose.model("Message", messageSchema);

const scheduledMessageSchema = new Schema({
    message: String,
    dateAndTime: Date
});
const ScheduledMessageSchema = mongoose.model("ScheduledMessageSchema", scheduledMessageSchema);


module.exports = { User, Agent, UserAccount, LOB, PolicyCarrier, PolicyInfo, Message, ScheduledMessageSchema };