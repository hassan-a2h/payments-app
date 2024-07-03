const router = require('express').Router();

//  Account Routes  
router.get('/', async (req, res) => {
  return res
    .status(200)
    .json('Account route is working');
});

module.exports = router;