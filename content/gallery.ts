import type { GalleryItem } from "./types";

/**
 * ENVISION / IN CONTEXT
 * The economies and environments the firm advises within. This is evidence
 * of regional fluency, not decoration — every frame is captioned.
 */
export const galleryItems: GalleryItem[] = [
  {
    index: "01",
    category: "Trade & Capital",
    title: "Capital in motion",
    caption:
      "Regional trade is where financing structures are tested — tenor, currency and counterparty risk, all at once.",
    image: {
      src: "/images/gallery/trade-port.jpg",
      alt: "Container terminal handling regional trade freight from the air.",
    },
  },
  {
    index: "02",
    category: "Capital",
    title: "Harare's financial district",
    caption:
      "Zimbabwe's capital markets are small, closely held and unforgiving of weak preparation. We advise within them daily.",
    image: {
      src: "/images/gallery/harare-cbd-towers.jpg",
      alt: "Office towers in the Harare central business district.",
    },
  },
  {
    index: "03",
    category: "Industry",
    title: "Manufacturing and distribution",
    caption:
      "Working capital, input costs and foreign currency exposure — the three constraints that shape most industrial mandates we take on.",
    image: {
      src: "/images/gallery/industry-warehouse.jpg",
      alt: "Warehouse and distribution operations supporting regional manufacturing.",
    },
  },
  {
    index: "04",
    category: "Agriculture",
    title: "The agricultural economy",
    caption:
      "Seasonal cash cycles and commodity exposure demand funding structures built around how the sector actually earns.",
    image: {
      src: "/images/gallery/agriculture-maize.jpg",
      alt: "Maize crop in a commercial agricultural operation.",
    },
  },
  {
    index: "05",
    category: "Infrastructure",
    title: "Energy and infrastructure",
    caption:
      "Long-horizon assets, complex lender syndicates and capital structures that must survive decades of scrutiny.",
    image: {
      src: "/images/gallery/energy-grid.jpg",
      alt: "Electricity transmission infrastructure against an open sky.",
    },
  },
  {
    index: "06",
    category: "Transformation",
    title: "Modernising the finance function",
    caption:
      "Where finance functions are being rebuilt — better data, tighter controls, faster close, decisions made on evidence.",
    image: {
      src: "/images/gallery/technology.jpg",
      alt: "Technology infrastructure underpinning a modern finance function.",
    },
  },
  {
    index: "07",
    category: "Region",
    title: "Zimbabwe, and beyond it",
    caption:
      "Headquartered in Harare, advising across the region — with the contextual judgement that only comes from operating here.",
    image: {
      src: "/images/gallery/harare-city.jpg",
      alt: "Wide view across the Harare city skyline.",
    },
  },
];
