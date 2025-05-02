import { useActions } from '@/hooks/use-action';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createProjectCategoy } from '@/action/project-category';
import { ProjectCatSchema } from '@/action/project-category/schema';

type Props = {
  type: "Add" | "Edit";
  setIsOpen: any;
};

const AddProjectCategory = (props: Props) => {
  const {execute, isLoading} = useActions(createProjectCategoy, {
    onSuccess: () => {
      toast.success(`New Category Added`);
      props.setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const form = useForm<z.infer<typeof ProjectCatSchema>>({
    resolver: zodResolver(ProjectCatSchema),
    defaultValues: {
      revalidatePath: 
      props.type == "Add" ? "/admin/projectdescription/add" : "/admin/projectdescription/edit",
    },
  })

  const onSubmit = async (data: z.infer<typeof ProjectCatSchema>) => {
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

export default AddProjectCategory;
