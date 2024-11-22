import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dsearch from "@/components/disbursements/Dsearch";
import TFilter from "@/components/transactions/TFilter";
import Label from "@/components/disbursements/Label";

const OverviewLayout = ({ children }) => {
  return (
    <>
      <div>
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className=" border-r min-h-screen sticky top-0  ">
            <TFilter />
          </div>
          <div className="flex-1 flex flex-col min-h-screen pl-5 ">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-10 space-y-2">
              <Breadcrumbs />
              <Breadcrumb />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pt-5 space-y-4 bg-gray-100 ">
              <Label />
              <Dsearch />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewLayout;
