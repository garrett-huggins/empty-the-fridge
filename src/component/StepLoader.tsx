import { useEffect, useState } from "react";

interface param {
  state: number;
}

export default function StepLoader({ state }: param) {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    switch (state) {
      case 0:
        setValue(0);
        setText("Taking Image");
        break;
      case 1:
        setValue(33);
        setText("Anyalazing Ingredients");
        break;
      case 2:
        setValue(66);
        setText("Converting to Recipes");
        break;
      case 3:
        setValue(100);
        setText("Done!");
        break;
    }
  }, []);

  return (
    <div className="py-2 px-2">
      <div className="mb-1 text-lg font-medium text-black">{text}</div>
      <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-6 bg-blue-600 rounded-full dark:bg-blue-500"
          style={{ width: value.toString() + "%" }}
        ></div>
      </div>
    </div>
  );
}
