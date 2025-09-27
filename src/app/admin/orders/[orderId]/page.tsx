import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getOrderDetails, getBranches, updateOrderStatus } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CheckCircle,
  XCircle,
  Package,
  ArrowLeft,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/login");;
  }

  const { order, orderItems } = await getOrderDetails((await params).orderId);
  const branches = await getBranches();

  const branch = branches.data?.find((b) => b.id === order.branchId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "processing":
        return "secondary";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      case "delivered":
        return "default";
      default:
        return "default";
    }
  };

  const handleStatusUpdate = async (formData: FormData) => {
    "use server";
    const status = formData.get("status") as string | null;
    if (!status) {
      toast.error("Status is required");
      return;
    }
    try {
      await updateOrderStatus(
        (
          await params
        ).orderId,
        status as
          | "pending"
          | "processing"
          | "completed"
          | "delivered"
          | "cancelled"
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={
                  getStatusColor(order.status) as
                    | "default"
                    | "secondary"
                    | "destructive"
                }
              >
                {getStatusIcon(order.status)}
                <span className="ml-1 capitalize">{order.status}</span>
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-bold text-lg">
                ₦{order.totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span>{new Date(order.updatedAt).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{order.customerPhone}</p>
                <p className="text-sm text-muted-foreground">Phone Number</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{order.customerAddress}</p>
                <p className="text-sm text-muted-foreground">
                  Delivery Address
                </p>
              </div>
            </div>

            {branch && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Branch:</span>
                <span className="font-medium">{branch.name}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">
                    {item.foodItemName || "Unknown Item"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} × ₦{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₦{(item.quantity * item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Order Status</CardTitle>
          <CardDescription>Change the status of this order</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleStatusUpdate} className="flex items-center gap-4">
            <Select name="status" defaultValue={order.status}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Update Status</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
