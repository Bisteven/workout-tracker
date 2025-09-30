const express = require('express');
const router = express.Router();


const v1Routes = require('./v1');

router.get('/', (req, res) => {
    res.json({
        "message": "Workout Tracker API",
        "versions": ["v1"],
        "endpoints": {
          "v1": "/api/v1"
        }
      });

});

// Montar versión v1
router.use('/v1', v1Routes);

// Endpoint de demo de cabeceras
router.get('/headers-demo', (req, res) => {
    const contentType = req.get('Content-Type');
    const auth = req.get('Authorization');
    // Cabecera personalizada opcional
    const apiKey = req.get('X-API-Key');

    res.set('X-Service', 'WorkoutTracker');
    res.status(200).json({ contentType, auth, apiKey });
});

module.exports = router;