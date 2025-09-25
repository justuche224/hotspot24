"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFoodItem, updateFoodItem, getFoodItemById } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface FoodItemFormProps {
  branchId: string;
  branchSlug: string;
  categories: Array<{ id: string; name: string }>;
  foodItemId?: string;
}

const FoodItemForm = ({
  branchId,
  branchSlug,
  categories,
  foodItemId,
}: FoodItemFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: existingFoodItem } = useQuery({
    queryKey: ["food-item", foodItemId],
    queryFn: () => (foodItemId ? getFoodItemById(foodItemId) : null),
    enabled: !!foodItemId,
  });

  React.useEffect(() => {
    if (existingFoodItem) {
      setFormData({
        name: existingFoodItem.name,
        description: existingFoodItem.description,
        price: existingFoodItem.price?.toString() || "",
        // @ts-expect-error TODO: fix this
        categoryId: existingFoodItem.categoryId,
      });
    }
  }, [existingFoodItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("categoryId", formData.categoryId);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      if (foodItemId) {
        await updateFoodItem(foodItemId, formDataToSend);
        toast.success("Food item updated successfully");
      } else {
        await createFoodItem(branchId, formData.categoryId, formDataToSend);
        toast.success("Food item created successfully");
      }

      router.push(`/admin/branches/${branchSlug}/food-items`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Item Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => handleChange("categoryId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image {!foodItemId && "*"}</Label>
          <div className="flex items-center gap-2">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!foodItemId}
            />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
          {existingFoodItem && (
            <p className="text-sm text-muted-foreground">
              Leave empty to keep current image
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter item description"
          rows={4}
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {foodItemId ? "Update Food Item" : "Create Food Item"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FoodItemForm;
