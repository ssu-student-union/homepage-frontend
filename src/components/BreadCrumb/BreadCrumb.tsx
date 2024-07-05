import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadCrumbItemType } from "@/types/breadcrumb";
import { Link } from "react-router-dom";

interface BreadCrumbProps {
  items: BreadCrumbItemType[];
}

export function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="font-[#7E7E7E]">
        {items.map((item, index) =>
          items.length - 1 > index ? (
            <>
              <BreadcrumbItem key={item.label}>
                <BreadcrumbLink>
                  <Link to={item.link}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <BreadcrumbPage className="font-[#7E7E7E]">
              {item.label}
            </BreadcrumbPage>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
