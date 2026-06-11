import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState("#000000");

  const addColor = () => {
    if (!colors.includes(inputColor)) {
      onChange([...colors, inputColor]);
    }
  };

  const removeColor = (color: string) => {
    onChange(colors.filter((c) => c !== color));
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        <Input
          type="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className="w-40 h-10"
        />
        <Button type="button" onClick={addColor}>
          Add Color
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-2">
        {colors.map((color) => (
          <div
            key={color}
            className="flex items-center gap-2 my-4 p-2 border rounded"
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>{color}</span>
            <div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeColor(color)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
