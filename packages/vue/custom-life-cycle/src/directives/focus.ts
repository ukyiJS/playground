import type { ObjectDirective } from 'vue';

export const focus: ObjectDirective<HTMLElement, boolean> = {
  bind(el, binding) {
    const isFocus = binding.value ?? true;
    if (!isFocus) return;

    el.focus();
  },
};
