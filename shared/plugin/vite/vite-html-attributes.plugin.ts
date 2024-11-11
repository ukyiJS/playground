import type { Plugin } from 'vite';

type HTMLAttributes = Record<string, unknown>;

const camelToKebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const htmlAttributesPlugin = (attributes: HTMLAttributes): Plugin => ({
  name: 'html-attributes-plugin',
  transformIndexHtml(html) {
    const attributesString = Object.entries(attributes)
      .map(([key, value]) => {
        const kebabKey = camelToKebabCase(key);

        if (typeof value === 'boolean') return value ? kebabKey : '';

        return `${kebabKey}="${value}"`;
      })
      .filter(Boolean)
      .join(' ');

    return html.replace(/<html(.*)>/, `<html$1 ${attributesString}>`);
  },
});
