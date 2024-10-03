import React, { HTMLInputTypeAttribute, useRef } from "react";
import useModal from "../../../hooks/useModal";

interface TexteditorModalProps {
  defaultValue?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  argsSetter: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TexteditorModal(props: TexteditorModalProps) {
  const modal = useModal();

  const editorRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  function extractPythonFunction(
    text: string,
  ): { functionName: string; argumens: string[]; returnType: string } | null {
    const pythonFunctionRegex =
      /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*:/;
    const match = pythonFunctionRegex.exec(text);

    if (match) {
      const [, functionName, args] = match;
      const argumens = args
        .split(",")
        .map((arg) => arg.trim())
        .filter((arg) => arg !== "");
      return { functionName, argumens, returnType: "unknown" };
    } else {
      return null;
    }
  }

  return (
    <div className="bg-background p-5 rounded-md w-[50vw] flex flex-col gap-y-4 border border-mute/40">
      <textarea
        required
        className="bg-transparent border rounded-md p-2 resize-none h-[50vh] border-border"
        defaultValue={"def function_name(arg1, arg2):\n    return arg1 + arg2"}
        ref={editorRef}
      />
      <div className="flex gap-x-[4vw] px-[2vw]">
        <button
          type="button"
          className="flex-1 bg-background border border-border hover:bg-hoverbg text-back rounded-md py-2 font-medium transition-all"
          onClick={() => {
            if (!editorRef.current.checkValidity()) {
              alert("Please add a function");
              return;
            }
            const f = extractPythonFunction(editorRef.current.value);
            if (!f) {
              alert("Invalid Function");
              return;
            }

            console.log(f.argumens)
            props.setter(editorRef.current.value);
            props.argsSetter([
              ...f.argumens,
              'claimAmount',
              'claimDuration',
            ]);
            modal.hide();
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="flex-1 bg-red-600 hover:bg-red-500 transition-all text-front rounded-md py-2 font-medium"
          onClick={modal.hide}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
