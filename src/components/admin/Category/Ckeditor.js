import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function Ckeditor() {
  const inputCkeditor = (event, editor) => {
    const data = editor.getData();
    setInputData({ ...inputData, description: data });
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      onInit={(editor) => {
        editor.plugins.get("FileRepository").createUploadAdapter = function (
          loader
        ) {
          return new UploadAdapter(loader);
        };
      }}
      onChange={inputCkeditor}
    
    />
  );
}
