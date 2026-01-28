import multer from "multer";

export const upload = multer({
    dest: "uploads",
})

export const removeUploadedFile = (path: string) => {
    const fs = require("fs");
    fs.unlink(path, (err: any) => {
        if (err) {
            console.log("error : ", err)
        }
    });
}