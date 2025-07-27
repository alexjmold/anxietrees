import { WorryTreeFurtherInformation } from '@/Components/WorryTree/WorryTreeFurtherInformation';
import { WorryTreeStart } from '@/Components/WorryTree/WorryTreeStart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { WorryTreeStartResponse, WorryTreeStatus } from '@/types/worry-tree';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function WorryTree() {
    const [state, setState] = useState<WorryTreeStatus>('start');

    const onStartComplete = async ({
        message,
        response,
        furtherInformation,
    }: WorryTreeStartResponse) => {
        if (furtherInformation) {
            setState('furtherInformation');
        }

        await axios.post(route('trees.create'), {
            messages: [
                {
                    role: 'user',
                    type: 'start',
                    content: message,
                },
                {
                    role: 'assistant',
                    type: 'start_response',
                    content: response,
                },
            ],
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Worry Tree" />
            <div className="flex min-h-dvh w-full items-center justify-center">
                <div className="w-full max-w-md space-y-4 text-center">
                    <WorryTreeStart onComplete={onStartComplete} />
                    {state === 'furtherInformation' && (
                        <WorryTreeFurtherInformation onComplete={() => {}} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
