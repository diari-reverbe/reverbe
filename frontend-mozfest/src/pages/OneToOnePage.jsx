import React, { useEffect, useState } from "react";
import { useSortedMessages } from "../hooks/useSortedMessages";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import FooterButtons from "../components/FooterButtons";

function OneToOnePage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [currentMessage, setCurrentMessage] = useState(null);

useEffect(() => {
  if (!loading && sortedMessages.length) {
    if (!id) {
      const randomIndex = Math.floor(Math.random() * sortedMessages.length);
      const randomMessage = sortedMessages[randomIndex];
      setCurrentMessage(randomMessage);
      navigate(`/style2/${randomMessage.id}`, { replace: true });
    } else {
      const msg = sortedMessages.find((m) => m.id === id);
      setCurrentMessage(msg || sortedMessages[0]);
    }
  }
}, [id, loading, sortedMessages, navigate]);

  if (loading || !currentMessage)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregant missatges...
      </div>
    );

  const currentIndex = sortedMessages.findIndex((m) => m.id === currentMessage.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % sortedMessages.length;
    const nextMessage = sortedMessages[nextIndex];
    setCurrentMessage(nextMessage);
    navigate(`/style2/${nextMessage.id}`);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + sortedMessages.length) % sortedMessages.length;
    const prevMessage = sortedMessages[prevIndex];
    setCurrentMessage(prevMessage);
    navigate(`/style2/${prevMessage.id}`);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center text-gray-900 transition-colors duration-500 px-4 sm:px-8 py-12"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--secondary)",
      }}
    >
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

      <Button
        variant="ghost"
        onClick={handlePrev}
        className="fixed left-5 md:left-10 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 shadow-lg backdrop-blur-md bg-[var(--secondary)]/20 hover:bg-[var(--secondary)]/30 border border-[var(--primary)]/30"
      >
        <span className="text-xl sm:text-2xl font-bold">←</span>
      </Button>

      <Button
        variant="ghost"
        onClick={handleNext}
        className="fixed right-5 md:right-10 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 shadow-lg backdrop-blur-md bg-[var(--secondary)]/20 hover:bg-[var(--secondary)]/30 border border-[var(--primary)]/30"
      >
        <span className="text-xl sm:text-2xl font-bold">→</span>
      </Button>

      <div className="w-full flex justify-center mt-12 mb-8">
        <Card data={currentMessage} variant="single" dataEnabled={dataEnabled} authorEnabled={authorEnabled}/>
      </div>

      <p className="text-sm text-gray-500 mb-10">
        Missatge {currentIndex + 1} de {sortedMessages.length}
      </p>

      <FooterButtons/>

    </div>
  );
}

export default OneToOnePage;
