import {
    CartProductType,
    SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleSelectedImg: (value: SelectedImgType) => void;
}

export default function ProductImage({
  cartProduct,
  product,
  handleSelectedImg,
}: ProductImageProps) {
  return (
    <div className="grid grid-cols-6 gap-4 h-full min-h-[300px] sm:min-h-[400px] max-h-[500px]">
      <div className="flex flex-col items-center justify-center h-full gap-4 border cursor-pointer min-h-[300px] sm:min-h-[400px] max-h-[500px]">
        {product.images.map((image: SelectedImgType) => (
          <div
            key={image.color}
            className={`overflow-hidden aspect-square relative w-[80%] border-teal-300 ${
              cartProduct.selectedImg.color === image.color
                ? "border-[1.5px]"
                : "border-none"
            }`}
            onClick={() => handleSelectedImg(image)}
          >
            <Image
              src={image.image}
              alt={image.color}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="relative col-span-5 aspect-square ">
        <Image
          src={cartProduct.selectedImg.image}
          alt="product"
          fill
          className="w-full min-h-[300px] sm:min-h-[400px] max-h-[500px]"
        />
      </div>
    </div>
  );
}
