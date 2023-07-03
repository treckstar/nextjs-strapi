import {addTagToSlug} from "@/app/libs/docs/page";
import {removeFromLast} from "@/app/utils";

export const getRoutePaths = (path: string, tag?: string) => {
  const pagePath = path ? removeFromLast<string>(path, ".") : path;
  const pathname = pagePath ? addTagToSlug(pagePath, tag) : pagePath;

  return {
    pagePath,
    pathname,
  };
};
