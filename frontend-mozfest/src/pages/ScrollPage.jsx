import { useSortedMessages } from "../hooks/useSortedMessages";
import Header from "../components/Header";
import Card from "../components/Card";
import FooterButtons from "../components/FooterButtons";

function ScrollPage() {
  const {
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
  } = useSortedMessages();

  if (loading) return <div>Carregant missatges...</div>;
  if (!sortedMessages.length) return <div>Cap missatge disponible</div>;

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
      <main className="w-full max-w-full overflow-x-hidden mx-auto px-3 sm:px-4 py-6 space-y-6"> 
        <h1 className="text-2xl font-bold mt-8 mb-4">A Collective Diary of Mozilla Festival</h1>
      {sortedMessages.map((msg) => (
        <Card key={msg.id} data={msg} variant="scroll" dataEnabled={dataEnabled} authorEnabled={authorEnabled} />
      ))}
      </main>
      <FooterButtons />
    </div>
  );
}
export default ScrollPage;