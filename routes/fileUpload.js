const router = require('express').Router();
const multer = require('multer');
const { loadData } = require('../LoadDataFromFile');
const { User, Agent, UserAccount, LOB, PolicyCarrier, PolicyInfo } = require('../models/all.model')


//take cares of storing file to public folder and
//then reading file from public path, extracting data and saving to db
router.route('/').post((req, res) => {
    console.log("file upload")
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname )


        }
    })
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        fileUploaded= true;
        loadDataFromFile(fileUploaded)
        return res.status(200).send(req.file)

    })
})

function loadDataFromFile(fileUploaded){
    loadData(fileUploaded).then(async (data) => {
        // console.log("data,", data[0])
        for (i = 0; i < data.length; i++) {
            try {
                let resAgent = await saveAgent(data[i]);
                if (resAgent != 'fail') {
                    let resUser = await saveUser(data[i]);
                    if (resUser != 'fail') {
                        let ressa = await saveUserAccount(data[i]);
                        if (ressa != 'fail') {
                            let resLob = await saveLob(data[i]);
                            if (resLob != 'fail') {
                                let respc = await savePolicyCarrier(data[i]);
                                if (respc != 'fail') {
                                    let respi = await savePolicyInfo(data[i], respc, resUser);
                                    if (respi != 'fail') {
                                        console.log('full data saved for i:', i)
                                    }
                                }
                            }
                        }
    
                    }
                }
            } catch (err) {
                console.log('error:', err);
            }
    
        }
    
    });
}

function saveAgent(data) {
    return new Promise((resolve, reject) => {
        // console.log('agent name:', data[i].agent);
        newAgent = new Agent({
            agent: data.agent
        });
        newAgent.save((err, agentResult) => {
            console.log("agent saved", agentResult);
            if (!err)
                resolve(agentResult._id);
            else
                reject("fail");
        })
    })

}

function saveUser(data) {
    return new Promise((resolve, reject) => {
        newUser = new User({
            firstname: data.firstname,
            dob: data.dob,
            address: data.address,
            phone: data.phone,
            state: data.state,
            zip: data.zip,
            email: data.email,
            gender: data.gender,
            gender: data.gender
        });
        newUser.save((err, userResult) => {
            // userId = userResult._id;
            console.log("user saved", userResult);
            if (!err)
                resolve(userResult._id);
            else
                reject('fail');
        })
    })

}

function saveUserAccount(data) {

    return new Promise((resolve, reject) => {
        userAccount = new UserAccount({
            accountName: data.account_name
        });

        userAccount.save((err, userAccResult) => {
            console.log("user Acc saved", userAccResult);
            if (!err)
                resolve(userAccResult._id);
            else
                reject('fail');
        })
    })

}

function saveLob(data) {
    return new Promise((resolve, reject) => {
        newLob = new LOB({
            category_name: data.category_name
        })

        newLob.save((err, lobResult) => {
            {
                if (!err)
                    resolve(lobResult._id);
                else
                    reject(err);
            }
        })
    })
}

function savePolicyCarrier(data) {
    return new Promise((resolve, reject) => {
        newPolicyCarrier = new PolicyCarrier({
            company_name: data.company_name
        })

        newPolicyCarrier.save((err, policyCarrierResult) => {
            {
                if (!err)
                    resolve(policyCarrierResult._id);
                else
                    reject(err);
            }
        })
    })
}

function savePolicyInfo(data, companyId, userId) {
    return new Promise((resolve, reject) => {
        newPolicyInfo = new PolicyInfo({
            policy_mode: data.policy_mode,
            policy_start_date: data.policy_start_date,
            policy_end_date: data.policy_end_date,
            companyId: companyId,
            userId: userId
        })

        newPolicyInfo.save((err, policyInfoResult) => {
            {
                if (!err)
                    resolve(policyInfoResult._id);
                else
                    reject(err);
            }
        })
    })
}
module.exports= router;
