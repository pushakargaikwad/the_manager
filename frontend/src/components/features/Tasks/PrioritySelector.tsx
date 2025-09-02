/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types/Projects/Task";
import PriorityIcon from "./PriorityIcon";
import { forwardRef } from "react";
import { useFrappeUpdateDoc, useSWRConfig } from "frappe-react-sdk";

type Props = {
  priority: Task["priority"];
  taskID: Task["name"];
};

const PrioritySelector = ({ priority, taskID }: Props) => {
  const { mutate } = useSWRConfig();
  const { updateDoc } = useFrappeUpdateDoc<Task>();

  const onPriorityChange = (p: Task["priority"]) => {
    console.log("prority changed to ", p);
    updateDoc("Task", taskID, {
      priority: p,
    }).then((doc) => {
      console.log("updated doc", doc);
      mutate("task_list", (existingTasks?: Task[]) => {
        return existingTasks?.map(
          (task) => {
            if (task.name === doc.name) {
              return {
                ...task,
                ...doc,
              };
            }
            return task;
          },
          { revalidate: false }
        );
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PriorityIcon priority={priority} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <PriorityOptionItem
          priority="Urgent"
          selected={priority}
          onClick={onPriorityChange}
        />
        <PriorityOptionItem
          priority="High"
          selected={priority}
          onClick={onPriorityChange}
        />
        <PriorityOptionItem
          priority="Medium"
          selected={priority}
          onClick={onPriorityChange}
        />
        <PriorityOptionItem
          priority="Low"
          selected={priority}
          onClick={onPriorityChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface PriorityOptionItemProps {
  priority: Task["priority"];
  selected: Task["priority"];
  onClick: (p: Task["priority"]) => void;
}
const PriorityOptionItem = forwardRef<any, PriorityOptionItemProps>(
  ({ priority, selected, onClick }, ref) => {
    return (
      <DropdownMenuCheckboxItem
        ref={ref}
        checked={priority === selected}
        onCheckedChange={() => onClick(priority)}
      >
        <div className="flex space-x-1.5 items-center justify-between w-32">
          <span>{priority}</span>
          <span className="text-right">
            <PriorityIcon priority={priority} />
          </span>
        </div>
      </DropdownMenuCheckboxItem>
    );
  }
);

export default PrioritySelector;
