import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
});

type SearchFormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
  onSearch: (values: SearchFormValues) => void;
  defaultValues?: SearchFormValues;
}

export function SearchForm({ onSearch, defaultValues = { q: '', category: '' } }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const categories = [
    { value: "all", label: "すべてのカテゴリー" },
    { value: "business", label: "ビジネス" },
    { value: "entertainment", label: "エンターテイメント" },
    { value: "environment", label: "環境" },
    { value: "food", label: "食品" },
    { value: "health", label: "健康" },
    { value: "politics", label: "政治" },
    { value: "science", label: "科学" },
    { value: "sports", label: "スポーツ" },
    { value: "technology", label: "テクノロジー" },
    { value: "top", label: "トップニュース" },
    { value: "world", label: "国際" }
  ];

  const handleSubmit = (values: SearchFormValues) => {
    const processedValues = {
      ...values,
      category: values.category === "all" ? "" : values.category,
    };
    onSearch(processedValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col sm:flex-row gap-4">
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="キーワードで検索" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || "all"}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="カテゴリー" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <Button type="submit">検索</Button>
      </form>
    </Form>
  );
} 