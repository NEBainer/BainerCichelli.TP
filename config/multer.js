import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, path.join(__dirname, '../public/images/'))
    },
    filename: function(req, file, cd){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extesion = path.extname(file.originalname);
        cd(null, file.fieldname + '-' + uniqueSuffix + extesion);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;