"use client";

import { createListCollection } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";

export const CustomSelect = ({
  options,
  isInvalid,
  errorText,
  placeholder,
  label,
  value,
  onChange,
  onValueChange

}) => {
  return (
    <Field invalid={isInvalid} errorText={errorText}>
      <SelectRoot
        collection={frameworks}
        onValueChange={({ value }) => options.onChange(value)}
        size="sm"
        width="320px"
      >
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Sélectionnez une institution" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem item={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
