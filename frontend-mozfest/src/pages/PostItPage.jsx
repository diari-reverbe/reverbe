import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useMessages } from "../hooks/useMessages";

function PostItPage() {
  const { messages, loading } = useMessages();
  const [selected, setSelected] = useState(null);

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

  return (
    <div
      className="min-h-screen text-gray-900 transition-colors duration-500"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--secondary)",
      }}
    >
      <Header />
      <main
        className="
          max-w-7xl mx-auto mt-14
          p-4 sm:p-6 lg:p-8 
          grid gap-6
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        "
      >
        {messages.slice(0, 6).map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelected(msg)}
            className="cursor-pointer transform hover:scale-105 hover:rotate-1 transition"
          >
            <Card data={msg} variant="postit" />
          </div>
        ))}
      </main>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <Card data={selected} variant="single" />
        </Modal>
      )}
    </div>
  );
}

export default PostItPage;
