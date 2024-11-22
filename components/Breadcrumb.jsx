"use client";

// components/Breadcrumbs.js
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Get only the last segment
  const lastSegment = pathSegments.slice(-1)[0];

  // Capitalize the last segment text
  const breadcrumbName = lastSegment
    ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    : "";

  return (
    <nav className="flex items-center space-x-2  text-black font-bold text-xl">
      {lastSegment && (
        <span>{breadcrumbName}</span> // Only render the last path
      )}
    </nav>
  );
};

export default Breadcrumbs;
