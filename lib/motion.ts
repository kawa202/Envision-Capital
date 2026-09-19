import type { Transition, Variants } from "motion/react";

/**
 * The Envision motion language.
 *
 * One principle governs everything here: motion exists to express hierarchy —
 * what arrives first is what matters first — and to make transitions legible.
 * It never exists to be noticed on its own. No bounce, no spring overshoot,
 * no perpetual float, no rotation.
 */

/** Editorial ease — decisive start, long settle. Used for type and layout. */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

/** Image ease — slower, heavier. Photography should feel weighty. */
export const EASE_IMAGE = [0.32, 0.72, 0, 1] as const;

export const transitions = {
  type: { duration: 0.85, ease: EASE_EDITORIAL } satisfies Transition,
  image: { duration: 1.1, ease: EASE_IMAGE } satisfies Transition,
  micro: { duration: 0.4, ease: EASE_EDITORIAL } satisfies Transition,
  menu: { duration: 0.5, ease: EASE_EDITORIAL } satisfies Transition,
};

/** Soft opacity + vertical translation. The default page entrance. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.type },
};

/** Parent that staggers its children's reveals. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Line-by-line headline reveal, masked by an overflow-hidden wrapper. */
export const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: EASE_EDITORIAL },
  },
};

/** Crossfade used by the service explorer and method image stages. */
export const crossfadeVariants: Variants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1, transition: transitions.image },
  exit: {
    opacity: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_IMAGE },
  },
};

/** Standard viewport trigger — fires once, slightly before full visibility. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

/**
 * Collapses a variant set to a plain fade when the user prefers reduced
 * motion. Translation and scale are removed entirely; content still appears.
 */
export function reduceVariants(
  variants: Variants,
  shouldReduce: boolean | null,
): Variants {
  if (!shouldReduce) return variants;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
}
