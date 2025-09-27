import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getBranches } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Phone, Mail, Edit } from "lucide-react";
import Link from "next/link";
import BranchesActions from "@/components/admin/branches-actions";

const BranchesPage = async () => {
  const user = await serverAuth();
  if (!user || user.role !== "admin") {
    return redirect("/login");
  }

  const result = await getBranches();
  const branches = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Branches</h1>
          <p className="text-muted-foreground">
            Manage your restaurant branches
          </p>
        </div>
        <Link href="/admin/branches/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Branch
          </Button>
        </Link>
      </div>

      {branches.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No branches yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first branch
            </p>
            <Link href="/admin/branches/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create your first branch
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <Card key={branch.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{branch.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {branch.description}
                    </CardDescription>
                  </div>
                  <BranchesActions branchId={branch.id} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {branch.address}
                  </span>
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
                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/admin/branches/${branch.slug}`}
                    className="flex-1"
                  >
                    <Button variant="default" size="sm" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Manage Branch
                    </Button>
                  </Link>
                  <Link href={`/admin/branches/${branch.slug}/categories`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Categories
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

export default BranchesPage;
