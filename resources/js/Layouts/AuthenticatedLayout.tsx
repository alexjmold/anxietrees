import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Link } from '@inertiajs/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function Authenticated({ children }: PropsWithChildren) {
    return (
        <div className="min-h-dvh bg-gray-100 pt-[55px]">
            <div className="fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-[860px] p-4">
                <nav className="flex w-full items-center justify-between rounded-3xl border-b border-gray-100 bg-white p-3">
                    <ApplicationLogo className="h-auto w-10" />
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="relative">
                                Forest
                                {route().current('dashboard') && (
                                    <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-emerald-500" />
                                )}
                            </Button>
                        </Link>
                        <Link href="/worry-tree">
                            <Button variant="ghost" className="relative">
                                Create
                                {route().current('worrytree') && (
                                    <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-emerald-500" />
                                )}
                            </Button>
                        </Link>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'secondary'} size="icon">
                                <UserIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="max-w-[200px] flex-col rounded-2xl p-2"
                            side="bottom"
                            align="end"
                        >
                            <Button
                                variant="ghost"
                                asChild
                                className="w-full justify-start"
                            >
                                <Link href={route('profile.edit')}>
                                    <UserIcon />
                                    Profile
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                asChild
                                className="w-full justify-start"
                            >
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    <LogOutIcon />
                                    Sign out
                                </Link>
                            </Button>
                        </PopoverContent>
                    </Popover>
                </nav>
            </div>
            <main>{children}</main>
        </div>
    );
}
