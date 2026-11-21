import {
  createPropDefinition,
  normalizeString
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/width-BJNhiv_8.js
function normalizeDialogCallbacks(value) {
  if (typeof value !== "object" || value === null) {
    throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
  }
  const { onCancel, onClose, onToggle } = value;
  const callbacks = {};
  if (typeof onCancel === "function") {
    callbacks.onCancel = onCancel;
  }
  if (typeof onClose === "function") {
    callbacks.onClose = onClose;
  }
  if (typeof onToggle === "function") {
    callbacks.onToggle = onToggle;
  }
  return callbacks;
}
var dialogCallbacksProp = createPropDefinition("on", {}, normalizeDialogCallbacks);
var widthProp = createPropDefinition("width", "100%", normalizeString);

export {
  dialogCallbacksProp,
  widthProp
};
//# sourceMappingURL=chunk-ECNWMIMC.js.map
