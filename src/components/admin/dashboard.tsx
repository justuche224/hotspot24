"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBranches, getAllOrders } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import { Package, MapPin, ShoppingCart, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Dashboard = () => {
  const { data: branches } = useQuery({
    queryKey: ["branches"],
    queryFn: () => getBranches(),
  });

  const { data: orders } = useQuery({
    queryKey: ["all-orders"],
    queryFn: () => getAllOrders(),
  });

  const totalBranches = branches?.data?.length || 0;
  const totalOrders = orders?.length || 0;
  const pendingOrders =
    orders?.filter((order) => order.status === "pending").length || 0;
  const completedOrders =
    orders?.filter((order) => order.status === "completed").length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your delivery system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Branches
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBranches}</div>
            <p className="text-xs text-muted-foreground">Active branches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Orders
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your restaurant system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/branches/new">
                <Button
                  className="w-full h-20 flex-col gap-2"
                  variant="outline"
                >
                  <MapPin className="h-6 w-6" />
                  <span>Add New Branch</span>
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button
                  className="w-full h-20 flex-col gap-2"
                  variant="outline"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>View All Orders</span>
                </Button>
              </Link>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Manage Content</h4>
                <div className="space-y-4">
                  <Link href="/admin/branches">
                    <Button variant="outline" size="sm" className="w-full">
                      All Branches
                    </Button>
                  </Link>
                  {branches?.data && branches.data.length > 0 && (
                    <>
                      <Link
                        href={`/admin/branches/${branches.data[0].slug}/categories`}
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          {branches.data[0].name} Categories
                        </Button>
                      </Link>
                      <Link
                        href={`/admin/branches/${branches.data[0].slug}/food-items`}
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          {branches.data[0].name} Food Items
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">System Overview</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Branches:
                    </span>
                    <span className="font-medium">{totalBranches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Orders:</span>
                    <span className="font-medium">{totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending:</span>
                    <span className="font-medium">{pendingOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">{completedOrders}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders && orders.length > 0 ? (
                <div className="space-y-2">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerPhone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₦{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No orders yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branches</CardTitle>
              <CardDescription>Your restaurant branches</CardDescription>
            </CardHeader>
            <CardContent>
              {branches?.data && branches.data.length > 0 ? (
                <div className="space-y-2">
                  {branches.data.slice(0, 5).map((branch) => (
                    <div
                      key={branch.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div>
                        <p className="font-medium">{branch.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {branch.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {branch.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No branches yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
