import React, { useState } from "react";
import { message, Button } from "antd";
import axios from "axios";
import { ActionSearchBar } from "./components/ui/action-search-bar";
import SelectDate from "./component/SelectDate";
import EmailInp from "./component/EmailInp";
import dayjs, { Dayjs } from "dayjs";
import styles from "./App.module.css";

const BookRenewalForm: React.FC = () => {
  const defaultDate: Dayjs = dayjs().add(15, "day"); // ✅ Default value as Dayjs object

  const [book, setBook] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [reminderDate, setReminderDate] = useState<Dayjs>(defaultDate); // ✅ Initialize with default

  const [loading, setLoading] = useState(false); // ✅ Loading state

  const sendToBackend = async () => {
    console.log(book, typeof reminderDate, reminderDate);
    if (!book || !email || !reminderDate) {
      message.error("Please provide all details before submitting.");
      return;
    }

    setLoading(true);
    try {
      const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
      const ApiUrl = `${backendApiUrl}/api/book-reminde`;
      // const ApiUrl = "http://localhost:5000/api/book-reminder";
      const response = await axios.post(`${ApiUrl}`, {
        book,
        email,
        reminderDate,
      });

      if (response.status === 201) {
        message.success("Reminder set successfully!");
      } else {
        message.error("Failed to set reminder.");
      }
    } catch (error) {
      message.error("Error sending request to backend.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.bookList}>
          <ActionSearchBar onFinish={(values) => setBook(values.label)} />
        </div>
        <div className={styles.emailDate}>
          <EmailInp getEmail={setEmail} />
          <SelectDate
            selectedDate={setReminderDate}
            defaultDate={defaultDate}
          />{" "}
          {/* ✅ Pass default */}
          <Button
            type="primary"
            loading={loading}
            onClick={sendToBackend}
            style={{ marginTop: "10px" }}
          >
            {loading ? "Setting reminder" : "Set Reminder"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookRenewalForm;
