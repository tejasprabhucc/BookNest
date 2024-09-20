"use client";
import { Camera, FileImage } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IMember } from "@/src/lib/definitions";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import {} from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { UploadButton } from "@/src/utils/uploadthing";

const ProfileCard = ({ userData }: { userData: IMember }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUploadComplete = (res: any) => {
    console.log("Uploaded image:", res);
    if (res && res[0] && res[0].url) {
      setImageUrl(res[0].url);
    }
  };

  const handleUploadError = (error: Error) => {
    console.error("Error uploading image:", error);
    // You might want to show an error message to the user here
  };

  const handleConfirm = () => {
    setIsOpen(false);
    console.log("Confirming new profile image:", imageUrl);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={userData.image || ""} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full"
            onClick={() => setIsOpen(true)}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <Badge variant="secondary" className="mt-2">
            {userData.role.toUpperCase()}
          </Badge>
          {/* <p className="text-sm text-muted-foreground mt-2">
                Member since {new Date(userData.).toLocaleDateString()}
              </p> */}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 h-64 relative border-2 border-dashed border-gray-300 rounded-lg">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    fill
                    alt="Profile Picture Preview"
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-1 h-full">
                      <FileImage color="gray" />
                      <p className="text-gray-500">
                        Drag and drop an image here
                      </p>
                      <p className="text-sm text-gray-400">or</p>
                      <Button
                        variant="outline"
                        type="button"
                        className="px-4 py-2 rounded-md"
                      >
                        Choose File
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleConfirm} disabled={!imageUrl}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCard;
