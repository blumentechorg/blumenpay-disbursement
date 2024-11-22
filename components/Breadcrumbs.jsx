"use client";

// components/Breadcrumbs.js
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Keep only the last two segments
  const lastTwoSegments = pathSegments.slice(-2);

  return (
    <nav className="flex items-center space-x-1 text-xs">
      {lastTwoSegments.map((segment, index) => {
        // Capitalize the segment text
        const breadcrumbName =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={index} className="flex items-center space-x-1">
            {index > 0 && <span className="text-black">{">"}</span>}{" "}
            {/* Add '>' separator except for the first */}
            <span className="text-black">{breadcrumbName}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
