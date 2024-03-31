import { ImageType } from "@/app/admin/add-products/AddProductForm";
import React, { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (image: ImageType) => void;
  removeImageFromState: (image: ImageType) => void;
  isProductCreated: boolean;
}

export default function SelectColor({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}: SelectColorProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item]
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);
      if (!e.target.checked) {
        removeImageFromState(item);
        setFile(null);
      }
    },
    [item, removeImageFromState]
  );

  return (
    <div className="grid items-center grid-cols-1 p-2 overflow-y-auto  border-b-[1.2px] border-slate-200">
      <div className="flex items-center gap-2 h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="flex items-center justify-between col-span-2 gap-2 text-sm">
            <p>{file.name}</p>
            <div className="w-[70px]">
              <Button
                outline
                small
                label="Cancel"
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
}
