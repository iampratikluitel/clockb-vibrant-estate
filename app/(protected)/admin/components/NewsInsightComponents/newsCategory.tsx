import { createNewsCategory } from '@/action/news-category';
import { NewsCatSchema } from '@/action/news-category/schema';
import { useActions } from '@/hooks/use-action';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  type: "Add" | "Edit";
  setIsOpen: any;
};

const AddNewsCategory = (props: Props) => {
  const {execute, isLoading} = useActions(createNewsCategory, {
    onSuccess: () => {
      toast.success(`New Category Added`);
      props.setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const form = useForm<z.infer<typeof NewsCatSchema>>({
    resolver: zodResolver(NewsCatSchema),
    defaultValues: {
      revalidatePath: 
      props.type == "Add" ? "/admin/news/add" : "/admin/news/edit",
    },
  })

  const onSubmit = async (data: z.infer<typeof NewsCatSchema>) => {
    execute({ ...data });
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Title</FormLabel>
              <FormControl>
                <Input placeholder="Education" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewsCategory;
