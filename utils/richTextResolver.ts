import { richTextResolver } from "@storyblok/richtext";

const { render: renderHtmlString } = richTextResolver();

export { renderHtmlString };
