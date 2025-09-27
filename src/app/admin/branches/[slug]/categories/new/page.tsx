import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getBranchBySlug } from "@/actions";
import CategoryForm from "@/components/admin/category-form";
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

interface NewCategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const NewCategoryPage = async ({ params }: NewCategoryPageProps) => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/login");
  }

  const branch = await getBranchBySlug((await params).slug);

  const slug = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/branches/${slug.slug}/categories`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Category</h1>
          <p className="text-muted-foreground">
            Add a new category for {branch.name}
          </p>
        </div>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>
            Create a new category to organize menu items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm branchId={branch.id} branchSlug={slug.slug} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCategoryPage;
