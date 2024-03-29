import moment from "moment";
import prisma from "@/libs/prismadb";

export default async function getGraphData() {
  try {
    // get the start and end date for the range (7days ago to today)
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");
    // Query the database to get order data grouped by createdDate

    const result = await prisma.order.groupBy({
      by: ["createdDate"],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    // Initialize an object to aggregate to data by day
    const aggregatedData: {
      [day: string]: {
        day: string;
        date: string;
        totalAmount: number;
      };
    } = {};

    // create a clone of the start date to iterate over each of day
    const currentDate = startDate.clone();
    // iterate over each day in the date range
    while (currentDate <= endDate) {
      // format the day as string
      const day = currentDate.format("dddd");
      console.log("day<<<<", day, currentDate);

      //   initialize aggeraged data for the day with the day, data and totalAmount
      aggregatedData[day] = {
        day,
        date: currentDate.format("yyyy-MM-dd"),
        totalAmount: 0,
      };
      //   Move to the next day
      currentDate.add(1, "day");
    }

    //   Calculate the total amount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createdDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    //   Convert the aggregated data to an array  and start it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    //   return the formatted data
    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
