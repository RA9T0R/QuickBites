import { Home, LayoutDashboard, ShoppingCart, PackagePlus, CookingPot, ChartLine, UserPlus} from "lucide-react";
import upload from "./picture/upload.jpg"

export const assets = {upload}

export const sidemenu = [
  {
    title: "Home",
    icon: LayoutDashboard,  // Store the component, not JSX
    path: "/",
  },
  {
    title: "View Menu",
    icon: ShoppingCart,
    path: "/view_menu",
  },
  {
    title: "Create Menu",
    icon: PackagePlus,
    path: "/create",
  },
  {
    title: "Order",
    icon: CookingPot,
    path: "/order",
  },
  {
    title: "Analytics",
    icon: ChartLine,
    path: "/analytics",
  },
  {
    title: "Add Employee",
    icon: UserPlus,
    path: "/add_employee",
  },
];
