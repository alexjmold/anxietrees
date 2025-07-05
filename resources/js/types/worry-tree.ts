interface WorryTreeFocusItem {
    worryDescription: string;
    worrySubject: string;
}

export interface WorryTreeStartResponse {
    isValid: boolean;
    response: string;
    worries: WorryTreeFocusItem[];
}
