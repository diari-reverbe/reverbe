import { useEffect, useState } from "react";
import { getMessages } from "../api/messages";

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages().then((data) => {
      if (Array.isArray(data)) {
        setMessages(data);
      }
      setLoading(false);
    });
  }, []);

  return { messages, loading };
}
