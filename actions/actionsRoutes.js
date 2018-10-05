const express = require('express');

const router = express.Router();

const actionModel = require('../data/helpers/actionModel');

// ======================= ERROR HELPER ========================

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};

// ========================= ROUTES ============================

router.get('/', (req, res) => {
    actionModel
        .get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            return errorHelper(500, 'Database error: GET', res);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionModel
        .get(id)
        .then(action => {
            if (action === 0) {
                return errorHelper(404, `The action with the specified ID: ${id} does not exist.`, res);
            }
            res.status(200).json(action);
        })
        .catch(err => {
            return errorHelper(500, 'Database error: GET', res);
        });
});

router.post('/', (req, res) => {
    actionModel
        .insert(req.body)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            return errorHelper(500, 'Database error: POST', res);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionModel
        .remove(id)
        .then(deletedAction => {
            if(deletedAction === 0) {
                return errorHelper(404, `The action with the specified ID: ${id} does not exist.`, res);
            } else {
                res.status(201).json({ success: 'Action deleted' });
            }
        })
        .catch(err => {
            return errorHelper(500, 'The action could not be removed', res);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedAction = req.body;
    actionModel
        .update(id, updatedAction)
        .then(response => {
            if(response === 0) {
                return errorHelper(404, `The action with the specified ID: ${id} does not exist.`);
            } else {
                actionModel
                    .find(id)
                    .then(action => {
                        res.json(action);
                    })
                    .catch(err => {
                        return errorHelper(500, 'Database error: PUT', res);
                    });
            }
        })
        .catch(err => {
            return errorHelper(500, 'Database error: PUT', res);
        });
});

module.exports = router;