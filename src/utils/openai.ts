//next feature i guess?
export class TextCompletionChatGPT {
    protected readonly _url: string = "https://api.openai.com/v1/completions";
    protected readonly _key: string = import.meta.env.VITE_API_KEY;
    protected readonly _model: string = "text-curie-001";
    private _signal: AbortController;

    constructor() {
        this._signal = new AbortController();
    }

    async sendTextPrompt(prompt: string): Promise<TextCompletionResponse> {
        const data: IMinimalRequestTextCompletion = {
            model: this._model,
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0,
        };

        const response = await fetch(this._url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._key}`,
            },
            signal: this._signal.signal,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    cancelFetching() {
        this._signal.abort();
    }
}

export class ChatCompletionChatGPT {
    protected readonly _url: string =
        "https://api.openai.com/v1/chat/completions";
    protected readonly _key: string = import.meta.env.VITE_API_KEY;
    protected readonly _model: string = "gpt-3.5-turbo";
    private _signal: AbortController;

    constructor() {
        this._signal = new AbortController();
    }

    async sendChatPrompt(prompt: string): Promise<ChatCompletionResponse> {
        const data: IRequestChatCompletion = {
            model: this._model,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0,
        };

        const response = await fetch(this._url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._key}`,
            },
            signal: this._signal.signal,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    cancelFetching() {
        this._signal.abort();
    }
}
