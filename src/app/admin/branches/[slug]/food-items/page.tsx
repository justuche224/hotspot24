import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getBranchBySlug, getFoodItems } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import FoodItemsActions from "@/components/admin/food-items-actions";
import { getCategories } from "@/actions";

interface FoodItemsPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
}

const FoodItemsPage = async ({ params, searchParams }: FoodItemsPageProps) => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/login");
  }

  const branch = await getBranchBySlug((await params).slug);
  const categories = await getCategories(branch.id);
  const foodItems = await getFoodItems(
    branch.id,
    (
      await searchParams
    ).category
  );

  const foodItemsWithCategories = await Promise.all(
    foodItems.map(async (item) => {
      const category = categories.find((cat) => cat.id === item.categoryId);
      return {
        ...item,
        categoryName: category?.name || "Unknown Category",
      };
    })
  );

  const slug = await params;
  const searchParamsData = await searchParams;

  const selectedCategory = categories.find(
    (cat) => cat.id === searchParamsData.category
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/branches/${slug.slug}/categories`}>
            <Button size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Food Items</h1>
            <p className="text-muted-foreground">
              Manage menu items for {branch.name}
              {selectedCategory && ` - ${selectedCategory.name}`}
            </p>
          </div>
        </div>
        <Link href={`/admin/branches/${slug.slug}/food-items/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Food Item
          </Button>
        </Link>
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <Link href={`/admin/branches/${slug.slug}/food-items`}>
            <Button
              className={
                !searchParamsData.category ? "text-black" : "text-white"
              }
              variant={!searchParamsData.category ? "default" : "outline"}
              size="sm"
            >
              All Items
            </Button>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/admin/branches/${slug.slug}/food-items?category=${category.id}`}
            >
              <Button
                className={
                  searchParamsData.category === category.id
                    ? "text-black"
                    : "text-white"
                }
                variant={
                  searchParamsData.category === category.id
                    ? "default"
                    : "outline"
                }
                size="sm"
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
      )}

      {foodItemsWithCategories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No food items yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              {selectedCategory
                ? `No items found in ${selectedCategory.name} category`
                : "Create food items to build your menu"}
            </p>
            <Link href={`/admin/branches/${slug.slug}/food-items/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create your first food item
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foodItemsWithCategories.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {item.categoryName}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </div>
                  <FoodItemsActions
                    foodItemId={item.id}
                    branchSlug={slug.slug}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ₦{item.price.toLocaleString()}
                  </div>
                  <Link
                    href={`/admin/branches/${slug.slug}/food-items/${item.id}`}
                  >
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
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

export default FoodItemsPage;
