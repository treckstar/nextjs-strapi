"use client";

import {useRef, useState, FC, ReactNode} from "react";
import {
  link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Link,
  Button,
  Kbd,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import {dataFocusVisibleClasses} from "@nextui-org/theme";
import {ChevronDownIcon, LinkIcon} from "@nextui-org/shared-icons";
import {isAppleDevice} from "@react-aria/utils";
import {clsx} from "@nextui-org/shared-utils";
import NextLink from "next/link";
import {usePathname} from "next/navigation";
import {includes} from "lodash";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect} from "react";
import {usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";

import {siteConfig} from "@/app/config/site";
import {Route} from "@/app/libs/docs/page";
import {LargeLogo, SmallLogo, ThemeSwitch} from "@/app/components";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchLinearIcon,
} from "@/app/components/icons";
import {useIsMounted} from "@/app/hooks/use-is-mounted";
import {DocsSidebar} from "@/app/components/docs/sidebar";
import {useCmdkStore} from "@/app/components/cmdk";

export interface NavbarProps {
  routes: Route[];
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({children, routes, slug, tag}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  const ref = useRef(null);
  const isMounted = useIsMounted();

  const pathname = usePathname();

  const cmkdStore = useCmdkStore();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const {pressProps} = usePress({
    onPress: () => cmkdStore.onOpen(),
  });
  const {focusProps, isFocusVisible} = useFocusRing();

  const docsPaths = [
    "/docs/guide/introduction",
    "/docs/guide/installation",
    "/docs/guide/upgrade-to-v2",
  ];

  const searchButton = (
    <Button
      aria-label="Quick search"
      className="text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden py-0.5 px-2 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <SearchLinearIcon
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          size={18}
          strokeWidth={2}
        />
      }
      onPress={() => cmkdStore.onOpen()}
    >
      Quick Search...
    </Button>
  );

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <NextUINavbar
      ref={ref}
      className={clsx({
        "z-[100001]": isMenuOpen,
      })}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            aria-label="Home"
            className="flex justify-start items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50"
            href="/"
          >
            <SmallLogo className="w-6 h-6 md:hidden" />
            <LargeLogo className="h-5 md:h-6" />
          </NextLink>
          {ref.current ? (
            <Dropdown placement="bottom-start" portalContainer={ref.current}>
              <AnimatePresence>
                {isMounted && (
                  <motion.div animate={{opacity: 1}} exit={{opacity: 0}} initial={{opacity: 0}}>
                    <DropdownTrigger>
                      <Button
                        className="hidden min-w-fit max-w-[64px] sm:flex gap-0.5 bg-default-400/20 dark:bg-default-500/20"
                        endContent={<ChevronDownIcon className="text-xs" />}
                        radius="full"
                        size="xs"
                        variant="flat"
                      >
                        v2.0.0
                      </Button>
                    </DropdownTrigger>
                  </motion.div>
                )}
              </AnimatePresence>
              <DropdownMenu
                aria-label="NextUI versions"
                defaultSelectedKeys={["v2"]}
                selectionMode="single"
              >
                <DropdownItem key="v2">v2.0.0</DropdownItem>
                <DropdownItem key="v1" endContent={<LinkIcon />}>
                  v1.0.0
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-[64px]" />
          )}
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start">
          <NavbarItem>
            <NextLink
              className={clsx(
                link({color: "foreground"}),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              data-active={includes(docsPaths, pathname)}
              href="/docs/guide/introduction"
            >
              Docs
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                link({color: "foreground"}),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              data-active={includes(pathname, "components")}
              href="/docs/components/avatar"
            >
              Components
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                link({color: "foreground"}),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              data-active={pathname === "/figma"}
              href="/figma"
            >
              Figma
            </NextLink>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent className="flex w-full gap-2 sm:hidden" justify="end">
        <NavbarItem className="flex h-full items-center">
          <Link
            isExternal
            aria-label="Github"
            className="p-1"
            href="https://github.com/nextui-org/nextui"
          >
            <GithubIcon className="text-default-600 dark:text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <button
            className={clsx(
              "transition-opacity p-1 hover:opacity-80 rounded-full cursor-pointer outline-none",
              // focus ring
              ...dataFocusVisibleClasses,
            )}
            data-focus-visible={isFocusVisible}
            {...focusProps}
            {...pressProps}
          >
            <SearchLinearIcon className="mt-px text-default-600 dark:text-default-500" size={20} />
          </button>
        </NavbarItem>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="ml-2" />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link isExternal aria-label="Twitter" className="p-1" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" className="p-1" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" className="p-1" href={siteConfig.links.github}>
            <GithubIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchButton}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="group text-sm font-normal text-default-600 bg-default-400/20 dark:bg-default-500/20"
            href={siteConfig.links.sponsor}
            startContent={
              <HeartFilledIcon className="text-danger group-data-[hover=true]:animate-heartbeat" />
            }
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>{" "}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden sm:flex lg:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        <DocsSidebar className="mt-4" routes={routes} slug={slug} tag={tag} />
        {children}
      </NavbarMenu>
    </NextUINavbar>
  );
};
