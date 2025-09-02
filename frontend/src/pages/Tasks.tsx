import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFrappeGetDocList } from "frappe-react-sdk";
import type { Task } from "@/types/Projects/Task";
import TaskRow from "@/components/features/Tasks/TaskRow";

const Tasks = () => {
  const { data, isLoading, error } = useFrappeGetDocList<Task>(
    "Task",
    {
      fields: [
        "name",
        "subject",
        "status",
        "exp_start_date",
        "exp_end_date",
        "progress",
        "priority",
        "_assign",
      ],
    },
    "task_list"
  );
  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="scroll-m-20 mb-4 text-center text-4xl font-extrabold tracking-tight text-balance">
          Tasks
        </h1>
      </div>
      <div className="flex gap-2 justify-between items-center mb-4">
        <Select
        // onValueChange={setStatus} value={status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {data?.map((task) => (
          <TaskRow task={task} key={task.name} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
