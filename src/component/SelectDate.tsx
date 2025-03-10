import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "DD-MM-YYYY";

interface SelectDateProps {
  selectedDate: (date: Dayjs) => void;
  defaultDate: Dayjs;
}

const SelectDate: React.FC<SelectDateProps> = ({
  selectedDate,
  defaultDate,
}) => {
  const minDate = dayjs().add(1, "day").startOf("day");
  const maxDate = dayjs().add(3, "month").endOf("day");

  // ✅ State for selected date
  const [selected, setSelected] = useState<Dayjs>(defaultDate);

  // ✅ Set initial day difference when component mounts
  useEffect(() => {
    dayjs().startOf("day");
  }, [defaultDate]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelected(date);
      selectedDate(date);

      // ✅ Recalculate difference on every selection
      const today = dayjs().startOf("day");
      date.diff(today, "day");
    }
  };

  return (
    <>
      <DatePicker
        style={{ height: "36px" }}
        value={selected}
        format={dateFormat}
        disabledDate={(current) =>
          current && (current < minDate || current > maxDate)
        }
        onChange={handleDateChange}
      />
      <p style={{ fontSize: "12px", color: "#808080" }}>
        Remind after:{" "}
        <strong style={{ color: "#000" }}>
          {selected.diff(dayjs().startOf("day"), "day")}{" "}
          {selected.diff(dayjs().startOf("day"), "day") === 1 ? "day" : "days"}
        </strong>
      </p>
    </>
  );
};

export default SelectDate;
