import { ChevronDown, CreditCard, Dumbbell, FileText, List, LogIn, LogOut, Plus, User, UserPlus } from 'lucide-react';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Form from 'next/form';
import Link from 'next/link';
import { signOutAction } from './(auth)/_actions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Separator } from '@/components/ui/separator';

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex justify-center items-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                  <Dumbbell className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">gymJot</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/plan">
                  <CreditCard className="mr-2 w-4 h-4" />
                  Plan
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/log">
                  <FileText className="mr-2 w-4 h-4" />
                  Log
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Dumbbell className="mr-2 w-4 h-4" />
                    Exercises
                    <ChevronDown className="ml-auto w-4 h-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/exercises/new" className="flex">
                      <Plus className="mr-2 w-4 h-4" />
                      Add Exercise
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/exercises" className="flex">
                      <List className="mr-2 w-4 h-4" />
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarMenu>
            {session?.user ? (
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User className="mr-2 w-4 h-4" />
                      {session.user.name}
                      <ChevronDown className="ml-auto w-4 h-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="#profile" className="flex">
                        <User className="mr-2 w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Form action={signOutAction} className="p-0 m-0">
                        <button
                          // variant="link"
                          className="flex items-center p-0 m-0 border-none outline-none"
                        >
                          <LogOut className="mr-2 w-4 h-4" />
                          Sign Out
                        </button>
                      </Form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ) : (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/sign-in">
                      <LogIn className="mr-2 w-4 h-4" />
                      Sign In
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/sign-up">
                      <UserPlus className="mr-2 w-4 h-4" />
                      Sign Up
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
