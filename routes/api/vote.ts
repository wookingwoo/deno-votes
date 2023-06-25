import { HandlerContext } from "$fresh/server.ts";
export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (req.method == "POST") {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const option = url.searchParams.get("option");
    if (id && option) {
      const kv = await Deno.openKv();
      const quesition = await kv.get<string>([id]);

      if (quesition.value !== null) {
        const questionObj = JSON.parse(question.value);
        await kv.set(
          [id],
          JSON.stringify({
            ...questionObj,
            ...(option === "1" && {
              option1Votes: questionObj.option1Votes + 1,
            }),
            ...(option === "2" && {
              option2Votes: questionObj.option2Votes + 1,
            }),
          })
        );
        return new Response(null, { status: 200 });
      }
    }
  }
  return new Response(null, { status: 405 });
};
