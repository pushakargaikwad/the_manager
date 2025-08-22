import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import type { Project } from "@/types/Projects/Project";
import LinkField from "@/components/common/FormFields/LinkField";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { getUserDefaults } from "@/lib/defaults";

const CreateProjectButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>Create a new Project</DialogDescription>
          </DialogHeader>
          <ProjectForm onClose={() => setOpen(false)} />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateProjectButton;

const ProjectForm = ({ onClose }: { onClose: VoidFunction }) => {
  const form = useForm<Project>({
    defaultValues: {
      company: getUserDefaults("company"),
    },
  });
  const { createDoc, loading, error } = useFrappeCreateDoc<Project>();
  const onSubmit = (data: Project) => {
    createDoc("Project", data).then(() => {
      onClose();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="project_name"
            rules={{
              required: "Project Name is required",
              maxLength: {
                value: 140,
                message: "Name should not exceed 140 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            rules={{
              required: "Company is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>

                <LinkField
                  doctype="Company"
                  value={field.value}
                  filters={[["is_group", "=", 0]]}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project_template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template</FormLabel>

                <LinkField
                  doctype="Project Template"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
