const router = require('express').Router();
const moment = require('moment');
const CronJob = require('cron').CronJob;
const { Message, ScheduledMessageSchema } = require('../models/all.model')

moment().format();
// const {User, Agent, PolicyInfo} = require('../models/all.model')

// API to provide aggregated policy by each user.
router.route('/').post((req, res) => {
    // Agent.countDocuments({ agent: req.params.agentName })
    //     .then(count => {
    //         res.json(count)
    //     });

    // const hour=moment(req.body.DateAndTime).get('hour');
    // const min=moment(req.body.DateAndTime).get('minute');

    // const day=moment(req.body.DateAndTime).format('DD');
    //  const month=moment(req.body.DateAndTime).format('MM')
    // const year = moment(req.body.DateAndTime).format('YYYY')

    // // const date = moment(req.body.DateAndTime).format('DD-MM-YYYY')
    // //  const date = new Date(moment(req.body.DateAndTime).format(" DD MM YYYY, h:mm:ss a"));
    //  const date = new Date(moment(req.body.DateAndTime).format(" DD MM YYYY, h:mm:ss a"));

    //  moment(req.body.DateAndTime).format(" DD MM YYYY, h:mm:ss a")
    //   console.log("msg and date in server:", new Date());
    const date = new Date(req.body.dateAndTime);


    console.log("msg and date in server:", date, new Date());

    const newMessage = new Message({
        message: req.body.message,
        dateAndTime: date
    });
    newMessage.save((err, result) => {
        if (!err) {
            res.json('Message will be saved..');
        }
    })
    // date.setSeconds(date.getSeconds()+3);

    new CronJob('*/1 * * * * ', function () {
        console.log("indise cron")
        // let docs = Message.find({}).toArray();
        Message.find({}, function (err, docs) {
            if (err) {
                res.send(err);
                return;
            }
            console.log("docs:", docs);

            for (i = 0; i < docs.length; i++) {
                console.log('inside for:', docs[i], new Date())
                if (docs[i].dateAndTime === new Date()) {
                    const msg = new ScheduledMessageSchema({
                        message: docs[i].name,
                        dateAndTime: docs[i].dateAndTime
                    })
                    msg.save((err, res) => {
                        console.log('msg saving:',docs[i]);
                        if (!err) {
                            res.send(200);
                        }
                    })
                }
            }

        });

        // console.log("staring cron...", docs);
    }, null, true, 'America/Los_Angeles');


    //  res.json("backed up")
});

module.exports = router;