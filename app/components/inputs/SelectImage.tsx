"use client";
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

export default function SelectImage({
  item,
  handleFileChange,
}: SelectImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
  });
  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center p-2 text-sm font-normal border-2 border-dashed border-slate-200 text-slate-400"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="cursor-pointer">+ {item?.color} Image</p>
      )}
    </div>
  );
}
