import { useMessages } from "../hooks/useMessages";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import { useState, useMemo } from "react";

function ScrollPage() {
  const { messages, loading } = useMessages();
  const [dataEnabled, setDataEnabled] = useState(false);
  const [authorEnabled, setAuthorEnabled] = useState(false);
  const [dataOrder, setDataOrder] = useState("newest");
  const [authorOrder, setAuthorOrder] = useState("az");

  const sortedMessages = useMemo(() => {
    if (!messages || !messages.length) return [];

    return [...messages].sort((a, b) => {
      const aRevs = a.reverberacions || [];
      const bRevs = b.reverberacions || [];

      if (!aRevs.length) return 1;
      if (!bRevs.length) return -1;

      if (dataEnabled) {
        const aDate = new Date(Math.max(...aRevs.map(r => new Date(r.data))));
        const bDate = new Date(Math.max(...bRevs.map(r => new Date(r.data))));
        return dataOrder === "newest" ? bDate - aDate : aDate - bDate;
      }

      if (authorEnabled) {
        const aAuthor = aRevs[0].remitent.toLowerCase();
        const bAuthor = bRevs[0].remitent.toLowerCase();
        if (authorOrder === "az") return aAuthor.localeCompare(bAuthor);
        if (authorOrder === "za") return bAuthor.localeCompare(aAuthor);
      }

      return 0;
    });
  }, [messages, dataEnabled, authorEnabled, dataOrder, authorOrder]);

  if (loading)
    return (<div className="min-h-screen flex items-center justify-center">Carregant missatges...</div>
    );

  if (!messages.length)
    return (<div className="min-h-screen flex items-center justify-center">Cap missatge disponible</div>
    );

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-500"
     style={{
    backgroundColor: "var(--primary)",
    color: "var(--secondary)",
  }}>
      <Header 
        dataEnabled={dataEnabled}
        setDataEnabled={setDataEnabled}
        authorEnabled={authorEnabled}
        setAuthorEnabled={setAuthorEnabled}
        dataOrder={dataOrder}
        setDataOrder={setDataOrder}
        authorOrder={authorOrder}
        setAuthorOrder={setAuthorOrder}
      />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <h1 className="text-2xl font-bold mt-8 mb-4">Reverbe - Missatges</h1>

        {sortedMessages.map((msg) => (
          <Card key={msg.id} data={msg} variant="scroll" dataEnabled={dataEnabled} authorEnabled={authorEnabled} />
        ))}
      </main>
    </div>
  );
}

export default ScrollPage;
