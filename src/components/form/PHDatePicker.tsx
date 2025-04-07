import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import type { DatePickerProps } from "antd";

type TDatePickerProps = {
  name: string;
  label?: string;
  disabledFuture?: boolean; // Option to disable future dates
  disabledPast?: boolean;   // Option to disable past dates
};

const PHDatePicker = ({ 
  name, 
  label, 
  disabledFuture = false, // Default true for DOB (only past dates)
  disabledPast = false 
}: TDatePickerProps) => {
  const disabledDate: DatePickerProps['disabledDate'] = (current) => {
    // Disable future dates if disabledFuture is true
    if (disabledFuture) {
      return current && current > dayjs().endOf('day');
    }
    // Disable past dates if disabledPast is true
    if (disabledPast) {
      return current && current < dayjs().startOf('day');
    }
    // No restrictions if both are false
    return false;
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              disabledDate={disabledDate}
              size="large"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;