import multer from "multer";

const storage = multer.diskStorage({
    limits: { 
        fileSize: 10 * 1024 * 1024 //10MB Limit
    },
    destination: (req, file, cb) => {
        return cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

export default upload