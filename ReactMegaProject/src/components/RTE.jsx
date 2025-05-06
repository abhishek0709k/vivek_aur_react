import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, label, control, defaultValue = "" }) => {  // Proper destructuring
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field }) => (  // Using the full field object
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
            value={field.value}
            onEditorChange={(content) => {
              field.onChange(content);  // Properly update form state
            }}
            init={{
              menubar: true,
              branding: false,
              height: 500,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;