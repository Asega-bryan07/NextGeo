"use client";

import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { serverWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuItem,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: serverWithMembersWithProfiles;
    role?: MemberRole;
};

export const ServerHeader =  ({
    server,
    role 
}: ServerHeaderProps) => {
    // admin and moderator roles 
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none"
            asChild>
                <button className="w-full text-md font-semibold  px-3 flex items-center
                h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
                dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown  className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400
            space-y-[2px]">
                {/* option for moderators and admins to add people  */}
                {isModerator && (
                    <DropdownMenuItem
                    onClick={() => onOpen("invite", { server })}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Invite People
                        <UserPlus className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
                        Server Settings
                        <Settings className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
                        Manage Members
                        <Users className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
                        Create Channel
                        <PlusCircle className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Delete Server
                        <Trash className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Leave Server
                        <LogOut className="w-4 h-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}