"use client";
import { useTasks } from "../hooks/useTasks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const [taskState, setTaskState] = useState<{ [id: number]: boolean }>({});

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Error fetching tasks.</p>;

  const toggleDone = (id: number) => {
    setTaskState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-6 bg-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg overflow-x-auto">
        <Table className="border border-gray-700 text-white rounded-lg overflow-hidden min-w-full">
          <TableHeader className="bg-gray-900 rounded-t-lg">
            <TableRow>
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Mark as Done</TableHead>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow
                key={task.id}
                className={`border-b border-gray-700 hover:bg-gray-800 ${
                  taskState[task.id] ? "line-through text-gray-500" : ""
                }`}
              >
                <TableCell className="rounded-bl-lg">{task.id}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={taskState[task.id] ?? task.done}
                    onCheckedChange={() => toggleDone(task.id)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell className="whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                  {task.description}
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell
                  className={
                    task.priority.toLowerCase() === "high"
                      ? "text-red-500"
                      : task.priority.toLowerCase() === "medium"
                      ? "text-orange-500"
                      : "text-white"
                  }
                >
                  {task.priority}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
