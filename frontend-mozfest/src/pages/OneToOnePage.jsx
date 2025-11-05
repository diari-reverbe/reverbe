import React, { useEffect, useState } from "react";
import { useMessages } from "../hooks/useMessages";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";

function OneToOnePage() {
  const { messages, loading } = useMessages();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(null);

useEffect(() => {
  if (!loading && messages.length) {
    if (!id) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      const randomMessage = messages[randomIndex];
      setCurrentMessage(randomMessage);
      navigate(`/style2/${randomMessage.id}`, { replace: true });
    } else {
      const msg = messages.find((m) => m.id === id);
      setCurrentMessage(msg || messages[0]);
    }
  }
}, [id, loading, messages, navigate]);

  if (loading || !currentMessage)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregant missatges...
      </div>
    );

  const currentIndex = messages.findIndex((m) => m.id === currentMessage.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % messages.length;
    const nextMessage = messages[nextIndex];
    setCurrentMessage(nextMessage);
    navigate(`/style2/${nextMessage.id}`);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + messages.length) % messages.length;
    const prevMessage = messages[prevIndex];
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
      <Header />

      <Button
        variant="secondary"
        onClick={handlePrev}
        className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 shadow-lg"
      >
        ←
      </Button>

      <Button
        variant="secondary"
        onClick={handleNext}
        className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 shadow-lg"
      >
        →
      </Button>

      <div className="w-full flex justify-center mt-12 mb-8">
        <Card data={currentMessage} variant="single" />
      </div>

      <p className="text-sm text-gray-500 mb-10">
        Missatge {currentIndex + 1} de {messages.length}
      </p>
    </div>
  );
}

export default OneToOnePage;
