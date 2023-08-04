const express = require('express');
const path = require('path');
const pages = require('./common').getPages();

const app = express();
app.set('view engine', 'ejs');
app.use('/', express.static(path.resolve(__dirname, 'public')));

// Load all pages
for (const pageName in pages) {
    app.get(`/${(pageName === 'root') ? '' : pageName}`, (req, res) => {
        res.render(`pages/${pages[pageName].template}`, pages[pageName].options);
    });
}

// Start server
app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});