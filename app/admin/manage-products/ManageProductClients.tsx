"use client";
import ActionBtns from "@/app/components/ActionBtns";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import firebaseApp from "@/libs/firebase";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

interface ManageProductClientsProps {
  products: Product[];
}

export default function ManageProductClients({
  products,
}: ManageProductClientsProps) {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      images: product.images,
    }));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.inStock === true ? (
              <Status
                text="In stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Out of stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4 mt-2">
            <ActionBtns
              icon={MdCached}
              onClick={() => {
                handleToggleInStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtns
              icon={MdDelete}
              onClick={() => {
                handleDeleteProduct(params.row.id, params.row.images);
              }}
            />
            <ActionBtns
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleInStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", { id, inStock: !inStock })
      .then(() => {
        toast.success("Product status changed successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  }, []);

  const handleDeleteProduct = useCallback(async (id: string, images: any[]) => {
    toast.success("Deleting product please wait...");
    // delete images from the firebase storage
    async function deleteImages() {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("image deleted");
          }
        }
      } catch (error) {
        console.log("Error deleting image from Firebase Storage: ", error);
      }
    }
    await deleteImages();
    // delete product from the mongo db
    axios
      .delete(`/api/product/${id}`)
      .then(() => {
        toast.success("Product deleted successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mt-8 mb-4">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
