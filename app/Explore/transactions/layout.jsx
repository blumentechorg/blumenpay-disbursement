import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Search from "@/components/transactions/Search";
import Filter from "@/components/transactions/Filter";

const OverviewLayout = ({ children }) => {
  return (
    <>
      <div>
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className=" border-r min-h-screen sticky top-0 pr-5 ">
            <Filter />
          </div>
          <div className="flex-1 flex flex-col min-h-screen pl-5 ">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-10">
              <Breadcrumbs />
              <Breadcrumb />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 pt-5 bg-gray-100 ">
              <Search />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewLayout;
