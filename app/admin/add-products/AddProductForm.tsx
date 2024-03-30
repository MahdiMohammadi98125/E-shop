"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setProductCreated] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      image: [],
      reviews: "",
    },
  });

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setProductCreated(false);
      setImages(null);
    }
  }, [isProductCreated]);

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        return [...prev, value];
      }
      return [value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        return prev.filter((item) => item.color !== value.color);
      }
      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // upload images to firebase storage

    // setIsLoading(true);
    const uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      toast.error("Please select a category");
      return;
    }
    if (!data.images || data.images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    async function handleImageUploads() {
      toast.success("Creating products, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({ ...item, image: downloadURL });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((err) => {
                      console.log("Error getting the downloadURL");
                      reject(err);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error in uploading image", error);
        toast.error("Error in uploading image");
      }
    }
    // save product to db
    await handleImageUploads();
    const productData = {
      ...data,
      images: uploadedImages,
    };
    await axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created successfully");
        setProductCreated(true);
        router.refresh();
      })
      .catch((err) => {
        toast.error("Error while saving product to db!", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        errors={errors}
        id="name"
        label="Name"
        register={register}
        disabled={isLoading}
        required
        type="text"
      />

      <Input
        errors={errors}
        id="brand"
        label="Brand"
        register={register}
        disabled={isLoading}
        required
        type="text"
      />
      <Input
        errors={errors}
        id="price"
        label="Price"
        register={register}
        disabled={isLoading}
        required
        type="number"
      />
      <TextArea
        errors={errors}
        id="description"
        label="Description"
        register={register}
        disabled={isLoading}
        required
      />
      <CustomCheckbox
        id="inStock"
        label="this product is in stock"
        register={register}
        disabled={isLoading}
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3">
          {categories.map((item, index) => {
            if (item.label === "All") return;
            return (
              <CategoryInput
                icon={item.icon}
                label={item.label}
                onClick={(category) => {
                  setCustomValue("category", category);
                }}
                key={index}
                selected={category === item.label}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-wrap w-full gap-4">
        <div>
          <p className="font-bold">
            Select the avialable products color and upload their images.
          </p>
          <p className="text-sm">
            You must upload an image for each of color selected otherwise your
            color selection will be ignored.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              isProductCreated={isProductCreated}
              removeImageFromState={removeImageFromState}
            />
          ))}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add product"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
}
