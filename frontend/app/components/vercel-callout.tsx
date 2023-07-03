import React from "react";
import {Link} from "@nextui-org/react";

import {VercelIcon} from "@/app/components/icons";

export const VercelCallout: React.FC<unknown> = () => {
  return (
    <Link
      isExternal
      className="flex justify-end items-center gap-2 text-foreground"
      href="https://www.vercel.com?utm_source=nextui&utm_marketing=oss"
    >
      <p className="font-normal">Deployed on</p>
      <VercelIcon className="text-black dark:text-white" height={18} />
    </Link>
  );
};
