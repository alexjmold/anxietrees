import { Button } from '@/Components/ui/button';
import { WorryTreeStartResponse } from '@/types/worry-tree';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import { useStream } from '@laravel/stream-react';
import axios from 'axios';
import { AnimatePresence, easeOut, motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const worryTreeStartFormSchema = z.object({
    message: z.string().min(3).max(350),
});

type WorryTreeStartFormSchemaType = z.infer<typeof worryTreeStartFormSchema>;

type WorryTreeStartProps = {
    onComplete: (data: WorryTreeStartResponse) => void;
};

export function WorryTreeStart({ onComplete }: WorryTreeStartProps) {
    const { props } = usePage();
    const [showInvalidMessage, setShowInvalidMessage] = useState(false);

    const form = useForm<WorryTreeStartFormSchemaType>({
        resolver: zodResolver(worryTreeStartFormSchema),
        defaultValues: {
            message: '',
        },
    });

    const { data, send } = useStream(route('worries.initial-stream'), {
        headers: {
            'X-CSRF-TOKEN': props.csrf_token as string,
        },
    });

    const onSubmit = async ({ message }: WorryTreeStartFormSchemaType) => {
        try {
            setShowInvalidMessage(false);

            const { data: validationData } = await axios.post(
                route('worries.validate'),
                {
                    message,
                },
            );

            if (!validationData?.valid) {
                setShowInvalidMessage(true);
                return;
            }

            send({ message });
            const { data: worries } = await axios.post(
                route('worries.initial-worries'),
                {
                    message,
                },
            );

            console.log(worries);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="rounded-3xl bg-white p-5 shadow-md">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <motion.p
                        className="text-xl font-bold"
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: easeOut,
                        }}
                    >
                        What's on your mind?
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.5,
                            ease: easeOut,
                        }}
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.7,
                            ease: easeOut,
                        }}
                    >
                        <Button
                            type="submit"
                            loading={form.formState.isSubmitting}
                        >
                            Start
                        </Button>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        {showInvalidMessage && (
                            <motion.div
                                initial={{ opacity: 0, translateY: 20 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                className="rounded-3xl bg-gray-50 p-4"
                            >
                                <p>
                                    I'm not sure how to help with that right
                                    now. Is there something else I can help
                                    with?
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </Form>
            <div>{data}</div>
        </div>
    );
}
