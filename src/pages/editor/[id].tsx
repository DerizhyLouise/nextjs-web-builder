import basicBlocksPlugin from "@/components/blocks-basic";
import customCodePlugin from "@/components/components-custom-code";
import formPlugin from "@/components/components-forms";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import grapesjs, { Editor, ProjectData } from "grapesjs";
import grapesjsPluginExport from "grapesjs-plugin-export";
import gjsPresetWebPage from "grapesjs-preset-webpage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useRef, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

export const getServerSideProps: GetServerSideProps<{ id: string }> = async (
	context
) => {
	const id = (context.params?.id as string) || "";
	return { props: { id } };
};

const Gjs = ({
	id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [loading, setLoading] = useState(false);
	const [editor, setEditor] = useState<Editor>();
	const [code, setCode] = useState("");
	const codeRef = useRef("");

	const loadPage = (result: ProjectData) => {
		setLoading(true);
		try {
			codeRef.current = result.code;
			setCode(result.code);
			return result.data;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			const editor: Editor = grapesjs.init({
				container: "#gjs",
				plugins: [
					gjsPresetWebPage,
					basicBlocksPlugin,
					formPlugin,
					customCodePlugin,
					grapesjsPluginExport,
				],
				height: "100vh",
				storageManager: {
					type: "remote",
					autosave: true,
					autoload: true,
					stepsBeforeSave: 10,
					id: "form-",
					options: {
						remote: {
							urlLoad: `../api/getPageDetail?id=${id}`,
							urlStore: `../api/savePageDetail?id=${id}`,
							fetchOptions: (opts) =>
								opts.method === "POST"
									? { method: "PATCH" }
									: {},
							onStore: (data) => ({
								id,
								data,
								code: codeRef.current,
								html: editor.getHtml(),
								css: editor.getCss(),
							}),
							onLoad: (result) => loadPage(result),
						},
					},
				},
				commands: {},
			});

			editor.Panels.addButton("options", [
				{
					id: "save",
					className: "fa fa-floppy-o icon-blank",
					command: async () => {
						setLoading(true);
						try {
							await editor.store();
						} finally {
							setLoading(false);
						}
					},
					attributes: { title: "Save Template" },
				},
			]);

			editor.Panels.addButton("options", [
				{
					id: "export",
					className: "fa fa-download icon-blank",
					command: async () => {
						setLoading(true);
						editor.runCommand("gjs-export-zip");
						setLoading(false);
					},
					attributes: { title: "Save Template" },
				},
			]);

			editor.Panels.addPanel({
				id: "back-panel",
				visible: true,
				buttons: [
					{
						id: "back",
						className: "fa fa-arrow-left icon-blank font-normal",
						command: async () => {
							window.location.href = "../";
						},
						attributes: { title: "Back to Home Page" },
					},
				],
			});

			setEditor(editor);
		}
	}, [id]);

	return (
		<div>
			{loading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<RingLoader
						color={"#F45E43"}
						loading={loading}
						cssOverride={{ borderColor: "#F45E43" }}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			)}
			<div id="gjs"></div>
			<CodeMirror
				value={code}
				height="40vh"
				theme={aura}
				extensions={[javascript({ jsx: true })]}
				onChange={(value) => {
					codeRef.current = value;
					setCode(value);
				}}
			/>
		</div>
	);
};

export default Gjs;
