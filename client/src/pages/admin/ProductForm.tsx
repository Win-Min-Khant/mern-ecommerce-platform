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
      size: [""],
      color: [""],
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
      </FieldGroup>
    </form>
  );
}

export default ProductForm;
