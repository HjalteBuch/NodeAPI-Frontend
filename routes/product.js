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

            let response = await tiny.get({"url": request});
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

router.get('/add', async (req, res, next) => {
    try {
        res.render('product',
            {
                "isListVisible": false,
                "isAdding": true,
                "detail": {
                    "name": "",
                    "productNumber": "",
                    "color": "Red",
                    "standardCost": 1,
                    "listPrice": 2
                }
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let request = url + `/${req.params.id}`;
        let response = await tiny.get({"url": request});
        let data = response.body.data;

        res.render('product',
            {
                "isVisible": false,
                "isAdding": false,
                "detail": data
            }
        );

    } catch (err) {
        next(err)
    }
});

router.post('/', async (req, res, next) => {
    try {
        let response = {};
        let product = req.body;
        let data = {
                "productID": product.productID,
                "name": product.name,
                "productNumber": product.productNumber,
                "color": product.color,
                "standardCost": product.standardCost,
                "listPrice": product.listPrice
            };
        if (product.isAdding != 'false') {
            // Insert product
            let arrayOfData = [data];
            response = await tiny.post({
                "url": url,
                "data": arrayOfData
            });
        } else {
            // Update product
            let request = url + `/${product.productID}`;
            response = await tiny.put({
                "url": request,
                "data": data
            });
        }

        res.redirect('/product');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
