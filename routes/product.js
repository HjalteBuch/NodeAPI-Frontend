const router = require('express').Router();

const tiny = require('tiny-json-http');

const url = 'http://localhost:3000/api/product';

router.get('/', async (req, res, next) => {
    try {
        let response = await tiny.get({
            "url": url
        });
        let data = response.body.data;
        console.log(data);
        res.render('product',
            {
                "isListVisible": true,
                "data": data,
                "costAsCurrency": function () {
                    return new Number(this.standardCost).toLocalString("en-US",
                        { "style": "currency", "currencty": "USD" });
                },
                "priceAsCurrencty": function () {
                    return new Number(this.listPrice).toLocalString("en-us",
                        { "style": "currency", "currencty": "USD" });
                }
            }
        );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
