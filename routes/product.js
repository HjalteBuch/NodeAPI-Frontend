const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('product.mustache',
        {
            "data": [
                {
                    "productID": 354,
                    "name": "Long-Sleeve Logo Jersey, L"
                },
                {
                    "productID": 356,
                    "name": "HL Road Frame - Red, 62"
                },
                {
                    "productID": 358,
                    "name": "HL Road Frame - Red, 48"
                }
            ]
        }
    )
});

module.exports = router;
