import multer from "multer";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
  secure: true,
});

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single("image");

async function uploadImageToCloud(file) {
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(file, {
      resource_type: "auto",
      transformation: [
        {
          width: 300,
          height: 300,
          aspect_ratio: "1:1",
          crop: "fill_pad",
          gravity: "auto",
        },
      ],
    });

    const uploadedImageInfo = {
      publicId: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    };

    return uploadedImageInfo;
  } catch (error) {
    throw error;
  }
}

async function deleteImageInCloud(publicId) {
  try {
    const deletedImage = await cloudinary.v2.uploader.destroy(publicId);

    return deletedImage;
  } catch (error) {
    throw error;
  }
}

async function processImage(req, res, next) {
  try {
    if (!req.file) {
      return next();
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cloudInfo = await uploadImageToCloud(dataURI);

    req.file.publicId = cloudInfo.publicId;

    req.file.url = cloudInfo.url;

    return next();
  } catch (error) {
    return next(error);
  }
}

export { multerUploads, processImage, deleteImageInCloud, uploadImageToCloud };
