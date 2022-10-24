const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;
const {shortenUrl, isValidURL} = require("./helpers.js");

// contains all the link objects. refer to shortenUrl in helpers.js
let links = [];

app.set('view engine', 'pug');
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index', {try_shorten: false});
});

app.get('/shorten', (req, res) => {
    res.redirect('/');
});

function checkUrlValidity(req, res, next) {
    req.body.isValid = false;
    if (isValidURL(req.body.url)) {
        req.body.isValid = true;
    }
    next();
}

app.post('/shorten', checkUrlValidity, (req, res) => {
    const template_data = {try_shorten: true, isvalid: false};
    if (req.body.isValid) {
        let shortened_url = shortenUrl(req.body.url);

        // even though its unlikely we should still check if there's a saved link with the same ID
        // as this newly generated one before inserting into links array
        while (links.filter(l => l.id === shortened_url.id).length > 0) {
            shortened_url = shortenUrl(req.body.url);
        }
        links = [...links, shortened_url];

        template_data.isvalid = true;
        template_data.orig_link = req.body.url;
        template_data.shortened_link = shortened_url.id;
    }
    else {
        template_data.isvalid = false;
    }
    res.render('index', template_data);
});

// redirects the user from the short link to the original link
// returns 404 the link does not exist
app.get('/rd/:rd_id', (req, res) => {
    const rd_id = req.params.rd_id;
    let surl = links.filter(shortened_url => shortened_url.id === rd_id);
    if (surl.length > 0) {
        res.redirect(surl[0].link);
    }
    else {
        res.render(404, 'not_found');
    }
});

app.listen(port, () => {
    console.log("app is listening on port", port);
});