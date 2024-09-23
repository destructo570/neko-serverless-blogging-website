import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const CoverImageInput = ({
  coverImage,
  setCoverImage,
  setCoverImageError,
  coverImageError,
}) => {
  const [preview, setPreview] = useState(coverImage);
  const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

  // Handles file selection and converts it to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/webp")
    ) {
      const reader = new FileReader();

      // When the file is loaded, store the Base64 string and pass it to the parent
      reader.onloadend = () => {
        const base64String = reader.result;
        setCoverImageError(null); // Clear error
        setCoverImage(file); // Pass the Base64 string to the parent
        setPreview(base64String);
        // Check if the file is larger than 500KB
        if (file && file.size > MAX_FILE_SIZE) {
          setCoverImageError("File size exceeds the 500KB limit.");
          return;
        }
      };

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    } else {
      setCoverImageError("Please select a valid PNG or JPG file.");
    }
  };

  return (
    <div className="w-full max-w-[783px]">
      <Input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
        className="cursor-pointer hover:bg-zinc-100 mb-4 w-full"
        onChange={handleFileChange}
      />
      {coverImageError && (
        <p style={{ color: "red" }} className="mb-2">
          {coverImageError}
        </p>
      )}
      {coverImage ? (
        <Image
          src={preview}
          className="mb-4 rounded-xl"
          alt="Preview"
          width={900}
          height={500}
        />
      ) : null}
    </div>
  );
};

export default CoverImageInput;
