// import React from "react"
// import { cn } from "../../lib/utils"
// import { TableLoader } from "../ui/loader";

// export const Table = React.forwardRef(({ className, ...props }, ref) => (
//   <div className="relative w-full overflow-auto">
//     <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
//   </div>
// ))
// Table.displayName = "Table"

// export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
//   <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
// ))
// TableHeader.displayName = "TableHeader"

// export const TableBody = React.forwardRef(({ className, ...props }, ref) => (
//   <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
// ))
// TableBody.displayName = "TableBody"

// export const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
//   <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
// ))
// TableFooter.displayName = "TableFooter"

// export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
//   <tr
//     ref={ref}
//     className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
//     {...props}
//   />
// ))
// TableRow.displayName = "TableRow"

// export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
//   <th
//     ref={ref}
//     className={cn(
//       "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
//       className,
//     )}
//     {...props}
//   />
// ))
// TableHead.displayName = "TableHead"

// export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
//   <td
//     ref={ref}
//     className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
//     {...props}
//   />
// ))
// TableCell.displayName = "TableCell"

import React from "react";
import { cn } from "../../lib/utils";
import { TableLoader } from "../ui/loader";

export const Table = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props}>
      {children}
    </table>
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(
  ({ className, loading, children, loaderColSpan = 8, ...props }, ref) => {
    const isEmpty = !loading && React.Children.count(children) === 0;

    return (
      <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
      >
        {loading ? (
          <TableRow>
            <TableCell colSpan={loaderColSpan} className="text-center">
              <TableLoader />
            </TableCell>
          </TableRow>
        ) : isEmpty ? (
          <TableRow>
            <TableCell colSpan={loaderColSpan} className="text-center text-muted-foreground">
              No data available
            </TableCell>
          </TableRow>
        ) : (
          children
        )}
      </tbody>
    );
  }
);
TableBody.displayName = "TableBody";


export const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";
