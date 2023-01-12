import type { Directive } from 'vue';

export const focus: Directive<HTMLElement, boolean> = {
  bind(el, binding) {
    const isFocus = binding.value ?? true;
    if (!isFocus) return;

    el.focus();
  },
};
