import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const multiUpload = upload.fields([
    { name: "avatar", maxCount: 1 }, 
    { name: "resume", maxCount: 1 }, 
]);
console.log()
export default multiUpload; 