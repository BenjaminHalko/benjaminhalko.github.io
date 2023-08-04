const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const pages = require('./common').getPages();

// Function to compile ejs templates
function compile(filename, options, buildFolder) {
    console.log("Compiling " + buildFolder + " template");
    if (buildFolder == 'root') buildFolder = '';
    const templatePath = path.resolve(__dirname, './views/pages/', filename + '.ejs');
    const templateStr = fs.readFileSync(templatePath, 'utf8');
    const htmlString = ejs.compile(templateStr, {filename: templatePath})(options);

    fs.mkdirSync(path.resolve(__dirname,"build",buildFolder), {recursive: true});
    fs.writeFileSync(path.resolve(__dirname,"build",buildFolder,'index.html'), htmlString);
}

// Copy static files
function copyStatic() {
    console.log("Copying static files");
    fs.cpSync(path.resolve(__dirname, './public'), path.resolve(__dirname, './build'), {recursive: true});
}

// Compile all templates
for (const pageName in pages) {
    compile(pages[pageName].template, pages[pageName].options, pageName);
}

// Copy static files
copyStatic();