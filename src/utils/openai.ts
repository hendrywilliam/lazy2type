export const openaiStream = async (prompt: string) => {
    const signal = new AbortController();
    const req: IRequestChatCompletion = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        max_tokens: 1000,
        temperature: 0,
        stream: true,
    };
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            signal: signal.signal,
            body: JSON.stringify(req),
        });
        const reader = res.body?.getReader();
        let result = "";
        while (true) {
            if (reader !== undefined) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split("\n\n");
                const pls = lines
                    .map((line) => line.replace(/^data: /gm, "").trim())
                    .filter((line) => line !== "" && line !== "[DONE]")
                    .map((line) => JSON.parse(line));

                for (const pl in pls) {
                    const { choices } = pls[pl];
                    const { delta } = choices[0];
                    const { content } = delta;
                    if (content) {
                        result += content;
                    }
                }
            }
        }
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
