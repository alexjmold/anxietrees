import { WorryTreeStart } from '@/Components/WorryTree/WorryTreeStart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { WorryTreeStartResponse } from '@/types/worry-tree';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function WorryTree() {
    const [response, setResponse] = useState('');
    const [worryAreas, setWorryAreas] = useState<Array<string>>([]);

    const onStartComplete = (data: WorryTreeStartResponse) => {
        console.log(data);
        const worrySubjects = data.worries.map(
            ({ worrySubject }) => worrySubject,
        );
        console.log(worrySubjects, data.response);
        setResponse(data.response);
        setWorryAreas(data.worries.map(({ worrySubject }) => worrySubject));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Worry Tree" />
            <div className="flex min-h-dvh w-full items-center justify-center">
                <div className="w-full max-w-md space-y-4 text-center">
                    <WorryTreeStart onComplete={onStartComplete} />
                    <div>
                        <p>{response}</p>
                        <ul>
                            {worryAreas.map((wa) => (
                                <li key={wa}>{wa}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
