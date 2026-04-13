/**
 * Custom modeling overlay: line breaks come from explicit newlines (title) and HTML structure
 * (body), not from automatic wrapping when font size or viewport changes.
 *
 * @see ModelingTextOverlayEditorSurface — Admin visual editor
 * @see ModelingSlotCustomTextOverlay — live site
 */
export const MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS = "whitespace-pre overflow-visible";

/** Sizes the layer to content width so no max-width constraint reflows text. */
export const MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS = "w-max max-w-none overflow-visible";
