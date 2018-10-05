const express = require('express');

const router = express.Router();

const projectModel = require('../data/helpers/projectModel');

// ======================= ERROR HELPER ========================

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};

// ========================= ROUTES ============================
router.get('/', (req, res) => {
    projectModel
        .get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            return errorHelper(500, 'Database error: GET', res);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectModel
        .get(id)
        .then(project => {
            if (project === 0) {
                return errorHelper(404, `The project with the specified ID: ${id} does not exist.`, res);
            }
            res.status(200).json(project);
        })
        .catch(err => {
            return errorHelper(500, 'Database error: GET', res);
        });
});

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    projectModel
        .getProjectActions(id)
        .then(actions => {
            if (actions === 0) {
                return errorHelper(404, `Action for the project by that ID: ${id} not found`, res);
            }
            res.status(200).json(actions);
        })
        .catch(err => {
            return errorHelper(500, 'Database error: GET', res);
        });
});

router.post('/', (req, res) => {
    projectModel
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
    projectModel
        .remove(id)
        .then(deletedProject => {
            if(deletedProject === 0) {
                return errorHelper(404, `The project with the specified ID: ${id} does not exist.`, res);
            } else {
                res.status(201).json({ success: 'Project deleted' });
            }
        })
        .catch(err => {
            return errorHelper(500, 'The project could not be removed', res);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    projectModel
        .update(id, updatedProject)
        .then(response => {
            if(response === 0) {
                return errorHelper(404, `The project with the specified ID: ${id} does not exist.`);
            } else {
                projectModel
                    .find(id)
                    .then(project => {
                        res.json(project);
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