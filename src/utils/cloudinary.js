// import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });


const uploadOnCloundinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await
            cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary", response);

        // unlink files in local path 
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


export { uploadOnCloundinary }