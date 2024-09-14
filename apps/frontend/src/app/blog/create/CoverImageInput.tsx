import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const CoverImageInput = ({
  coverImage,
  setCoverImage,
  setCoverImageError,
  coverImageError,
}) => {
  const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

  // Handles file selection and converts it to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();

      // When the file is loaded, store the Base64 string and pass it to the parent
      reader.onloadend = () => {
        const base64String = reader.result;
        setCoverImageError(null); // Clear error
        setCoverImage(base64String); // Pass the Base64 string to the parent

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
    <div>
      <Input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        className="cursor-pointer hover:bg-zinc-100"
        onChange={handleFileChange}
      />
      {coverImageError && <p style={{ color: 'red' }}>{coverImageError}</p>}
      <Image
        src={coverImage}
        className="my-4 rounded-xl"
        alt="Preview"
        width={900}
        height={500}
      />
    </div>
  );
};

export default CoverImageInput;