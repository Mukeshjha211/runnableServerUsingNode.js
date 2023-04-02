const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=>{
    
    res.send('<h1>Heading Here</h1>');
})

module.exports = router;