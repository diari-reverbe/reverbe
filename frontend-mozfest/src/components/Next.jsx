import React from "react";

function Next() {
  const items = [
    {
      title: "cristall neteja",
      desc: "Mostra només la informació essencial, minimitzant soroll i distraccions.",
    },
    {
      title: "anti-addicció",
      desc: "Redueix elements visuals i recorda el temps d'ús per fomentar descansos.",
    },
    {
      title: "mode metadades",
      desc: "Centrat en transparència: origen, trànsit i seguiment de dades.",
    },
    {
      title: "low res",
      desc: "Interfície minimalista i ecològica, sense luxes ni consum extra.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2 px-4">
      <span className="text-lg font-bold">properament</span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl opacity-40 cursor-not-allowed box-border">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-(--secondary) rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm leading-snug">{item.desc}</p>
            </div>

            <div className="self-end mt-4 w-5 h-5 bg-(--secondary) rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Next;
