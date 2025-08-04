// src/components/ui/sidebar-buttons.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    data-sidebar="menu-button"
    className={cn(
      "flex h-10 w-full items-center gap-2 rounded-md px-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    size?: string
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-xs transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export { SidebarMenuButton, SidebarMenuSubButton }
