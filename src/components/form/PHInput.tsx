import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface PHInputProps {
  name: string;
  type?: string;
  label?: string | null;
  placeholder?: string;
  required?: boolean;
  validationMessage?: string;
}

const PHInput = ({
  name,
  type = "text",
  label,
  placeholder,
  required = true,
  validationMessage,
}: PHInputProps) => {
  const inputLabel = label || null;
  const inputPlaceholder = placeholder || `Enter your ${name}`;
  const message = validationMessage || `${inputLabel} is required`;

  return (
    <Controller
      name={name}
      rules={{ required: required ? message : true }}
      render={({ field }) => (
        <Form.Item label={inputLabel}>
          <Input
            {...field}
            type={type}
            id={name}
            size="large"
            placeholder={inputPlaceholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default PHInput;
