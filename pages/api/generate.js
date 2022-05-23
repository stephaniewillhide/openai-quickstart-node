import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.plan),
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(plan) {
  return `Write an invitation to a friend based on these notes.
  Prompt: Kurt, park, thursday
  Invitation: Hi Kurt, I hope you are having a great day! Would you like to go to the park with me on Thursday?
  Prompt: Jessica, coffee, saturday afternoon
  Invitation: Hi there Jessica, how have you been? Would you like to get some coffee together on Saturday afternoon?
  Prompt: Isabel, drinks, Monday after work
  Invitation: Hey Isabel, hope all is well! I was wondering if you wanted to get drinks on Monday after work. Let me know if that sounds good to you!
  Prompt: ${plan}
  Invitation:`;
}