import BranchMenu from "@/components/branch-menu";
import SectionHeader from "@/components/layout/SectionHeader";
import { getBranchBySlug } from "@/lib/branches";
import { notFound } from "next/navigation";

const MenuPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }
  return (
    <section className="py-12 space-y-10 pt-24 container mx-auto px-2">
      <SectionHeader header={branch.name} description={branch.description} />
      <BranchMenu branch={branch} />
    </section>
  );
};

export default MenuPage;
