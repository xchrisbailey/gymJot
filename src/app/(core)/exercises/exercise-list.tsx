"use client";

import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Exercise } from "@/lib/database/schema";
import { exerciseCategories } from "@/lib/data";

export function ExerciseList({
  exercisesPromise,
}: {
  exercisesPromise: Promise<Exercise[]>;
}) {
  const exercises = use(exercisesPromise);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(filter.toLowerCase()) &&
      (categoryFilter === "all" || exercise.category === categoryFilter),
  );

  const categories = ["all", ...exerciseCategories];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Filter exercises..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.name}</CardTitle>
              <CardDescription>{exercise.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-gray-500">
                {exercise.description}
              </p>
              <p className="text-sm">
                <strong>Primary Muscle:</strong> {exercise.primaryMuscle}
              </p>
              <p className="text-sm">
                <strong>Equipment:</strong> {exercise.equipment}
              </p>
            </CardContent>
            {exercise.url && (
              <CardFooter>
                <Button variant="secondary" asChild>
                  <a
                    href={exercise.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
      {filteredExercises.length === 0 && (
        <p className="text-center text-gray-500">
          No exercises found matching your criteria.
        </p>
      )}
    </div>
  );
}
