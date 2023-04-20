declare interface TextCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: IChoiceTextCompletionGPT[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

declare interface IChoiceTextCompletionGPT {
    text: string;
    index: number;
    logprobs: null | any[];
    finish_reason: string;
}

declare interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    choices: [IChoiceChatCompletionGPT];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

declare interface IChoiceChatCompletionGPT {
    index: number;
    message: {
        role: string;
        content: string;
    };
    finish_reason: string;
}

declare interface IMinimalRequestTextCompletion {
    model: string;
    prompt: string;
    max_tokens: number;
    temperature: number;
}

declare interface IRequestChatCompletion {
    model: string;
    messages: [Message];
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string | string[];
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    user?: string;
}

declare type Message = {
    role: string;
    content: string;
    name?: string;
};
