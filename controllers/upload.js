const path = require("path");
const multer = require("multer");
const imageHistory = require("../models/imageHistory");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const {originalname} = file;
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const maxSize = 1 * 1000 * 10000; //10 MB size image

const upload = multer({
    storage,
    limits: {fileSize: maxSize},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single("image");

//check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;

    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype) return cb(null, true);
    else {
        cb("error: Images Only");
    }
}

const uploadScreen = (req, res) => {
    try{
        res.render("upload");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }  
}

const uploadHandle = (req, res) => {
    //return res.json({"upload # of files successfully": req.files.length});
    try{
        upload(req, res, (error) => {
            if (error || (req.file == undefined)) {
                console.log("upload uncorrect");
                res.render("upload");
            } else {
                storeUserImage (req.user.id, req.user.email, req.file.filename);
                res.render("../views/partials/afterUpload"); 
            }
        })
    } catch (error) {
        console.log(err);
        res.status(400).send("error");
    }
    
};

function storeUserImage (id, useremail, imagename) {

    imageHistory.findOne({ useremail: useremail })
                .then(user => {
                    if (user) {
                        console.log("user exists");
                        const query = { useremail: useremail };
                        const updateDocument = {
                          $addToSet: { imagename: imagename }
                        };
                        imageHistory.findOneAndUpdate(query, updateDocument, {returnNewDocument: true}, function(error, result) {
                            if (error) {
                                console.log(error);
                                throw error;
                            } 
                            else console.log("upload success")
                        });
                    } else {
                        const newHistory = new imageHistory({
                            _id: id,
                            useremail: useremail,
                            imagename: imagename
                        });
                    
                        newHistory.save()
                            .then(item => {
                                //res.render("../views/partials/afterUpload"); 
                                console.log("store in db success")
                            })
                            .catch (err => console.log(err));
                    }
                })
}

module.exports = {uploadScreen, uploadHandle};