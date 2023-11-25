import prismadb from "@/lib/prismadb";

interface GraphData {
    name: string;
    pv: number;
}

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const monthlyRevenue: { [key: number]: number } = {};
    
    // Grouping the orders by month and summing the revenue
    for (const order of paidOrders) {
        const month = order.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
        let revenueForOrder = 0;
        
        for (const item of order.orderItems) {
            revenueForOrder += item.product.price.toNumber();
        }
        
        // Adding the revenue for this order to the respective month
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    // Converting the grouped data into the format expected by the graph
    const graphData: GraphData[] = [
        { name: "Jan", pv: 0 },
        { name: "Feb", pv: 0 },
        { name: "Mar", pv: 0 },
        { name: "Apr", pv: 0 },
        { name: "May", pv: 0 },
        { name: "Jun", pv: 0 },
        { name: "Jul", pv: 0 },
        { name: "Aug", pv: 0 },
        { name: "Sep", pv: 0 },
        { name: "Oct", pv: 0 },
        { name: "Nov", pv: 0 },
        { name: "Dec", pv: 0 },
    ];

    // Filling in the revenue data
    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].pv = monthlyRevenue[parseInt(month)];
    }

    return graphData;
};