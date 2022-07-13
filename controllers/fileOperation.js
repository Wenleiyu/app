const fs = require("fs");

const readfile = (inputFile) => {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
};

const createfile = (filename, content) => {
    fs.writeFile(filename, content, (err) => {
        if (err) throw err;
        console.log('file created');
    })
}

const deletefile = (filename) => {
    fs.unlink(filename, (err) => {
        if (err) throw err;
        console.log("file deleted");
    })
}

const updatefile = (filename, content) => {
    fs.appendFile(filename, content, (err) => {
        if (err) throw err;
        console.log('Append operation complete');
    })
}

module.exports = {readfile, createfile, deletefile, updatefile};
