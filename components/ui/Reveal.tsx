"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  lineVariants,
  reduceVariants,
  riseVariants,
  staggerParent,
  viewportOnce,
} from "@/lib/motion";

/**
 * The element types these wrappers can render, resolved once at module scope.
 *
 * Deliberately a fixed map rather than `motion.create(tag)`: building a
 * component during render returns a new type on every pass, which remounts the
 * subtree and destroys the very animation being set up. Add a tag here when a
 * section needs one.
 */
const MOTION_TAGS = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  figure: motion.figure,
  blockquote: motion.blockquote,
} as const;

type MotionTagName = keyof typeof MOTION_TAGS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
  delay?: number;
};

/** Soft rise-and-fade on scroll into view. The workhorse entrance. */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: RevealProps) {
  const shouldReduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduceVariants(riseVariants, shouldReduce)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Wraps children so each direct child reveals in sequence. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delayChildren = 0,
}: RevealProps & { stagger?: number; delayChildren?: number }) {
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerParent(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

/** A single staggered item inside a RevealGroup. */
export function RevealItem({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay">) {
  const shouldReduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      variants={reduceVariants(riseVariants, shouldReduce)}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Masked line reveal for display typography. Each line sits in an
 * overflow-hidden wrapper and slides up from beneath it.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delayChildren = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delayChildren?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerParent(0.1, delayChildren)}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={reduceVariants(lineVariants, shouldReduce)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
