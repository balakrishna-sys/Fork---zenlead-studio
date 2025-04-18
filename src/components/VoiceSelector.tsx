
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

const voices = [
  { value: "aria", label: "Aria (Female)" },
  { value: "roger", label: "Roger (Male)" },
  { value: "sarah", label: "Sarah (Female)" },
  { value: "charlie", label: "Charlie (Male)" },
  { value: "george", label: "George (Male)" },
  { value: "river", label: "River (Non-binary)" },
  { value: "liam", label: "Liam (Male)" },
  { value: "charlotte", label: "Charlotte (Female)" },
  { value: "alice", label: "Alice (Female)" },
  { value: "matilda", label: "Matilda (Female)" },
  { value: "will", label: "Will (Male)" },
  { value: "jessica", label: "Jessica (Female)" },
  { value: "daniel", label: "Daniel (Male)" },
];

export const VoiceSelector = ({ 
  onChange,
  label = "Select voice",
  placeholder = "Select a voice..."
}: { 
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? voices.find((voice) => voice.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search voices..." />
            <CommandEmpty>No voice found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {voices.map((voice) => (
                <CommandItem
                  key={voice.value}
                  value={voice.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onChange?.(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === voice.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {voice.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
