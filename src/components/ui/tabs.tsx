import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)
  const tabsListRef = React.useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsListRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150
      tabsListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  React.useEffect(() => {
    checkScroll()
    const handleResize = () => checkScroll()
    window.addEventListener("resize", handleResize)
    const tabsList = tabsListRef.current
    if (tabsList) {
      tabsList.addEventListener("scroll", checkScroll)
    }
    return () => {
      window.removeEventListener("resize", handleResize)
      if (tabsList) {
        tabsList.removeEventListener("scroll", checkScroll)
      }
    }
  }, [])

  return (
    <div className="relative flex items-center w-full">
      {canScrollLeft && (
        <button
          onClick={() => scrollTabs("left")}
          className="absolute left-0 z-10 p-1 bg-muted rounded-full shadow-sm hover:bg-muted/80 transition-colors sm:p-1.5"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
        </button>
      )}
      <TabsPrimitive.List
        ref={(node) => {
          tabsListRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(
          "inline-flex h-10 items-center w-full rounded-md bg-muted p-1 text-muted-foreground overflow-x-auto overflow-y-hidden scrollbar-none md:flex-wrap md:justify-around",
          className
        )}
        {...props}
      />
      {canScrollRight && (
        <button
          onClick={() => scrollTabs("right")}
          className="absolute right-0 z-10 p-1 bg-muted rounded-full shadow-sm hover:bg-muted/80 transition-colors sm:p-1.5"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
        </button>
      )}
      <style>{`
        .scrollbar-none {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1.5 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex-shrink-0 min-w-[70px] sm:min-w-[100px] sm:px-3 sm:text-sm md:flex-1",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }