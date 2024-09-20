import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getUserSession } from "@/src/lib/actions";

const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getUserSession();
  // Check if session exists and contains the email
  if (!session || !session.email) {
    throw new UploadThingError("Unauthorized");
  }

  return { email: session.email };
};

// FileRouter for your app
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // Return the email as metadata for later use
      return { email: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after the upload
      console.log("File URL:", file.url);

      // Return the email to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.email, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
