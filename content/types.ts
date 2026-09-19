/**
 * Content model for Envision Capital.
 *
 * Every entity below maps 1:1 to a future CMS collection. Components read
 * from `content/*` and never hard-code copy, so migrating to a headless CMS
 * is a matter of swapping the data source — not rewriting the UI.
 */

export type Image = {
  /** Omitted when no usable placeholder exists and the shot must be commissioned. */
  src?: string;
  /** Descriptive alt text. Never decorative-empty on editorial imagery. */
  alt: string;
  /** Art-direction note for the photographer commissioned to replace it. */
  direction?: string;
  /**
   * True when the available stock placeholder was rejected as unusable and the
   * slot renders a labelled commission panel instead. See docs/ART-DIRECTION.md
   * for the rejection reason against each slot.
   */
  commission?: boolean;
  /** Shown inside the commission panel — the shot to be art-directed. */
  brief?: string;
};

/** CMS collection: Services */
export type Service = {
  id: string;
  /** Two-digit editorial index, e.g. "01" */
  index: string;
  name: string;
  /** Mega-menu grouping */
  group: ServiceGroup;
  /** One-line positioning used in the mega-menu */
  summary: string;
  /** Full description used in the service explorer */
  description: string;
  /** Concrete deliverables — proof that the offer is real work, not a slogan */
  deliverables: string[];
  image: Image;
  /**
   * True for capability lines that appear in the redesign brief's navigation
   * but have no basis in supplied Envision material. Renders a development
   * flag; confirm or remove before launch.
   */
  unconfirmed?: boolean;
};

export type ServiceGroup =
  | "Transactions & Capital"
  | "Finance & Performance"
  | "Intelligence & Transformation";

/** CMS collection: Credentials */
export type Credential = {
  value: string;
  /** Rendered as a suffix so the numeral can animate independently */
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
  /** True until the figure is signed off by Envision. Renders a build-time flag. */
  unverified: boolean;
};

/** CMS collection: Method steps */
export type MethodStep = {
  index: string;
  name: string;
  /** One-line statement of the stage, used in the scroll sequence. */
  summary: string;
  question: string;
  description: string;
  outputs: string[];
  /**
   * Optional. The homepage Method is deliberately unillustrated — a
   * methodology is an argument, and photographs beside each stage compete
   * with it. Retained in the model for a future method detail page.
   */
  image?: Image;
};

/** CMS collection: Gallery Images */
export type GalleryItem = {
  index: string;
  category: string;
  title: string;
  caption: string;
  image: Image;
};

/** CMS collection: People */
export type Person = {
  id: string;
  name: string;
  role: string;
  /** Null while the profile is awaiting sign-off. */
  biography: string | null;
  expertise: string[];
  industries: string[];
  qualifications: string[];
  linkedin: string | null;
  image: Image;
  /** True until Envision supplies the verified profile. */
  placeholder: boolean;
};


/** CMS collection: Industries */
export type Industry = {
  index: string;
  name: string;
  /** What Envision actually does in this sector. */
  focus: string;
  /** The financial constraint that shapes most mandates here. */
  constraint: string;
};
