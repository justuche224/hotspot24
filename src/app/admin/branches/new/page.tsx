import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import BranchForm from "@/components/admin/branch-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewBranchPage = async () => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Branch</h1>
        <p className="text-muted-foreground">
          Add a new restaurant branch to your system
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Branch Information</CardTitle>
          <CardDescription>
            Fill in the details for your new branch location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BranchForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewBranchPage;
