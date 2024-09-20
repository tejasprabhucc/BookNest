"use client";
import { UploadButton } from "@/src/utils/uploadthing";
import React from "react";
import { UploadDropzone } from "@uploadthing/react";

import { OurFileRouter } from "@/src/app/api/uploadthing/core";

const ImageUploadButton = () => {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <UploadButton
        className="bg-blue-400 p-5 rounded"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUploadButton;
