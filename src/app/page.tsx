import { builder } from "@/lib/builder";
import HomePageFallback from "./HomePageFallback";
import BuilderPageRenderer from "./BuilderPageRenderer";

async function getBuilderPageForPath(urlPath: string) {
  if (!builder) return null;
  try {
    const subject = builder.get("page", {
      userAttributes: { urlPath },
      cacheSeconds: 120,
    });
    const result = await (subject as { promise(): Promise<unknown> }).promise();
    if (!result) return null;
    const content = Array.isArray(result) ? result[0] : (result as { data?: unknown }).data ?? result;
    return content as import("@builder.io/sdk").BuilderContent | null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const content = await getBuilderPageForPath("/");

  if (content) {
    return <BuilderPageRenderer content={content} />;
  }

  return <HomePageFallback />;
}
