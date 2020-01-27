const router = require('express').Router();
const {User, Agent, PolicyInfo} = require('../models/all.model')

// API to provide aggregated policy by each user.
router.route('/agent/:agentName').get((req, res) => {
    Agent.countDocuments({ agent: req.params.agentName })
        .then(count => {
            res.json(count)
        });
});

// Search API to find policy info with the help of username.
router.route('/username/:userName').get((req, res) => {
    console.log('req.params.userName:', req.params.userName);
    User.find({ firstname: req.params.userName })
        .then((data) => {
            const id=  data[0]._id;
            // console.log("id:", data._id);
            PolicyInfo.find({userId: id})
            .then(policyInfo => res.json(policyInfo))
           
        })
        .catch(err => res.send(400))
})

module.exports = router;