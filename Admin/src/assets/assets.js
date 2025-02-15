import { Home, LayoutDashboard, Settings, User, ShoppingCart } from "lucide-react";

export const sidemenu = [
  {
    title: "Home",
    icon: LayoutDashboard,  // Store the component, not JSX
    path: "/",
  },
  {
    title: "Menu",
    icon: ShoppingCart,
    path: "/menu",
  },
  {
    title: "Order",
    icon: User,
    path: "/order",
  },
  {
    title: "Analytics",
    icon: Settings,
    path: "/analytics",
  },
  {
    title: "Something",
    icon: Home,
    path: "/something",
  },
];
