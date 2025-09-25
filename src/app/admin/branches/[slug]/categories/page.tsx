import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getBranchBySlug, getCategories } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPublicFoodItems } from "@/actions";
import CategoriesActions from "@/components/admin/categories-actions";

interface CategoriesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/");
  }

  const branch = await getBranchBySlug((await params).slug);
  const categories = await getCategories(branch.id);

  // Get food items count for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const foodItems = await getPublicFoodItems(branch.id, category.id);
      return {
        ...category,
        foodItemsCount: foodItems.length,
      };
    })
  );

  const slug = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/branches/${slug.slug}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Branch
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground">
              Manage categories for {branch.name}
            </p>
          </div>
        </div>
        <Link href={`/admin/branches/${slug.slug}/categories/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      {categoriesWithCounts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create categories to organize your menu items
              </p>
              <Link href={`/admin/branches/${slug.slug}/categories/new`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first category
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoriesWithCounts.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>
                      {category.foodItemsCount} items
                    </CardDescription>
                  </div>
                  <CategoriesActions
                    categoryId={category.id}
                    branchSlug={slug.slug}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/admin/branches/${slug.slug}/categories/${category.id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Link
                    href={`/admin/branches/${slug.slug}/food-items?category=${category.id}`}
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Items
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
