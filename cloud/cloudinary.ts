import { Cloudinary } from "@cloudinary/url-gen";

export const cloud = new Cloudinary({
    cloud: {
        cloudName: process.env.EXPO_PUBLIC_CLOUD_NAME,
    },
    url: {
        secure: true,
    },
});

export const options = {
    upload_preset: process.env.EXPO_PUBLIC_UPLOAD_PRESET,
    unsigned: true,
};

