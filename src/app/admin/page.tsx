import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import React from "react";
import Dashboard from "@/components/admin/dashboard";

const page = async () => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/");
  }
  return <Dashboard />;
};

export default page;
