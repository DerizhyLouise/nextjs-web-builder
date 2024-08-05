import type { BlockProperties, Editor } from "grapesjs";
import { PluginOptions } from ".";
import {
	typeButton,
	typeCheckbox,
	typeDate,
	typeForm,
	typeInput,
	typeLabel,
	typeRadio,
	typeSelect,
	typeTextarea,
	typeTime,
} from "./components";

export default function (editor: Editor, opt: Required<PluginOptions>) {
	const opts = opt;
	const bm = editor.BlockManager;
	const addBlock = (id: string, def: BlockProperties) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
		opts.blocks?.indexOf(id)! >= 0 &&
			bm.add(id, {
				...def,
				category: opts.category,
				select: true,
				...opt.block(id),
			});
	};

	addBlock(typeForm, {
		label: "Form",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
		content: {
			type: typeForm,
			components: [
				{
					components: [
						{ type: typeLabel, components: "Name" },
						{ type: typeInput },
					],
				},
				{
					components: [
						{ type: typeLabel, components: "Email" },
						{ type: typeInput, attributes: { type: "email" } },
					],
				},
				{
					components: [
						{ type: typeLabel, components: "Date" },
						{ type: typeInput, attributes: { type: "date" } },
					],
				},
				{
					components: [
						{ type: typeLabel, components: "Gender" },
						{ type: typeCheckbox, attributes: { value: "M" } },
						{ type: typeLabel, components: "M" },
						{ type: typeCheckbox, attributes: { value: "F" } },
						{ type: typeLabel, components: "F" },
					],
				},
				{
					components: [
						{ type: typeLabel, components: "Message" },
						{ type: typeTextarea },
					],
				},
				{
					components: [{ type: typeButton }],
				},
			],
		},
	});

	addBlock(typeInput, {
		label: "Input",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
		content: { type: typeInput },
	});

	addBlock(typeTextarea, {
		label: "Textarea",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>',
		content: { type: typeTextarea },
	});

	addBlock(typeSelect, {
		label: "Select",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>',
		content: { type: typeSelect },
	});

	addBlock(typeButton, {
		label: "Button",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
		content: { type: typeButton },
	});

	addBlock(typeLabel, {
		label: "Label",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 11.9c0-.6-.5-.9-1.3-.9H3.4c-.8 0-1.3.3-1.3.9V17c0 .5.5.9 1.3.9h17.4c.8 0 1.3-.4 1.3-.9V12zM21 17H3v-5h18v5z"/><rect width="14" height="5" x="2" y="5" rx=".5"/><path d="M4 13h1v3H4z"/></svg>',
		content: { type: typeLabel },
	});

	addBlock(typeCheckbox, {
		label: "Checkbox",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>',
		content: { type: typeCheckbox },
	});

	addBlock(typeRadio, {
		label: "Radio",
		media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>',
		content: { type: typeRadio },
	});
	addBlock(typeDate, {
		label: "Date",
		media: '<svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; height: 80px; width: 80px;" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/></svg>',
		content: { type: typeDate },
	});
	addBlock(typeTime, {
		label: "Time",
		media: '<svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; height: 80px; width: 80px;" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>',
		content: { type: typeTime },
	});
}
