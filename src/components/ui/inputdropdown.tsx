import * as React from "react"
import * as InputDropDownPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/libs/utils"

const InputDropDown = InputDropDownPrimitive.Root

const InputDropDownGroup = InputDropDownPrimitive.Group

const InputDropDownValue = InputDropDownPrimitive.Value

const InputDropDownTrigger = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <InputDropDownPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex min-h-[58px] w-full rounded-md border border-black bg-background px-[20px] py-[16px] text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:border-black focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-[#9CA3AF]",
      className
    )}
    {...props}
  >
    {children}
    <InputDropDownPrimitive.Icon asChild>
      <ChevronDown className="ml-auto h-4 opacity-50" />
    </InputDropDownPrimitive.Icon>
  </InputDropDownPrimitive.Trigger>
))
InputDropDownTrigger.displayName = InputDropDownPrimitive.Trigger.displayName


const InputDropDownScrollUpButton = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <InputDropDownPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </InputDropDownPrimitive.ScrollUpButton>
))
InputDropDownScrollUpButton.displayName = InputDropDownPrimitive.ScrollUpButton.displayName

const InputDropDownScrollDownButton = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <InputDropDownPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </InputDropDownPrimitive.ScrollDownButton>
))
InputDropDownScrollDownButton.displayName =
  InputDropDownPrimitive.ScrollDownButton.displayName

const InputDropDownContent = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <InputDropDownPrimitive.Portal>
    <InputDropDownPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <InputDropDownScrollUpButton />
      <InputDropDownPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] "
        )}
      >
        {children}
      </InputDropDownPrimitive.Viewport>
      <InputDropDownScrollDownButton />
    </InputDropDownPrimitive.Content>
  </InputDropDownPrimitive.Portal>
))
InputDropDownContent.displayName = InputDropDownPrimitive.Content.displayName

const InputDropDownLabel = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.Label>
>(({ className, ...props }, ref) => (
  <InputDropDownPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
InputDropDownLabel.displayName = InputDropDownPrimitive.Label.displayName

const InputDropDownItem = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <InputDropDownPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center ">
      <InputDropDownPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </InputDropDownPrimitive.ItemIndicator>
    </span>

    <InputDropDownPrimitive.ItemText>{children}</InputDropDownPrimitive.ItemText>
  </InputDropDownPrimitive.Item>
))
InputDropDownItem.displayName = InputDropDownPrimitive.Item.displayName

const InputDropDownSeparator = React.forwardRef<
  React.ElementRef<typeof InputDropDownPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof InputDropDownPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <InputDropDownPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted ", className)}
    {...props}
  />
))
InputDropDownSeparator.displayName = InputDropDownPrimitive.Separator.displayName

export {
  InputDropDown,
  InputDropDownGroup,
  InputDropDownValue,
  InputDropDownTrigger,
  InputDropDownContent,
  InputDropDownLabel,
  InputDropDownItem,
  InputDropDownSeparator,
  InputDropDownScrollUpButton,
  InputDropDownScrollDownButton,
}
