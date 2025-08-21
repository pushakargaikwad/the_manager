import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Project } from "@/types/Projects/Project";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Projects = () => {
  const [status, setStatus] = useState("");
  const { data, error } = useFrappeGetDocList<Project>("Project", {
    fields: [
      "name",
      "project_name",
      "status",
      "expected_start_date",
      "expected_end_date",
      "percent_complete",
      "priority",
    ],
    filters: status ? [["status", "=", status]] : undefined,
  });
  console.log("data", data);
  console.log("error", error);
  return (
    <div className="p-2">
      <h1 className="scroll-m-20 mb-4 text-center text-4xl font-extrabold tracking-tight text-balance">
        Projects
      </h1>
      <Select onValueChange={setStatus} value={status}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">% Complete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((project) => {
            return (
              <TableRow>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.project_name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.priority}</TableCell>
                <TableCell>{project.expected_start_date}</TableCell>
                <TableCell>{project.expected_end_date}</TableCell>

                <TableCell className="text-right">
                  {project.percent_complete}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Projects;
