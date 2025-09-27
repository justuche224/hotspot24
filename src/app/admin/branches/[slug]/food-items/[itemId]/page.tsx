import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getBranchBySlug, getCategories } from "@/actions";
import FoodItemForm from "@/components/admin/food-item-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditFoodItemPageProps {
  params: Promise<{
    slug: string;
    itemId: string;
  }>;
}

const EditFoodItemPage = async ({ params }: EditFoodItemPageProps) => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/login");
  }

  const branch = await getBranchBySlug((await params).slug);
  const categories = await getCategories(branch.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/branches/${(await params).slug}/food-items`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Food Items
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Food Item</h1>
          <p className="text-muted-foreground">
            Update food item information for {branch.name}
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Food Item Information</CardTitle>
          <CardDescription>
            Update the details for this menu item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FoodItemForm
            branchId={branch.id}
            branchSlug={(await params).slug}
            categories={categories}
            foodItemId={(await params).itemId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditFoodItemPage;
