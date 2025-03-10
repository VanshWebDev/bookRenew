import { Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

interface EmailInputProps {
  getEmail: (value: string) => void;
  placeholder?: string;
}

const EmailInp: React.FC<EmailInputProps> = ({
  getEmail,
  placeholder = "Enter your email",
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    getEmail(newEmail);

    if (!newEmail) {
      setError("Email is required!");
    } else if (!validateEmail(newEmail)) {
      setError("Enter a valid email address!");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <Input
      style={{height: '36px'}}
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={handleChange}
        prefix={<MailOutlined />}
        allowClear
        status={error ? "error" : ""}
      />
      {error && <Text type="danger">{error}</Text>}
    </div>
  );
};

export default EmailInp;
