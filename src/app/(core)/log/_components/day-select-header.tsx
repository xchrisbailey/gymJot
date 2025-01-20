'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { daysOfWeek } from '@/lib/data';
import Form from 'next/form';
import { useRef } from 'react';

export function DaySelectHeader({ day }: { day?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="grid w-full place-content-center">
      <Form action="/log" className="flex gap-4" ref={formRef}>
        <Select
          name="day"
          defaultValue={day?.toLocaleLowerCase()}
          onValueChange={() => formRef.current?.submit()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Day" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((d) => (
              <SelectItem value={d} key={d} aria-selected={day === d}>
                <span style={{ textTransform: 'capitalize' }}>{d}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Form>
    </div>
  );
}
