import React, {useEffect} from "react";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {tv} from "tailwind-variants";

import {useIsMobile} from "@/app/hooks/use-media-query";
import {useIsomorphicLayoutEffect} from "@/app/hooks/use-isomorphic-layout-effect";
import {WindowActions} from "@/app/components/code-window/window-actions";

const resizer = tv({
  base: "flex items-center justify-end absolute right-[5px] z-10 w-auto xs:hidden",
  slots: {
    main: "relative w-full",
    barWrapper:
      "cursor-ew-resize select-none absolute d-flex justify-center flex items-center w-[10px] h-auto active:opacity-80",
    barInner: "relative z-10",
    bar: "w-[6px] h-[40px] rounded-full bg-default-400",
    iframeWrapper:
      "w-full h-full border border-default-200 dark:border-default-100 rounded-lg overflow-hidden",
    iframe: "w-full h-full border-none z-10 overflow-x-visible overflow-y-scroll",
  },
  variants: {
    hasInitialWidth: {
      true: {
        base: "justify-start",
      },
    },
    isMobile: {
      true: {
        barInner: "hidden",
      },
    },
    enablePointerEvents: {
      true: {
        iframe: "pointer-events-auto",
      },
      false: {
        iframe: "pointer-events-none select-none",
      },
    },
  },
  defaultVariants: {
    hasInitialWidth: false,
    isMobile: false,
    enablePointerEvents: true,
  },
});

export interface WindowResizerProps {
  iframeHeight?: string | number;
  iframeMinWidth?: number;
  iframeZoom?: number;
  iframeSrc?: string;
  iframeInitialWidth?: number;
  iframeTitle?: string;
}

const MIN_WIDTH = 320;

const WindowResizer: React.FC<WindowResizerProps> = (props) => {
  let constraintsResizerRef = React.useRef<HTMLDivElement>(null);
  let resizerRef = React.useRef<HTMLDivElement>(null);
  let iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [enablePointerEvents, setEnablePointerEvents] = React.useState(true);

  const isMobile = useIsMobile();

  const {
    iframeSrc,
    iframeTitle,
    iframeHeight: height = "420px",
    iframeZoom = 1,
    iframeInitialWidth,
    iframeMinWidth: minWidth = MIN_WIDTH,
  } = props;
  const hasInitialWidth = iframeInitialWidth !== undefined;

  const {main, base, barInner, barWrapper, bar, iframe, iframeWrapper} = resizer({
    hasInitialWidth,
    isMobile,
    enablePointerEvents,
  });

  const resizerX = useMotionValue(0);
  const browserWidth = useTransform(resizerX, (x) =>
    hasInitialWidth ? iframeInitialWidth + x + 14 : `calc(100% + ${x}px - 14px)`,
  );

  useIsomorphicLayoutEffect(() => {
    let observer = new window.ResizeObserver(() => {
      if (constraintsResizerRef.current && resizerRef.current) {
        let width = constraintsResizerRef.current.offsetWidth - resizerRef.current.offsetWidth;

        if (resizerX.get() > width) {
          resizerX.set(width);
        }
      }
    });

    constraintsResizerRef.current && observer.observe(constraintsResizerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!resizerRef.current) {
      return;
    }
    resizerRef.current.onselectstart = () => false;
  }, []);

  // inject iframe styles
  useEffect(() => {
    const iframeStyles = `
  body {
    zoom: ${iframeZoom};
  }
  `;

    if (!iframeRef.current) {
      return;
    }
    const iframeDocument = iframeRef.current.contentDocument;

    if (!iframeDocument) {
      return;
    }
    // add classname to the iframe html element
    iframeDocument?.documentElement?.classList?.add("overflow-hidden");

    const style = iframeDocument.createElement("style");

    if (style) {
      style.innerHTML = iframeStyles;
    }

    iframeDocument.head?.appendChild(style);
  });

  return (
    <div className={main()} style={{height}}>
      <motion.div
        className={iframeWrapper()}
        style={{
          width: isMobile ? "100%" : browserWidth,
        }}
      >
        <WindowActions />
        <motion.iframe ref={iframeRef} className={iframe()} src={iframeSrc} title={iframeTitle} />
      </motion.div>
      <div
        ref={constraintsResizerRef}
        className={base({
          className: "top-0 bottom-0 right-0 xs:w-mw-xs",
        })}
        style={{
          width: `calc(100% - ${hasInitialWidth ? iframeInitialWidth : minWidth}px - 20px)`,
        }}
      >
        <motion.div
          ref={resizerRef}
          _dragX={resizerX}
          className={barWrapper()}
          drag="x"
          dragConstraints={constraintsResizerRef}
          dragElastic={0}
          dragMomentum={false}
          style={{x: resizerX}}
          onDragEnd={() => {
            document.documentElement.classList.remove("dragging-ew");
            iframeRef.current?.classList.remove("dragging-ew");
            setEnablePointerEvents(true);
          }}
          onDragStart={() => {
            document.documentElement.classList.add("dragging-ew");
            iframeRef.current?.classList.add("dragging-ew");
            setEnablePointerEvents(false);
          }}
        >
          <div className={barInner()}>
            <div className={bar()} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WindowResizer;
