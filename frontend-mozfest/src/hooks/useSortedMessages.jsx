import { useState, useMemo } from "react";
import { useMessages } from "./useMessages";

export function useSortedMessages() {
  const { messages, loading } = useMessages();

  const [dataEnabled, setDataEnabled] = useState(false);
  const [authorEnabled, setAuthorEnabled] = useState(false);
  const [dataOrder, setDataOrder] = useState("newest");
  const [authorOrder, setAuthorOrder] = useState("az");

  const sortedMessages = useMemo(() => {
    if (!messages || !messages.length) return [];

    let result = [...messages];

    // Ordenar per data (mana data del missatge, no de la reverberacio)
    if (dataEnabled) {
      result.sort((a, b) => {
        const aDate = new Date(a.data);
        const bDate = new Date(b.data);

        if (dataOrder === "newest") return bDate - aDate;
        if (dataOrder === "oldest") return aDate - bDate;
        if (dataOrder === "random") return Math.random() - 0.5;
        return 0;
      });
    }

    // Ordenar per autor (corregir des de middleware)
    if (authorEnabled) {
      result.sort((a, b) => {
        const aAuthor = (a.remitent || "").toLowerCase();
        const bAuthor = (b.remitent || "").toLowerCase();

        if (authorOrder === "az") return aAuthor.localeCompare(bAuthor);
        if (authorOrder === "za") return bAuthor.localeCompare(aAuthor);
        if (authorOrder === "random") return Math.random() - 0.5;
        return 0;
      });
    }

    return result;
  }, [messages, dataEnabled, authorEnabled, dataOrder, authorOrder]);

  return {
    messages,
    sortedMessages,
    loading,
    dataEnabled,
    setDataEnabled,
    authorEnabled,
    setAuthorEnabled,
    dataOrder,
    setDataOrder,
    authorOrder,
    setAuthorOrder,
  };
}
