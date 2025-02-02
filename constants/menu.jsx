// src/constants/menus.js

import Overview from "@/public/icons/sidebar/overview";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Tickets from "@/public/icons/sidebar/tickets";
import Admin from "@/public/icons/sidebar/admin";
import Providers from "@/public/icons/sidebar/providers";

export const MENU_ITEMS = [
  {
    name: "Admin",
    href: "/admin",
    icon: <Admin />,
    roles: ["Admin", "teamMgt"], // add the roles that should have access
  },
  {
    name: "Overview",
    href: "/overview",
    icon: <Overview />,
    roles: ["transactionMgt"], // add the roles that should have access
  },
  {
    name: "Transaction",
    href: "/transaction",
    icon: <Transactions />,
    roles: ["transactionMgt"],
  },
  {
    name: "Disbursement",
    href: "/disbursement",
    icon: <Disbursements />,
    roles: ["settlementMgt"],
  },
  {
    name: "Business",
    href: "/business",
    icon: <Providers />,
    roles: ["appMgt"],
  },
  {
    name: "Complain Ticket",
    href: "/complaints",
    icon: <Tickets />,
    roles: ["customerMgt"],
  },
];
