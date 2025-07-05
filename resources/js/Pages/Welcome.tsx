import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/button';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Anxietrees" />
            <div className="w-full">
                <nav className="flex w-full items-center justify-between p-4">
                    <div>
                        <ApplicationLogo />
                    </div>
                    <div className="flex gap-3">
                        {auth.user ? (
                            <Button asChild>
                                <Link href={route('dashboard')}>Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="secondary">
                                    <Link href={route('login')}>Sign in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('register')}>
                                        Register
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </nav>
                <main className="flex min-h-dvh w-full items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Welcome</h1>
                        <p>Turn your worries into a forest</p>
                    </div>
                </main>
            </div>
        </>
    );
}
