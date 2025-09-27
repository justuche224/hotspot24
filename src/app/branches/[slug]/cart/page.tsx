import BranchCart from "@/components/branch-cart";
import SectionHeader from "@/components/layout/SectionHeader";
import { getBranchBySlug } from "@/lib/branches";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MenuPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }
  return (
    <section className="py-12 space-y-10 pt-24 container max-w-7xl mx-auto px-2">
      <SectionHeader header={"Your Cart"} description={branch.address} />
      <BranchCart branch={branch} />
    </section>
  );
};

export default MenuPage;
