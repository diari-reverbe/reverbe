import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useMessages } from "../hooks/useMessages";
import FooterButtons from "../components/FooterButtons";
import Button from "../components/Button";

function PostItPage() {
  const { messages, loading } = useMessages();
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const pageSize = 6; // mostramos 6 por página

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregant missatges...
      </div>
    );

  if (!messages.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cap missatge disponible
      </div>
    );

  // cálculo de los mensajes visibles
  const start = page * pageSize;
  const visibleMessages = messages.slice(start, start + pageSize);

  // navegación
  const handleNext = () => {
    if (start + pageSize < messages.length) setPage(page + 1);
    else setPage(0); // vuelve al inicio
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
    else setPage(Math.floor(messages.length / pageSize)); // va al final
  };

  return (
    <div
      className="relative min-h-screen text-gray-900 transition-colors duration-500"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--secondary)",
      }}
    >
      <Header />

      {/* Botones laterales (igual que en 1:1) */}
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

      <main
        className="
           w-full max-w-7xl mx-auto mt-14
           p-4 sm:p-6 lg:p-8
           grid gap-6
           grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
           justify-items-center
           "
      >
        {visibleMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelected(msg)}
            className="cursor-pointer transform hover:scale-105 hover:rotate-1 transition"
          >
            <Card data={msg} variant="postit" />
          </div>
        ))}
      </main>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Pàgina {page + 1} de {Math.ceil(messages.length / pageSize)}
      </p>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <Card data={selected} variant="single" />
        </Modal>
      )}

      <FooterButtons />
    </div>
  );
}

export default PostItPage;
