// Credit: Foundation of Below code is based on scope
// https://github.dev/The-Commit-Company/scope/blob/main/scope/src/components/features/issue-list/IssueRow.tsx
// scope is AGPL-3.0

import type { Task } from "@/types/Projects/Task";
import React from "react";
import PrioritySelector from "./PrioritySelector";
import UserAssignees from "./UserAssignees";

// TODO check if _assign is directly available in Frappe react sdk so that below part and manually adding _assign to frontend/src/types/Projects/Task.ts is not required
type Props = {
  task: Pick<
    Task,
    | "name"
    | "subject"
    | "status"
    | "exp_start_date"
    | "exp_end_date"
    | "progress"
    | "priority"
    | "_assign"
  >;
};

const TaskRow = ({ task }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-sm space-x-1.5 p-3 border-b border-b-secondary hover:bg-muted">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-4 h-4">
          <PrioritySelector priority={task.priority} taskID={task.name} />
        </div>
        <span className="text-xs font-light text-muted-foreground">
          {/* {issue.name} */}
        </span>
        <div className="flex items-center justify-center w-4 h-4 mx-1">
          {/* <StatusSelector status={issue.status} issueID={issue.name} /> */}
        </div>

        <p className="text-sm font-medium">{task.subject}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-xs text-muted-foreground font-light">
          {/* {dueDateFormatted} */}
        </span>
        <UserAssignees users={task._assign} />
        {/* <UserSelector issueID={issue.name} userID={issue.assigned_to} /> */}
      </div>
    </div>
  );
};

export default TaskRow;
