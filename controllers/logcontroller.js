let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validatesession');
let Log = require('../db').import('../models/log');

/***post a log***/
router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

/***get all logs****/
router.get("/", (req, res) => {
    Log.findAll()
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

/***get log entries by user id */
router.get("/:id", validateSession, (req, res) => {
    let id = req.params.id
    Log.findAll({
        where: { id: id }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/***update log***/
router.put("/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

/***delete log***/
router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.destroy(query)
        .then(() => res.status(200).json({ message: "Log(s) Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router

// {
//     "description": "weights",
//     "definition": "Heavy weights, building muscles",
//     "result": "Did alot of them",
//     "user_id": 1
// }