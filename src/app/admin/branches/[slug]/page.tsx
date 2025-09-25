import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getBranchBySlug, getCategories, getFoodItemsCount } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Edit,
  Plus,
  Package,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";

interface BranchDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BranchDetailPage = async ({ params }: BranchDetailPageProps) => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/");
  }

  const branch = await getBranchBySlug((await params).slug);
  const categories = await getCategories(branch.id);

  // Get food items count for this branch
  const foodItemsCount = await getFoodItemsCount(branch.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/branches">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Branches
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{branch.name}</h1>
          <p className="text-muted-foreground">
            Manage branch content and settings
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage content for {branch.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href={`/admin/branches/${branch.slug}/categories`}>
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <ListOrdered className="h-6 w-6" />
                <span>Manage Categories</span>
                <Badge variant="secondary" className="text-xs">
                  {categories.length} categories
                </Badge>
              </Button>
            </Link>

            <Link href={`/admin/branches/${branch.slug}/food-items`}>
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <Package className="h-6 w-6" />
                <span>Manage Food Items</span>
                <Badge variant="secondary" className="text-xs">
                  {foodItemsCount} items
                </Badge>
              </Button>
            </Link>

            <Link href={`/admin/branches/${branch.slug}/categories/new`}>
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <Plus className="h-6 w-6" />
                <span>Add Category</span>
              </Button>
            </Link>

            <Link href={`/admin/branches/${branch.slug}/food-items/new`}>
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <Plus className="h-6 w-6" />
                <span>Add Food Item</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Branch Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Branch Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{branch.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{branch.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{branch.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">WhatsApp:</span>
              <Badge variant="secondary">{branch.whatsapp}</Badge>
            </div>
            <div className="pt-4">
              <Link href={`/admin/branches/${branch.slug}`}>
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Branch Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Categories:
                </span>
                <span className="font-medium">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Food Items:
                </span>
                <span className="font-medium">{foodItemsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="font-medium">
                  {new Date(branch.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Last Updated:
                </span>
                <span className="font-medium">
                  {new Date(branch.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Categories */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Categories</CardTitle>
            <CardDescription>
              Latest categories for {branch.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category) => (
                <div key={category.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{category.name}</h4>
                    <Link
                      href={`/admin/branches/${branch.slug}/food-items?category=${category.id}`}
                    >
                      <Button variant="ghost" size="sm">
                        View Items
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Created {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BranchDetailPage;
