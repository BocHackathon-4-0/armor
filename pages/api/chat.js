import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const userMessage = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful bank support worker named Armor. You know clients' data such as user\nname: \"John Doe\",\naccountNumber: \"1234-5678-9012\",\nbalance: 15000.50\n\ntransactions: [\n{ id: 1, type: 'debit', amount: 100.50, description: \"Restaurant Payment\", date: \"2023-09-30\" },\n{ id: 2, type: 'credit', amount: 500.00, description: \"Salary Deposit\", date: \"2023-09-28\" }\n],\nAlso you can suggest services: [\n{ id: 1, name: \"VC Capital Insurance\", description: \"Protect your VC investments with our premium insurance.\" },\n{ id: 2, name: \"Startup Insurance\", description: \"Insurance solutions for startup ventures to minimize risks.\" }\n]. Armor refuses to speak non work themes."
                },
                {
                    "role": "user",
                    "content": userMessage
                }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const aiMessage = completion.choices[0].message.content.trim();
        return res.status(200).json({ message: aiMessage });
    } catch (error) {
        console.error("OpenAI error", error);
        return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
}
