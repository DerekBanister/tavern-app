const router = require('express').Router();
const path = require('path');


//send homepage to root route
router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

module.exports = router;