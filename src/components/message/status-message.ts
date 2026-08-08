import { HttpStatusCode } from "axios";

export function HttpMessageFromStatus(
  status: number,
  details?: string,
  tSentences?: any
): string {
  if (!tSentences) {
    return "";
  }

  const Http302 = (model?: string) => tSentences("302", { model: model ?? "" });

  const Http400 = () => tSentences("400");
  const Http401 = () => tSentences("401");
  const HTTP403 = () => tSentences("403");
  const Http404 = (model?: string) => tSentences("404", { model: model ?? "" });
  const Http409 = () => tSentences("409");
  const Http422 = () => tSentences("422");
  const Http423 = () => tSentences("423");

  const Http500 = () => tSentences("500");
  const Http503 = () => tSentences("503");

  let message = "";
  switch (status) {
    case HttpStatusCode.Found:
      message = Http302(details);
      break;

    case HttpStatusCode.BadRequest:
      message = Http400();
      break;
    case HttpStatusCode.Unauthorized:
      message = Http401();
      break;
    case HttpStatusCode.Forbidden:
      message = HTTP403();
      break;
    case HttpStatusCode.NotFound:
      message = Http404(details);
      break;
    case HttpStatusCode.Conflict:
      message = Http409();
      break;
    case HttpStatusCode.UnprocessableEntity:
      message = Http422();
      break;
    case HttpStatusCode.Locked:
      message = Http423();
      break;

    case HttpStatusCode.ServiceUnavailable:
      message = Http503();
      break;

    default:
      if (status >= 500) {
        message = Http500();
      } else {
        message = Http400();
      }
      break;
  }
  return message;
}
