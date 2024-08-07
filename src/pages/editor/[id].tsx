import basicBlocksPlugin from "@/components/blocks-basic";
import customCodePlugin from "@/components/components-custom-code";
import formPlugin from "@/components/components-forms";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import grapesjs from "grapesjs";
import gjsPresetWebPage from "grapesjs-preset-webpage";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [{ params: { id: "example-id" } }],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<{ id: string }> = async (
	context
) => {
	const { id } = context.params;
	return { props: { id } };
};

const Gjs = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [editor, setEditor] = useState(null);

	useEffect(() => {
		if (id) {
			const editor = grapesjs.init({
				container: "#gjs",
				plugins: [
					gjsPresetWebPage,
					basicBlocksPlugin,
					formPlugin,
					customCodePlugin,
				],
				height: "100vh",
				storageManager: {
					type: "remote",
					autosave: true,
					autoload: true,
					stepsBeforeSave: 1,
					id: "form-",
					options: {
						remote: {
							urlLoad: `../api/getPageDetail?id=${id}`,
							urlStore: `../api/savePageDetail?id=${id}`,
							fetchOptions: (opts) =>
								opts.method === "POST"
									? { method: "PATCH" }
									: {},
							onStore: (data) => ({ id: id, data }),
							onLoad: (result) => result.data,
						},
					},
				},
			});
			setEditor(editor);
		}
	}, [id]);

	return (
		<div>
			<div id="gjs"></div>
			<CodeMirror
				value={"console.log('Hello');"}
				height="40vh"
				theme={aura}
				extensions={[javascript({ jsx: true })]}
			/>
		</div>
	);
};

export default Gjs;
