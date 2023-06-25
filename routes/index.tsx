import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const question = form.get("question")?.toString();
    const option1 = form.get("option_1")?.toString();
    const option2 = form.get("option_2")?.toString();

    const payload = {
      id: crypto.randomUUID(),
      question,
      option1,
      option2,
      option1Votes: 0,
      option2Votes: 0,
    };

    const kv = await Deno.openKv();

    await kv.set([payload.id], JSON.stringify(payload));
    const headers = new Headers();
    headers.set("location", `/questions/${payload.id}`);
    return new Response(null, {
      status: 302,
      headers: headers,
    });
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Deno Vote
        </title>
      </Head>

      <div class="p-10 mx-auto max-w-screnn-md flex flex-col items-center">
        <h1 class="text-4xl font-medium">Deno Vote</h1>
        <form class="mt-5 flex-col flex items-center" method="post">
          <label class="mt-10 text-2xl font-medium mb-5">
            What is your question?
          </label>

          <input
            required
            type="text"
            name="question"
            placeholder="Javascript is better than Typescript"
            class="border-2 w-full border-gray-800 rounded-md mb-2 p-2"
          />

          <div div className={"flex mb-5 mt-2.5 gap-5"}>
            <div class="flex flex-col gap-2 items-center">
              <label class="font-medium text-lg">Option1</label>
              <input
                required
                type="text"
                name="option_1"
                placeholder="Yes"
                class="border-2 w-full border-gray-800 rounded-md mb-2 p-2"
              />
            </div>

            <div class="flex flex-col gap-2 items-center">
              <label class="font-medium text-lg">Option2</label>
              <input
                required
                type="text"
                name="option_2"
                placeholder="No"
                class="border-2 w-full border-gray-800 rounded-md mb-2 p-2"
              />
            </div>
          </div>

          <button class="w-full bg-gray-800 text-white text-xl rounded-md mb-2 p-2">
            Ask away!
          </button>
        </form>
      </div>
    </>
  );
}
