class CompletionChatGPT {
    protected readonly _url: string = "https://api.openai.com/v1/completions";
    protected readonly _key: string = import.meta.env.VITE_API_KEY;
    protected readonly _model: string = "text-curie-001";
    private _signal: AbortController;

    constructor() {
        this._signal = new AbortController();
    }

    async sendPrompt(prompt: string): Promise<IChatGPTResponse> {
        const data: IMinimalRequestCompletion = {
            model: this._model,
            prompt: prompt,
            max_tokens: 16,
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

export default CompletionChatGPT;
