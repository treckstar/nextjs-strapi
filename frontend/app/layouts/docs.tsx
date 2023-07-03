import {FC} from "react";
import {Link as NextUILink} from "@nextui-org/react";
import Link from "next/link";

import {Head} from "./head";
import {Footer} from "./footer";

import {Navbar} from "@/app/components/navbar";
import {Route} from "@/app/libs/docs/page";
import {MetaProps} from "@/app/libs/docs/meta";
import {Heading} from "@/app/libs/docs/utils";
import {FooterNav, DocsToc} from "@/app/components/docs";
import {GITHUB_URL, REPO_NAME} from "@/app/libs/github/constants";
import {CONTENT_PATH, TAG} from "@/app/libs/docs/config";
import {DocsSidebar} from "@/app/components/docs/sidebar";

export interface DocsLayoutProps {
  routes: Route[];
  currentRoute?: Route;
  prevRoute?: Route;
  nextRoute?: Route;
  meta?: MetaProps;
  tag?: string;
  slug?: string;
  headings?: Heading[];
  children?: React.ReactNode;
}

export const DocsLayout: FC<DocsLayoutProps> = ({
  children,
  routes,
  currentRoute,
  headings,
  tag,
  slug,
  meta,
}) => {
  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;

  return (
    <div id="app-container">
      <Head {...meta} />
      <Navbar routes={routes} slug={slug} tag={tag} />
      <main className="container mx-auto max-w-7xl min-h-[calc(100vh_-_64px_-_108px)] px-6 mb-12">
        <div className="grid grid-cols-12">
          <div className="hidden relative lg:block lg:col-span-2 mt-8 pr-4">
            <DocsSidebar routes={routes} slug={slug} tag={tag} />
          </div>
          <div className="col-span-12 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
            <div className="w-full prose prose-neutral">{children}</div>
            <FooterNav currentRoute={currentRoute} tag={tag} />
            <footer>
              {tag ? (
                <NextUILink as={Link} href={slug || ""} size="sm">
                  Go to the live version of this page
                </NextUILink>
              ) : (
                <NextUILink isExternal showAnchorIcon href={editUrl} size="sm">
                  Edit this page on GitHub
                </NextUILink>
              )}
            </footer>
          </div>
          {headings && headings.length > 0 && (
            <div className="hidden xl:flex xl:col-span-2 mt-8 pl-4">
              <DocsToc headings={headings} />
            </div>
          )}
        </div>
      </main>

      <Footer align="right" />
    </div>
  );
};
