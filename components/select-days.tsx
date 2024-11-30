import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const SelectDay = ({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) => {
    return (
        <div className="grid gap-1 text-center">
            <Label className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
                <span>Day</span>
                <Select onValueChange={onValueChange} defaultValue={value}>
                    <SelectTrigger className="h-[48px] text-center font-mono text-base md:text-xl tabular-nums caret-transparent focus:bg-card focus:border-0 border-foreground/15 [&::-webkit-inner-spin-button]:appearance-none">
                        <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Monday</SelectItem>
                        <SelectItem value="2">Tuesday</SelectItem>
                        <SelectItem value="3">Wednesday</SelectItem>
                        <SelectItem value="4">Thursday</SelectItem>
                        <SelectItem value="5">Friday</SelectItem>
                        <SelectItem value="6">Saturday</SelectItem>
                        <SelectItem value="0">Sunday</SelectItem>
                    </SelectContent>
                </Select>
            </Label>
        </div>
    );
};