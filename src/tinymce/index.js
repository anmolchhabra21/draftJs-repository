import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function () {
  const editorRef = useRef(null);
  const [content, setContent] = useState(
    "This is the initial content of the editor."
  );

  const [text, setText] = useState();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const onEditorChange = function (a, editor) {
    // console.log(a);
    setContent(a);
    setText(editor.getContent({ format: "text" }));
    //console.log(editor);
  };
  return (
    <>
      <div style={{ height: "80px", overflow: "auto" }}>{text}</div>
      <Editor
        onEditorChange={onEditorChange}
        //initialValue={content}
        //outputFormat="text"

        value={content}
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "mentions advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | emoticons| help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          emoticons_append: {
            custom_mind_explode: {
              keywords: ["brain", "mind", "explode", "blown"],
              char: "🤯",
            },
          },
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
