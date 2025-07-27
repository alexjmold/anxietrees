import { forwardRef } from 'react';
import { Textarea } from '../ui/textarea';

type WorryInputProps = React.ComponentProps<'textarea'>;

export const WorryInput = forwardRef<HTMLTextAreaElement, WorryInputProps>(
    (props, ref) => {
        const { value, maxLength } = props;
        const valueAsString = `${value}`;

        return (
            <div className="relative rounded-2xl">
                <div className="rounded-2xl bg-gray-50">
                    <Textarea
                        {...props}
                        ref={ref}
                        className="resize-none rounded-2xl bg-white"
                    />
                    <div className="flex justify-end px-3 py-2">
                        {maxLength && (
                            <p className="text-xs tabular-nums text-gray-700">
                                {valueAsString.length}/{maxLength}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

WorryInput.displayName = 'WorryInput';
