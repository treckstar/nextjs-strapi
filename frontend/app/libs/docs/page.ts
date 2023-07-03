import {TAG, FORCE_TAG, CONTENT_PATH, ASSETS_PATH} from "./config";

import {getLatestTag} from "@/app/libs/github/api";
import {getRawFileFromRepo, getRawAssetFromRepo} from "@/app/libs/github/raw";
import {__PROD__, __PREVIEW__, removeFromLast} from "@/app/utils";
import localManifest from "@/app/content/docs/manifest.json";

export interface Route {
  key: string;
  title: string;
  subtitle?: string;
  section?: string;
  heading?: boolean;
  keywords?: string;
  iconSrc?: string;
  defaultOpen?: boolean;
  path?: string;
  routes?: Route[];
  updated?: boolean;
  newPost?: boolean;
  comingSoon?: boolean;
}

export interface RouteContext {
  parent?: Route;
  route?: Route;
  nextRoute?: Route;
  prevRoute?: Route;
}

export interface Carry {
  params: {slug: any};
}

export async function getCurrentTag(tag?: string) {
  if (tag) return tag;
  if (FORCE_TAG) return TAG;

  return getLatestTag();
}

export function addTagToSlug(slug: string, tag?: string) {
  return tag ? slug.replace("/docs", `/docs/tag/${tag}`) : slug;
}

export async function fetchRawDoc(doc: string, tag: string) {
  return await getRawFileFromRepo(`${CONTENT_PATH}${doc}`, tag);
}

export async function fetchDocsManifest(tag: string) {
  if (!__PROD__ || __PREVIEW__) return localManifest;

  const res = await getRawFileFromRepo(`${CONTENT_PATH}/docs/manifest.json`, tag);

  return JSON.parse(res);
}

export function getRawAsset(doc: string, tag: string) {
  return getRawAssetFromRepo(`${ASSETS_PATH}${doc}`, tag);
}

export function findRouteByPath(path: string, routes: Route[]): Route | null | undefined {
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, ".") === path) {
      return route;
    }
    const childPath = route.routes ? findRouteByPath(path, route.routes) : null;

    if (childPath) return childPath;
  }
}

export function getPaths(nextRoutes: Route[], carry: Carry[] = [{params: {slug: []}}]) {
  nextRoutes.forEach((route: Route) => {
    if (route.comingSoon) {
      return;
    }
    if (route.path) {
      carry.push(removeFromLast(route.path, ".") as Carry);
    } else if (route.routes) {
      getPaths(route.routes, carry);
    }
  });

  return carry;
}
