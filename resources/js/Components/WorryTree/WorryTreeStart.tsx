import { Button } from '@/Components/ui/button';
import { INVALID_WORRY_CODE, INVALID_WORRY_MESSAGE } from '@/lib/constants';
import { WorryTreeStartResponse } from '@/types/worry-tree';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import { useStream } from '@laravel/stream-react';
import { CircleXIcon } from 'lucide-react';
import { AnimatePresence, easeOut, motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { StreamOutput } from './StreamOutput';
import { WorryInput } from './WorryInput';

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
    const [step, setStep] = useState(0);

    const form = useForm<WorryTreeStartFormSchemaType>({
        resolver: zodResolver(worryTreeStartFormSchema),
        defaultValues: {
            message: '',
        },
    });

    const { data, send, isFetching } = useStream(route('worries.validate'), {
        headers: {
            'X-CSRF-TOKEN': props.csrf_token as string,
        },
        onError: (error) => {
            if (error?.message === INVALID_WORRY_CODE) {
                setShowInvalidMessage(true);
                return;
            }

            toast('Oops! Something went wrong. Please try again later', {
                icon: <CircleXIcon />,
                dismissible: true,
            });
        },
        onFinish: () => {
            setStep(1);
        },
    });

    const onSubmit = async ({ message }: WorryTreeStartFormSchemaType) => {
        try {
            setShowInvalidMessage(false);
            send({ message });
        } catch (error) {
            toast('Oops! Something went wrong. Please try again later', {
                icon: <CircleXIcon />,
                dismissible: true,
            });
        }
    };

    return (
        <div>
            <AnimatePresence mode="wait">
                {step === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        className="mb-5 rounded-3xl bg-white p-5 shadow-md"
                    >
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <motion.p
                                    className="text-xl font-bold"
                                    initial={{ opacity: 0, translateY: 20 }}
                                    exit={{ opacity: 0, translateY: -20 }}
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
                                                    <WorryInput
                                                        {...field}
                                                        maxLength={250}
                                                        rows={4}
                                                    />
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
                                    <Button type="submit" loading={isFetching}>
                                        Start
                                    </Button>
                                </motion.div>
                                <AnimatePresence mode="wait">
                                    {showInvalidMessage && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                translateY: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                translateY: 0,
                                            }}
                                            className="rounded-3xl bg-gray-50 p-4"
                                        >
                                            <p>{INVALID_WORRY_MESSAGE}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </Form>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, translateY: 20 }}
                        exit={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        className="mb-5 rounded-2xl bg-gray-50 p-4"
                    >
                        <p className="text-left">{form.getValues('message')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <StreamOutput data={data} />
        </div>
    );
}
