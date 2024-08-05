import basicBlocksPlugin from "@/components/blocks-basic";
import customCodePlugin from "@/components/components-custom-code";
import formPlugin from "@/components/components-forms";
import { historyField } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import GjsEditor from "@grapesjs/react";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import grapesjs, { Editor } from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";

const stateFields = { history: historyField };

const Gjs = () => {
	const onEditor = (editor: Editor) => {
		console.log("Editor loaded", { editor });
	};

	const serializedState = localStorage.getItem("myEditorState");
	const value =
		localStorage.getItem("myValue") || "console.log('hello world!')";

	return (
		<div>
			<GjsEditor
				grapesjs={grapesjs}
				grapesjsCss="grapes.min.css"
				options={{
					height: "100vh",
					storageManager: false,
				}}
				onEditor={onEditor}
				plugins={[
					gjsPresetWebpage,
					basicBlocksPlugin,
					formPlugin,
					customCodePlugin,
				]}
			/>
			<CodeMirror
				value={value}
				height="40vh"
				theme={aura}
				extensions={[javascript({ jsx: true })]}
				initialState={
					serializedState
						? {
								json: JSON.parse(serializedState || ""),
								fields: stateFields,
						  }
						: undefined
				}
				onChange={(value, viewUpdate) => {
					localStorage.setItem("myValue", value);

					const state = viewUpdate.state.toJSON(stateFields);
					localStorage.setItem(
						"myEditorState",
						JSON.stringify(state)
					);
				}}
			/>
		</div>
	);
};

export default Gjs;
