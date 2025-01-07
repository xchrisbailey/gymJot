"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const newExerciseSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  description: v.string(),
  url: v.pipe(v.string(), v.url()),
});

export default function NewExerciseForm() {
  const form = useForm<v.InferOutput<typeof newExerciseSchema>>({
    resolver: valibotResolver(newExerciseSchema),
  });
}
