import { Button } from "@/components/ui/button";

interface SizeSelectorProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

function SizeSelector({ sizes, onChange }: SizeSelectorProps) {
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      onChange(sizes.filter((s) => s !== size));
    } else {
      onChange([...sizes, size]);
    }
  };
  return (
    <div className="flex flex-wrap gap-3">
      {availableSizes.map((size) => (
        <Button
          type="button"
          key={size}
          variant={sizes.includes(size) ? "default" : "outline"}
          onClick={() => toggleSize(size)}
        >
          {size}
        </Button>
      ))}
    </div>
  );
}

export default SizeSelector;
