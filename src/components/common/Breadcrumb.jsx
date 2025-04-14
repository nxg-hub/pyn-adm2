// import { Link } from "react-router-dom"
// import { ChevronRight } from "lucide-react"
//
// export function Breadcrumb({ items }) {
//   return (
//     <nav className="flex" aria-label="Breadcrumb">
//       <ol className="flex items-center space-x-2">
//         {items.map((item, index) => {
//           const isLast = index === items.length - 1
//
//           return (
//             <li key={item.url} className="flex items-center">
//               {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
//
//               {isLast ? (
//                 <span className="font-medium text-foreground">{item.label}</span>
//               ) : (
//                 <Link to={item.url} className="text-muted-foreground hover:text-foreground transition-colors">
//                   {item.label}
//                 </Link>
//               )}
//             </li>
//           )
//         })}
//       </ol>
//     </nav>
//   )
// }


import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export function Breadcrumb({ items = [] }) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={item.url} className="flex items-center">
                            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}

                            {isLast ? (
                                <span className="font-medium text-foreground">{item.label}</span>
                            ) : (
                                <Link to={item.url} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
