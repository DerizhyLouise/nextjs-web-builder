import type { BlockProperties, Plugin } from "grapesjs";
import loadBlocks from "./blocks";
import loadComponents from "./components";
import loadTraits from "./traits";

export type PluginOptions = {
	/**
	 * Which blocks to add.
	 * @default ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio']
	 */
	blocks?: string[];

	/**
	 * Category name for blocks.
	 * @default 'Forms'
	 */
	category?: BlockProperties["category"];

	/**
	 * Add custom block options, based on block id.
	 * @default (blockId) => ({})
	 * @example (blockId) => blockId === 'input' ? { attributes: {...} } : {};
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	block?: (blockId: string) => {};
};

const plugin: Plugin<PluginOptions> = (editor, opts = {}) => {
	const config: Required<PluginOptions> = {
		blocks: [
			"form",
			"input",
			"textarea",
			"select",
			"button",
			"label",
			"checkbox",
			"radio",
			"date",
			"time",
		],
		category: { id: "forms", label: "Forms" },
		block: () => ({}),
		...opts,
	};

	loadComponents(editor);
	loadTraits(editor);
	loadBlocks(editor, config);
};

export default plugin;
