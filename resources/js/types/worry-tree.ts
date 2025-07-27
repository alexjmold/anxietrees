export type WorryTreeStatus = 'start' | 'furtherInformation';

export interface WorryTreeStartResponse {
    message: string;
    response: string;
    furtherInformation: boolean;
}
