import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Fragment } from "react";

export default function Index() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState([]);
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    
    
    /*console.log("editor", editorState.getCurrentContent())
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;*/
    
    // using Blocks in DraftJs for the spacing and rendering of new line
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    const value = blocks.map(
      (block) => (!block.text.trim() && " ") || block.text);

    console.log("value ", value, blocks);

    /*let text = blocks.reduce((acc, item) => {
      acc = acc + item.text;
      return acc;
    }, "");*/
    // let text = editorState.getCurrentContent().getPlainText("\u0001");
    // console.log("text", text)
    setText(value);
  };

  // const renderList = text
  // .map((item) =>
  // <div>{item}</div>
  // );

  return (
    <>
      <div>{draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div>
      <br />
      <div>
        {text.map((line, ind) => (
          <div key={ind} style={{ overflow: "auto", whiteSpace:"pre" }}>{line}</div>
        ))}
      </div>
      {console.log("text", text[0], typeof text)}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
          ],
        }}
      />
    </>
  );
}
