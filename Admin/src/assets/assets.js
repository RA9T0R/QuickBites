import { Home, LayoutDashboard, ShoppingCart, PackagePlus, CookingPot, ChartLine, UserPlus,Users 
  ,Star,Beef,Salad,GlassWater,Cake,Cookie
 } from "lucide-react";
import upload2 from "./picture/upload.jpg"
import upload from "./picture/upload2.png"

export const assets = {upload}

export const menu_list = [
  {
      menu_name: "Recommend",
      menu_image: Star,
      color: 'text-violet-500'
  },
  {
      menu_name: "MainDish",
      menu_image: Beef,
      color: 'text-orange-500'
  },
  {
      menu_name: "Healthy",
      menu_image: Salad,
      color: 'text-green-500'
  },
  {
      menu_name: "Drinks",
      menu_image: GlassWater,
      color: 'text-red-500'
  },
  {
      menu_name: "Dessert",
      menu_image: Cake,
      color: 'text-pink-500'
  },
  {
      menu_name: "Appitizer",
      menu_image: Cookie,
      color: 'text-yellow-500'
  }
]

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
    title: "Sales Analytics",
    icon: ChartLine,
    path: "/analytics",
    role: "admin"
  },
  {
    title: "Employee List",
    icon: Users ,
    path: "/list_employee",
    role: "admin"
  },
  {
    title: "Add Employee",
    icon: UserPlus,
    path: "/add_employee",
    role: "admin"
  },
  
];
