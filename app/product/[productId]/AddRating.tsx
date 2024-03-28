"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

export default function AddRating({ product, user }: AddRatingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { comment: "", rating: 0 },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("Please add a rating");
    }

    const ratingData = { ...data, product: product, userId: user?.id };
    await axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Review added");
        reset();
        router.refresh();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (!user || !product) {
    return null;
  }
  const deliveredOrder = user?.orders.some((order) =>
    order.products.find((item) => item.id === product.id)
  );
  const userReview = product.reviews.find(
    (review: Review) => review.userId === user?.id
  );
  if (userReview && !deliveredOrder) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Add a review" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <div>
        <Button
          label={isLoading ? "loading..." : "Add a review"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}
