require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const router = require('express').Router();

//API for User login

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // This directory should exist in your project
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
//     },
//   });

// let upload = multer({ storage:storage});

// const uploadPhoto = async (req, res) => {
    // console.log(req.file)
    //  const userId=req.params.id;
    // const photo = req.file;

    // try{
    //     const user=await User.findById(id);

    //     if(!user)
    //     {
    //         return res.status(404).json({msg:"User not found"})
    //     }
    //     else{
    //         user.photo=photo;
    //         res.status(200).json({msg:"Photo saved successfully", data:user})
    //     }
    // }
    // catch{
    //     // console.log(error)
    //     return res.status(500).json({msg:"Something went wrong!"})
    // }

// }


// module.exports = { uploadPhoto};


// const multerPhotos = () => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });

//   const upload = multer({ storage: storage }).single('photo1'); // Change to single('photo1') to handle only one photo with the field name 'photo1'

//   return (req, res, next) => {
//     console.log("hwyyy")
//     upload(req, res, function (err) {
//       if (err) {
//         // Handle the error
//         return res.status(400).json({ message: 'Failed to upload the photo' });
//       }
//       console.log("calling")
//       return res.status(200).json({ message: 'uploaded the photo' });
//     });
//   };
// };

// module.exports = {multerPhotos};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });


router.route('/add/:id').post(upload.single('photo'), async(req, res) => {
  console.log(req.file)
     const userId=req.params.id;
    const photo = req.file.filename;

    try{
        const user=await User.findById(userId);

        if(!user)
        {
            return res.status(404).json({msg:"User not found"})
        }
        else{
            user.photo=photo;
            res.status(200).json({msg:"Photo saved successfully", data:user})
        }
    }
    catch{
        // console.log(error)
        return res.status(500).json({msg:"Something went wrong!"})
    }
  })

module.exports = router;

// const upload=multer({storage: multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.filename + "-" + Date.now() + ".jpeg");
//   }
// })
// }).single("photo")

// module.exports={upload}