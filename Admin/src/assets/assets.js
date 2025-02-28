import { Home, LayoutDashboard, ShoppingCart, PackagePlus, CookingPot, ChartLine, UserPlus,Users } from "lucide-react";
import upload from "./picture/upload.jpg"

export const assets = {upload}

export const sidemenu = [
  {
    title: "Home",
    icon: LayoutDashboard,  // Store the component, not JSX
    path: "/",
    role: "all"
  },
  {
    title: "View Menu",
    icon: ShoppingCart,
    path: "/view_menu",
    role: "all"
  },
  {
    title: "Create Menu",
    icon: PackagePlus,
    path: "/create",
    role: "admin"
  },
  {
    title: "Order",
    icon: CookingPot,
    path: "/order",
    role: "all"
  },
  {
    title: "Analytics",
    icon: ChartLine,
    path: "/analytics",
    role: "admin"
  },
  {
    title: "Add Employee",
    icon: UserPlus,
    path: "/add_employee",
    role: "admin"
  },
  {
    title: "List Employee",
    icon: Users ,
    path: "/list_employee",
    role: "admin"
  },
];
