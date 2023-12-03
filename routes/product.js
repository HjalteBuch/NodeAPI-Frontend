const router = require('express').Router();

const tiny = require('tiny-json-http');

const url = 'http://localhost:3000/api/product';

router.get('/', async (req, res, next) => {
    try {
        let response = await tiny.get({
            "url": url
        });
        let data = response.body.data;
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

router.get('/search/', async (req, res, next) => {
    try {
        let search = {
            "name": req.query.searchName,
            "listPrice": req.query.searchListPrice
        };
        if (search.name || search.listPrice) { 
            let request = url;
            if (search.name && search.listPrice) {
                request += `/search?name=${search.name}&listPrice=${search.listPrice}`;
            }
            if (search.name && !search.listPrice) {
                request += `/search?name=${search.name}`;
            }
            if (!search.name && search.listPrice) {
                request += `/search?listPrice=${search.listPrice}`;
            }
            console.log("request: ");
            console.log(request);

            let response = await tiny.get({"url": request});
            console.log("response: ");
            console.log(response);
            let data = response.body.data;
            res.render('product',
                {
                    "isListVisible": true,
                    "search": search,
                    "data": data,
                    "costAsCurrency": function () {
                        return new Number(this.standardCost).toLocalString("en-US",
                            { "style": "currency", "currencty": "USD" });
                    },
                    "priceAsCurrencty": function () {
                        return new Number(this.listPrice).toLocalString("en-us",
                            { "style": "currency", "currencty": "USD" });
                    }
                });
        }
        else {
            res.redirect('/product');
        }
    } catch (err) {
        next(err)
    }
});

module.exports = router;
