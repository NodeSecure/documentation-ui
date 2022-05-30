// Import Third-party Dependencies
import { Flags } from "@nodesecure/flags";

export interface RenderDocumentationUIOptions {
  /**
   * Prefetch all flags and cache them
   *
   * @default true
   */
  preCacheAllFlags?: boolean;
  /**
   * The default NodeSecure flag to load (the first one by default if none selected).
   */
  defaultFlagName?: Flags;
}

export function render(rootElement: HTMLElement, options: RenderDocumentationUIOptions): void;

export const VARS: {
  activeFlagsMenu: HTMLElement;
};
