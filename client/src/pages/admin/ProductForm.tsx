import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createProductSchema, type CreateProductInput } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import ColorPicker from "./ColorPicker";
import SizeSelector from "./SizeSelector";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  initialData?: any;
  isLoading: boolean;
  onSubmit: (data: CreateProductInput) => void;
}

function ProductForm({ initialData, isLoading, onSubmit }: ProductFormProps) {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      instock_count: 0,
      category: "",
      size: [],
      color: [],
      images: [],
      is_new_arrival: false,
      is_feature: false,
      rating_count: 0,
    },
  });
  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-name">Product Name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-name"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Description */}
        <div className="grid grid-cols-2 gap-10">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-price">
                  Product Price
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-price"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="instock_count"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-instock">
                  Instock Count
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-instock"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="images"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-images">Images</FieldLabel>
              <ImageUpload images={field.value} onChange={field.onChange} />
            </Field>
          )}
        />
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-category">Category</FieldLabel>
              <CategorySelect value={field.value} onChange={field.onChange} />
            </Field>
          )}
        />
        <Controller
          name="color"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-color">Color</FieldLabel>
              <ColorPicker colors={field.value} onChange={field.onChange} />
            </Field>
          )}
        />
        <Controller
          name="size"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-size">Size</FieldLabel>
              <SizeSelector sizes={field.value} onChange={field.onChange} />
            </Field>
          )}
        />
        <div className="grid grid-cols-2 gap-10">
          <Controller
            name="is_new_arrival"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-is_new_arrival">
                  New Arrival
                </FieldLabel>
                <Switch />
              </Field>
            )}
          />
          <Controller
            name="is_feature"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-is_feature">
                  Featured Product
                </FieldLabel>
                <Switch />
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <Button type="submit" disabled={isLoading} className="mt-8">
        {isLoading
          ? "Saving..."
          : initialData
            ? "Update Product"
            : "Create Product"}
      </Button>
    </form>
  );
}

export default ProductForm;
