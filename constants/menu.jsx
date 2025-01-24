// src/constants/menus.js

import Overview from "@/public/icons/sidebar/overview";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Tickets from "@/public/icons/sidebar/tickets";
import Admin from "@/public/icons/sidebar/admin";
import Providers from "@/public/icons/sidebar/providers";
import Logout from "@/public/icons/sidebar/logout";

export const MENU_ITEMS = [
  {
    name: "Overview",
    href: "/Explore/overview/",
    roles: ["SuperAdmin", "transaction management"],
    icon: <Overview />,
  },
  {
    name: "Transactions",
    href: "/Explore/transactions/",
    roles: ["SuperAdmin", "transaction management"],
    icon: <Transactions />,
  },
  {
    name: "Disbursements",
    href: "/Explore/disbursements/",
    roles: ["SuperAdmin", "settlement management"],
    icon: <Disbursements />,
  },
  {
    name: "Business",
    href: "/Explore/providers",
    roles: ["SuperAdmin", "app management"],
    icon: <Providers />,
  },
  {
    name: "Complain Tickets",
    href: "/Explore/tickets/",
    roles: ["SuperAdmin", "customer management"],
    icon: <Tickets />,
  },
  {
    name: "Admin",
    href: "/Explore/admin/",
    roles: ["SuperAdmin", "team management"],
    icon: <Admin />,
  },
];
