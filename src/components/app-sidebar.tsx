"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Map,
  SquareTerminal,
  Home,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { getBranches } from "@/actions";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending, error } = authClient.useSession();

  const {
    data: branches,
    isPending: branchesPending,
    error: branchesError,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: () => getBranches(),
  });

  const data = {
    user: {
      name: isPending
        ? "Loading..."
        : error
        ? "Error"
        : session?.user?.name || "",
      email: isPending
        ? "Loading..."
        : error
        ? "Error"
        : session?.user?.email || "",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
        isActive: true,
        items: [
          {
            title: "Admin",
            url: "/admin",
          },
        ],
      },
      {
        title: "Branches",
        url: "/admin/branches",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "All Branches",
            url: "/admin/branches",
          },
          {
            title: "Add Branch",
            url: "/admin/branches/new",
          },
        ],
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "All Orders",
            url: "/admin/orders",
          },
        ],
      },
    ],
    projects: branchesPending
      ? []
      : branchesError
      ? []
      : branches?.data?.map((branch) => ({
          name: branch.name,
          url: `/admin/branches/${branch.slug}`,
          icon: Map,
          items: [
            {
              title: "Categories",
              url: `/admin/branches/${branch.slug}/categories`,
            },
            {
              title: "Food Items",
              url: `/admin/branches/${branch.slug}/food-items`,
            },
          ],
        })),
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
