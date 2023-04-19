interface IChatGPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: IChoiceGPT[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

interface IChoiceGPT {
    text: string;
    index: number;
    logprobs: null | any[];
    finish_reason: string;
}

interface IMinimalRequestCompletion {
    model: string;
    prompt: string;
    max_tokens: number;
    temperature: number;
}
