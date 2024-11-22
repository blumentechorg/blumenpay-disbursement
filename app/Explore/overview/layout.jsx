import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const OverviewLayout = ({ children }) => {
  return (
    <>
      <div>
        <div className="flex">
          {/* Sticky Sidebar */}

          <div className="flex-1 flex flex-col min-h-screen">
            {/* Sticky Navbar */}

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 pt-5 bg-gray-100 ">
              <Breadcrumbs />
              <Breadcrumb />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewLayout;
