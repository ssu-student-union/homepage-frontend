import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/libs/utils";
import { cva } from "class-variance-authority";

const PaginationContainer = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
PaginationContainer.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("cursor-pointer select-none", className)}
    {...props}
  />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLinkVariants = cva("rounded-xs h-8 w-8", {
  variants: {
    variant: {
      active:
        "bg-[#EBEBEB] text-paginationText text-xl font-medium hover:bg-accent rounded-sm",
      default:
        "hover:bg-accent text-paginationText text-xl font-medium rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean;
}

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      PaginationLinkVariants({
        variant: isActive ? "active" : "default",
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("px-2", className)}
    {...props}
  >
    <ChevronLeft className="size-5 stroke-1" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("px-2", className)}
    {...props}
  >
    <ChevronRight className="size-5 stroke-1" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationTenPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous 10 pages"
    className={cn("px-2", className)}
    {...props}
  >
    <ChevronsLeft className="size-5 stroke-1" />
  </PaginationLink>
);
PaginationTenPrevious.displayName = "PaginationPrevious";

const PaginationTenNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next 10 pages"
    className={cn("px-2", className)}
    {...props}
  >
    <ChevronsRight className="size-5 stroke-1" />
  </PaginationLink>
);
PaginationTenNext.displayName = "PaginationPrevious";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
};
