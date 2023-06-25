import { Head } from "https://deno.land/x/fresh@1.2.0/runtime.ts";

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

          <button class="w-full bg-gray-800 text-white text cl rounded-md mb-2 p-2">
            Ask away!
          </button>
        </form>
      </div>
    </>
  );
}
