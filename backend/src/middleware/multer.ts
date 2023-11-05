import multer from 'multer';
import path from 'path';

const uploadPath = path.join(__dirname, '..', 'upload');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
