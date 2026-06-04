import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadProps {
  images: Array<{ preview: string; file: File; public_alt?: string }>;
  onChange: (
    images: Array<{ preview: string; file: File; public_alt?: string }>,
  ) => void;
}

function ImageUpload({ images, onChange }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const allImages = [...images];
    if (images[index].preview.startsWith("blob:")) {
      URL.revokeObjectURL(images[index].preview);
    }
    allImages.splice(index, 1);
    onChange(allImages);
  };
  return (
    <div>
      <div className="grid grid-cols-5 gap-5 mb-5">
        {images.map((image, i) => (
          <div className="relative w-40 h-40" key={i}>
            <img
              className="object-cover w-full h-full rounded-md"
              src={image.preview}
              alt={`Preview - ${i + 1}`}
            />
            <Button
              className="absolute top-1 right-1 rounded-full h-8 w-8 cursor-pointer opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center bg-red-500 text-white border-none"
              type="button"
              onClick={() => removeImage(i)}
            >
              <X size={30} />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="cursor-pointer"
        variant={"outline"}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        Upload Images
      </Button>
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default ImageUpload;
