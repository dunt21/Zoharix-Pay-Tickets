"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadError = exports.uploadFields = exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});
exports.uploadSingle = upload.single('image');
exports.uploadMultiple = upload.array('images', 5);
exports.uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]);
const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
            return;
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            res.status(400).json({ message: 'Too many files uploaded.' });
            return;
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            res.status(400).json({ message: 'Unexpected file field.' });
            return;
        }
    }
    if (error.message === 'Only image files are allowed!') {
        res.status(400).json({ message: error.message });
        return;
    }
    next(error);
};
exports.handleUploadError = handleUploadError;
//# sourceMappingURL=uploadMiddleware.js.map