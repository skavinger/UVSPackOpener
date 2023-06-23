const express = require('express')
const app = express()
const port = 403

var helpers = require('./public/javascripts/helpers.js').helpers;

app.use(express.static('public'))

app.get('/', function(req, res) {
    var header = helpers.getHeader();
    var footer = helpers.getFooter();
    var setList = helpers.getSetsBoxes();
    var page = "";
    page += header.css; 
    page += setList.css;
    page += footer.css;
    page += header.body;
    page += setList.body;
    page += footer.body
    res.send(page);
}.bind(this));

app.get('/packOpener/:setname/:packCount', function(req, res) {
    var header = helpers.getHeader();
    var footer = helpers.getFooter();
    var setList = helpers.getPacks(req.params.setname, req.params.packCount);
    var page = "";
    page += header.css; 
    page += setList.css;
    page += footer.css;
    page += header.body;
    page += setList.body;
    page += footer.body
    res.send(page);
}.bind(this));


app.listen(port, () => {
    
})
