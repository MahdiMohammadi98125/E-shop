"use client";
import ActionBtns from "@/app/components/ActionBtns";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import NullData from "../components/NullData";

interface OrderClientsProps {
  orders: ChangedOrder[];
}

type ChangedOrder = Order & {
  user: User;
};

export default function OrderClients({ orders }: OrderClientsProps) {
  const router = useRouter();
  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => ({
      id: order.id,
      customer: order.user.name,
      amount: formatPrice(order.amount / 100),
      paymentStatus: order.status,
      date: moment(order.createdDate).fromNow(),
      deliveryStatus: order.deliveryStatus,
    }));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "customer",
      headerName: "Customer name",
      width: 130,
    },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                color="text-slate-400"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status text="completed" icon={MdDone} color="text-green-700" />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                color="text-slate-400"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="completed"
                icon={MdRemoveRedEye}
                color="text-green-700"
              />
            ) : (
              <Status
                text="dispacthed"
                icon={MdDeliveryDining}
                color="text-purple-700"
              />
            )}
          </div>
        );
      },
    },

    { field: "date", headerName: "Date", width: 130 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4 mt-2">
            <ActionBtns
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mt-8 mb-4">
        <Heading title="Manage Orders" center />
      </div>
      {orders.length === 0 && <NullData title="No orders found!" />}
      {orders.length !== 0 && (
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
      )}
    </div>
  );
}
