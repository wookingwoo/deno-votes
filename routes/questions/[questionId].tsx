import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface Question {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option1Votes: number;
  option2Votes: number;
}

export const handler: Handlers<Question> = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const question = await kv.get<string>([ctx.params.questionId]);
    if (!question) {
      return new Response("Not found", { status: 404 });
    }
    return ctx.render(JSON.parse(question.value));
  },
};

export default function Question(props: PageProps<Question>) {
  return (
    <>
      <Head>
        <title>
          {props.data.question}
        </title>
      </Head>
      <div class="p-10 mx-auto max-w-screen-sm flex flex-col items-center">
        <h1 class="text-4xl font-medium">{props.data.question}</h1>
      </div>
    </>
  );
}
