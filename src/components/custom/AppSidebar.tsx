import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SidebarFooterComponent from "./SidebarFooter"; 

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <img src="/favicon.ico" alt="Logo" width={30} height={30} />
        <Button className="mt-5">
          <MessageCircleCode /> New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterComponent />
    </Sidebar>
  );
}