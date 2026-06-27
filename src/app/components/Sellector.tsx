import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: "IN_PROGRESS" | "DONE";
  onChange: (value: "IN_PROGRESS" | "DONE") => void;
};

const Sellector = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Status.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
          <SelectItem value="DONE">DONE</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Sellector;
