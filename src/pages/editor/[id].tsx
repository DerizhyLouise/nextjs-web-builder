import basicBlocksPlugin from "@/components/blocks-basic";
import customCodePlugin from "@/components/components-custom-code";
import formPlugin from "@/components/components-forms";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import grapesjs from "grapesjs";
import gjsPresetWebPage from "grapesjs-preset-webpage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Gjs = () => {
	const [editor, setEditor] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const editor = grapesjs.init({
			container: "#gjs",
			plugins: [
				gjsPresetWebPage,
				basicBlocksPlugin,
				formPlugin,
				customCodePlugin,
			],
			height: "100vh",
		});
		setEditor(editor);
	}, []);

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
