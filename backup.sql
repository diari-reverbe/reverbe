--
-- PostgreSQL database dump
--

\restrict h9JthdqXuiECs5ChNSPYfPvAUQhbXsr81HB7YRTjRsQ4HKz6feydrZOwpHxX4pa

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: missatges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missatges (
    id uuid NOT NULL,
    assumpte text,
    remitent text,
    cos text,
    data timestamp without time zone,
    adjunts text,
    message_id text,
    cc text
);


ALTER TABLE public.missatges OWNER TO postgres;

--
-- Name: missatges_reverberats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missatges_reverberats (
    id uuid NOT NULL,
    missatge_original_id uuid,
    assumpte text,
    remitent text,
    cos text,
    data timestamp without time zone,
    in_reply_to text,
    adjunts text
);


ALTER TABLE public.missatges_reverberats OWNER TO postgres;

--
-- Name: reverberadors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reverberadors (
    id uuid NOT NULL,
    correu text,
    estat text,
    categoria text,
    url text
);


ALTER TABLE public.reverberadors OWNER TO postgres;

--
-- Data for Name: missatges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missatges (id, assumpte, remitent, cos, data, adjunts, message_id, cc) FROM stdin;
f8c0cccc-ffc0-48f9-b119-f85c0f7cffea	[Diari] "Ram"	diari@raio.issim.net	Assumpte: Ram\r\n\r\nMissatge:\r\nEl joc és la millor gimnàsia\r\n\r\nAdjunts:\r\n\r\n_______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\n	2025-06-11 11:13:30	\N	<m2kDSYLsW75kB2KpBsPCm3TW5sippizTrAXWFAyQ@raio.issim.net>	WordPress <anonim@issim.net>
84b4a8ad-d8be-486a-8369-38ea8123af10	[Diari] Despertador	diari@raio.issim.net	Quines ganes de despertar-se sense despertador\r\n	2025-06-11 11:12:41	\N	<CADnrKmN5Ov8F0UDEV7Ji09n42qt+2B0-XY8dO3BcCC7=5vQP2g@mail.gmail.com>	Roc Domingo Puig <domingo.roc@gmail.com>
246290d8-fa7f-4651-9da4-acdf7960f7c1	[Diari] Holi	diari@raio.issim.net	Holi dirari wapi\r\nAixò és una mica un test, estem aquí de chill a les Mòniques.\r\nÉs 11 de Juny de 2025 i fa una calor horrible, com que avui les\r\ntemperatures han pujat dos graus més i amb el mal que em fa el cos no ho\r\naguanto més.\r\nHem hagut de ser gravats avui x les xarxes de les Mòniques i a total els ha\r\nfet una mica de pal. Hem fet pseudo reunio avui i ara en Quelic està\r\nexplicant Raio.\r\n\r\n\r\nale adeu\r\n	2025-06-11 11:12:53	\N	<CAC2U5zp6H3mYHpZQPvPG41ODywjG_GtdS4XoZaRz=PfLko6kPQ@mail.gmail.com>	Helena Roig Prats <helenaroigprats@gmail.com>
b7a0d472-f942-4c14-b711-6551f41b09b8	[Diari] "Sobre la dificultad de recordar un jueves por la mañana"	diari@raio.issim.net	Assumpte: Sobre la dificultad de recordar un jueves por la mañana\r\n\r\nMissatge:\r\nCuando la disposición del tiempo es espiralado, aka, desde hace unos meses en los que el vértice, aka, lo que mueve sin moverse fuera pero dentro del propio cuerpo, succiona con más fuerza que nunca. Digo, cuando el tiempo gira sobre sí mismo mientras desplaza su caída, los recuerdos salen despedidos con una velocidad lateral extremada que, junto con el roce prefrontal, los inflama a su paso por la carne. Vacío de recuerdos. Lleno de una sustancia temporal altamente pegajosa.\r\n\r\nAdjunts:\r\n\r\n_______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\n	2025-06-19 08:06:41	\N	<RGbC3qEIafAiVgIZPbo3QqrrZaAMuHFmNGGqdcSfWCk@raio.issim.net>	WordPress <anonim@issim.net>
81410a66-e2cd-4e37-bb2d-209c205e0eff	[Diari] "Recuerdo recuerdo"	diari@raio.issim.net	Assumpte: Recuerdo recuerdo\r\n\r\nMissatge:\r\nUn día de invierno pero soleado, frío pero cálido, dentro de la institución pero fuera de ella, escuchando pero ensimismando, hablando pero callando. Nos recuerdo en la terraza pero inclinada, en el conflicto pero en el estar juntas. Los demás pero yo, yo pero los demás, tu pero yo, yo pero tu. El dinero pero la responsabilidad, la responsabilidad pero la vida, la vida pero el tiempo, el tiempo pero los plazos, los plazos pero el privilegio.\r\n\r\nAdjunts:\r\n\r\n_______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\n	2025-06-19 08:10:40	\N	<EdJqUR7OnHUBh8WTiT4sfusbpLBTJhwbJ7KEFHDlQ@raio.issim.net>	WordPress <anonim@issim.net>
1accc605-14e8-4932-98f4-e9d7f1712bb8	[Diari] "Recuerdo en la ventana"	diari@raio.issim.net	Assumpte: Recuerdo en la ventana\r\n\r\nMissatge:\r\nLa luz del mediodía,\r\nen la sala d’actes va,\r\ntras los cristales están\r\nlos gremios que surgían.\r\n\r\nAdjunts:\r\n\r\n_______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\n	2025-06-19 09:30:22	\N	<gC6JTFH3rSHHedOCToTOMJO2qJ03zwMjRMuX8GInVs@raio.issim.net>	WordPress <anonim@issim.net>
7f9e0b3f-d695-4de8-afb1-89f6af18cf8f	[Diari] "ara"	diari@raio.issim.net	Assumpte: ara\r\n\r\nMissatge:\r\nhttps://www.youtube.com/watch?v=JPLzNL3cmxk\r\n\r\nAdjunts:\r\n\r\n_______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\n	2025-06-19 15:28:27	\N	<Deh0FkVQUlsjdjg3dG61skWkrHqspvdCTs8KNtprEA@raio.issim.net>	WordPress <anonim@issim.net>
722b14e4-967a-4132-a926-fdeed735afd0	[Diari] "Latido De Extinción"	diari@raio.issim.net	Assumpte: Latido De Extinción\r\n\r\nMissatge:\r\nEstamos en tierra robada\r\nCodicia domina\r\n¿Para dónde vamos si no actuamos?\r\nExtinción nos espera y ya casi está cerca.\r\nPlaneta planeta planeta muerto.\r\nMientras asistimos a la caída del capitalismo\r\nYa no más con los ricos\r\nEmpresas contaminantes\r\nDeber reparar sociedades que han sentido los impactos\r\nMientras asistimos a la caída del capitalismo\r\nYa no más con los ricos\r\n\r\nhttps://www.youtube.com/watch?v=ayGCw24VgDM&list=OLAK5uy_l3BvPsTCZdcm0rXdwqVA60I9Pm06icfmE&index=9\r\n\r\nAdjunts:\r\n\r\n_______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\n	2025-06-19 19:51:15	\N	<OaZhRmGkzvduMeKfuHuclTCQzHCuBvzxfTZgIJD84Y@raio.issim.net>	WordPress <anonim@issim.net>
e8310b8d-53aa-4edf-8d46-aa3a53dfb950	[Diari] "Friedrich Strass"	diari@raio.issim.net	Assumpte: Friedrich Strass\r\n\r\nMissatge:\r\nEste increíble mapa de Friedrich Strass publicado en 1803 en su obra'Der Strom der Zeiten' me ha recordado al mapa que hicimos ayer. Diferentes colores, recorridos, direccionaliadad, historia, eventos...........\r\n\r\nAdjunts:\r\nstream-of-time-3.jpg\r\n	2025-06-19 11:32:03	https://caotic.maadix.org/hyperkitty/hyperkitty/list/diari@raio.issim.net/message/HHOMVGVWEYKH66P5VNYP4EM3J7GYIYSZ/attachment/2/stream-of-time-3.jpg	<g3tVOD6f7CXpge5kEVwVvycK4oaWPXEnXC9769AKsoE@raio.issim.net>	WordPress <anonim@issim.net>
61f82ee3-f74e-45ff-afd7-b88dda4791d3	[Diari] (sense assumpte)	diari@raio.issim.net	4 de setembre de 2023.\r\nAcabo d’entrar a Sala dActes. Ens han donat una capsa amb material dels\r\ngremis anteriors.\r\nEns han donat una tassa a cadascu que posa Santa Monica\r\nTambe un joc de cartes amb paraulotes insittucionals fetes arrel del nou\r\nenfoc del centre de direcció.\r\n\r\nHe conegut les meves companyes de gremi i sembla que la cosa pinta\r\ndivertida. Som les tres molt diferents.\r\nAixo de treballar tot el curs amb dues persones que no conec sempre es\r\nestimulant. Espero aprendre moltes coses i passarho be.\r\n\r\nHem dinat un cattering força bo, amb alguns sabors que no coneixia.\r\n\r\nLa coordi de moniques sembla nerviosa, i el director del centre sembla un\r\nhome força institucionalitzat.\r\n\r\nLa resta de monis son també molt diferents. De sobte semblem totes una\r\nmostra representativa de dividencies socials per tot tipus de\r\ncircumstancies. Serà moniques un experiment sociologic? Sera un espai de\r\nprofessionalitzacio? Sera un espai de cures i de processos colectius?\r\n\r\n       *Martí de la Malla*\r\n*https://martimalla.hotglue.me/ <https://martimalla.hotglue.me/>*\r\n           +34 664 468 989\r\n	2025-06-21 20:12:57	\N	 <CAPHOd7xt=+RECak7ynR-aOgP0S44uTNs-MPAcB6xRir1b+-UKw@mail.gmail.com>	Martí de la Malla <martimalla@gmail.com>
96cbb1b3-a623-4fa0-ac67-012bb283b573	[Diari] Invocació de Yassine :)	diari@raio.issim.net	www.violetaospina.com	2025-06-19 17:45:50	https://caotic.maadix.org/hyperkitty/hyperkitty/list/diari@raio.issim.net/message/ZZ4ZDY4Q5JVGGWPTZVW35IXIKYMT63BK/attachment/4/1000015853.jpg	 <CAPLBp9gcU5CV9bFaKjDWDXrYg6fGwzRPywJqGs3cpChJJvauzA@mail.gmail.com>	Violeta Ospina Domínguez <viotitaos@gmail.com>
\.


--
-- Data for Name: missatges_reverberats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missatges_reverberats (id, missatge_original_id, assumpte, remitent, cos, data, in_reply_to, adjunts) FROM stdin;
b2e86d28-4b14-4739-a469-11844db94e2d	f8c0cccc-ffc0-48f9-b119-f85c0f7cffea	[Futurs] Re: [Diari] "Ram"	futurs@raio.issim.net	i el futur és una festa\r\n\r\n\r\n\r\n\r\n> On 17 Jun 2025, at 20:27, central@mail.issim.net wrote:\r\n> \r\n> Assumpte: Ram\r\n> \r\n> Missatge:\r\n> El joc és la millor gimnàsia\r\n> \r\n> Adjunts:\r\n> \r\n> _______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net\r\n> \r\n> \r\n> [centraleta-id: f8c0cccc-ffc0-48f9-b119-f85c0f7cffea]\r\n\r\n	2025-06-17 20:46:32	<F8F17134-BA36-46D2-97D3-DD4785EC1175@gmail.com>	\N
563d84ae-5ab5-45e0-9c36-a2e92bbb740f	81410a66-e2cd-4e37-bb2d-209c205e0eff	[Ihopethismessagefindsyouwell] Re: [Diari] "Recuerdo recuerdo"	ihopethismessagefindsyouwell@raio.issim.net	￼                       _  _  _  _ _   _ _ _ //)(-_) _) (-/)(/(-/                _/      > El 19 juny 2025, a les 11:03, central@mail.issim.net va escriure:> > Assumpte: Recuerdo recuerdo> > Missatge:> Un día de invierno pero soleado, frío pero cálido, dentro de la institución pero fuera de ella, escuchando pero ensimismando, hablando pero callando. Nos recuerdo en la terraza pero inclinada, en el conflicto pero en el estar juntas. Los demás pero yo, yo pero los demás, tu pero yo, yo pero tu. El dinero pero la responsabilidad, la responsabilidad pero la vida, la vida pero el tiempo, el tiempo pero los plazos, los plazos pero el privilegio.> > Adjunts:> > _______________________________________________Llista de correu Diari -- diari@raio.issim.net Per donar-se de baixa envieu un correu a diari-leave@raio.issim.net> > > [centraleta-id: 81410a66-e2cd-4e37-bb2d-209c205e0eff]	2025-06-20 13:10:44	<97DE76E8-3040-43B5-B95F-F3F7BC7A446C@gmail.com>	https://caotic.maadix.org/hyperkitty/hyperkitty/list/ihopethismessagefindsyouwell@raio.issim.net/message/SLWOXINZ2GMKBQVPXF54YURZ3CWBSFPZ/attachment/4/me-quiere.gif
5c5a77b5-9ebe-4294-9afa-ea33c027b7e6	84b4a8ad-d8be-486a-8369-38ea8123af10	[Ihopethismessagefindsyouwell] Re: [Diari] Despertador	ihopethismessagefindsyouwell@raio.issim.net	￼\r\n\r\n\r\n\r\n\r\n                      \r\n _  _  _  _ _   _ _ _ \r\n//)(-_) _) (-/)(/(-/  \r\n              _/      \r\n\r\n> El 18 juny 2025, a les 9:52, central@mail.issim.net va escriure:\r\n> \r\n> Quines ganes de despertar-se sense despertador\r\n> \r\n> \r\n> [centraleta-id: 84b4a8ad-d8be-486a-8369-38ea8123af10]\r\n\r\n	2025-06-20 13:19:01	<7ED5A42C-A081-4066-99BE-224B3C746527@gmail.com>	https://caotic.maadix.org/hyperkitty/hyperkitty/list/ihopethismessagefindsyouwell@raio.issim.net/message/SSZ3VAGQT3HHCLZD25U54SGK3OGIEB4N/attachment/4/count.gif
c8b8b508-8551-469d-b3e5-0924445953cd	84b4a8ad-d8be-486a-8369-38ea8123af10	[Futurs] Re: [Diari] Despertador	futurs@raio.issim.net	Per als midiovans, el futur és com un despertador. La seva concepció del temps no contempla l’existència del passat, i de fet constitueixen una societat sense historiadors ni literatura. El seu sentit del temps es divideix en dues preguntes: què està passant, i què ha de passar. Per això, orienten la seva vida a moments que intuïen determinants, i que han estat establerts en algun moment (a ningú li preocupa saber quan; tant podia tractar-se de dies com de segles) pels seus degans. Com que els midiovans viuen el temps com un desgast, alguns dels seus membres es dediquen a oscar reiteradament una roca, fins que arriba el moment que s’havia fixat. Aleshores, la pregunta de què està passant adquireix una major importància, i és en aquests moments de despertar col·lectiu que rau la felicitat absoluta dels midiovans. \r\n\r\n\r\n\r\n\r\n\r\n> On 18 Jun 2025, at 09:52, central@mail.issim.net wrote:\r\n> \r\n> Quines ganes de despertar-se sense despertador\r\n> \r\n> \r\n> [centraleta-id: 84b4a8ad-d8be-486a-8369-38ea8123af10]\r\n\r\n	2025-06-24 19:44:31	<2FF36096-ACBD-480A-A5B1-2963EC419D1C@gmail.com>	\N
01f02ea0-f74e-45ff-afd7-b88dda4791d3	61f82ee3-f74e-45ff-afd7-b88dda4791d3	[Futurs] Re: [Diari] (sense assumpte)	futurs@raio.issim.net	Potser injustament, els toimb han merescut poca atenció. El seu escàs nombre, unit a les similituds que presenten amb els humans de la Terra, ha fet que se’ls hagi vist sovint com una pura anècdota, sense el benefici de l’exotisme dels dioll, els krohg o els strassi. De fet, hi ha indicis que apunten que els toimb, en comptes de desenvolupar-se naturalment, podrien procedir d’un experiment realitzat pels humans a l’espai, abans de la Gran Purga que va esborrar dràsticament els registres històrics terrans. Tot i així, els toimb presenten dues peculiaritats, pel que fa a la seva concepció del temps i del futur, que val la pena no passar per alt. En primer lloc, es tracta d’una societat sense rellotges. Les hores, en llenguatge toimb, són sempre estimacions, i tot i el seu alt nivell de desenvolupament tecnològic, segueixen basant les seves interaccions en la incertesa d’unes referències temporals vagues i intuïtives. De fet, ni tan sols les computadores toimb disposen de rellotge, sinó que funcionen amb fluctuacions analògiques d’energia que extreuen dels mateixos materials amb què estan fabricades. Introduïm aquest apunt tècnic per mostrar fins a quin punt és troncal aquest rebuig del temps paramètric en la cosmovisió dels toimb. Un segon aspecte sorprenent és  que, quan parlen, sempre es refereixen al futur amb paraulotes. Qualsevol al·lusió a un temps futur va acompanyada per un adjectiu denigrant o malsonant, sense que hi hagi una correspondència evident entre el contingut de la paraulota i el que esperen del futur a què es refereixen. Els motius d’aquest comportament romanen un misteri._______________________________________________Futurs mailing list -- futurs@raio.issim.netTo unsubscribe send an email to futurs-leave@raio.issim.net	2025-06-25 00:46:34	\N	\N
194a77bd-a7b2-45ff-afd7-b88dda4791d3	e8310b8d-53aa-4edf-8d46-aa3a53dfb950	[Futurs] Re: [Diari] "Friedrich Strass"	futurs@raio.issim.net	Per als strassi, el futur és com un mapa. Amb un dels comportaments més incomprensibles per als humans de tot l’univers conegut, els strassi actuen des del convenciment que l’espai no és sinó una projecció del temps. Per això l’arquitectura dels strassi no té res a veure amb l’humana, i de fet no es pot considerar ni tan sols arquitectura, ja que no realitza la funció amb què nosaltres l’entenem. Les ciutats strassi semblen llargues trinxeres cavades a terra, que s’estenen de manera caòtica durant milers de quilòmetres, al llarg d’un paisatge àrid i desolat. La funció d’aquests talls fets al terreny no és oferir aixopluc ni delimitar l’espai, sinó que forma part del cicle vital de cada strasse cavar la terra d’acord amb la seva edat, les seves filiacions i els seus somnis. De dia, els strassi poden ser vistos enfeinats amb la seva constant tasca eterna, mentre que de nit s’ajeuen a qualsevol racó, coberts amb qualsevol cosa. Es podria dir que la societat strasse està íntegrament consagrada a l’escriptura, amb la devoció de qui deixa constància de tot el que és i ha estat. El seu planeta és el registre més minuciós i acurat de l’univers, però cap dels seus habitants ha viscut mai._______________________________________________Futurs mailing list -- futurs@raio.issim.netTo unsubscribe send an email to futurs-leave@raio.issim.net	2025-06-24 22:16:13	\N	\N
5eaa43a3-df8e-4c9d-810a-d057f089f826	1accc605-14e8-4932-98f4-e9d7f1712bb8	[Futurs] Re: [Diari] "Recuerdo en la ventana"	futurs@raio.issim.net	Per als dioll, el futur és indistingible del passat. Tot el que fan ho fan des del convenciment que el passat és davant seu per rebre’ls, i que tot ja s’ha fet abans. Una mentalitat humana ingènua pot confondre fàcilment aquesta creença amb el concepte terrà de destí, o amb la circularitat del temps que entenen algunes poblacions humanes. La mentalitat dels dioll és molt més intraduïble. La seva comprensió del passat futur no elimina la seva curiositat pel futur, com si es tractés de llegir un llibre prèviament escrit. D’entre els dioll, hi ha individus que en recorden algunes pàgines, i són capaços de predir (predir és un verb massa esbiaixadament humà, però manca una millor paraula per descriure el que ells anomenen iangvé) episodis que es produïran a la perfecció, com si ho haguessin sabut sempre. Tots els dioll neixen amb aquesta memòria fragmentària de l’univers, però no tots arriben a veure-la realitzada. Els dioll que retroben els seus records en el futur són considerats agraciats i poden viure una vida plena. Alguns són capaços de retrobar diversos records al llarg dels anys. En canvi, els que encara no han retrobat mai els seus records s’anomenen udi i viuen amb la tristesa de no saber si el temps els rebrà. Morir udi és com no haver nascut mai, i per això la gent no parla mai dels qui han mort així. De fet, no hi ha ni tan sols un nom per anomenar-los.	2025-06-24 22:08:36	\N	\N
d1d1d103-9aa4-451f-aea4-e975ced495e2	b7a0d472-f942-4c14-b711-6551f41b09b8	[Futurs] Re: [Diari] "Sobre la dificultad de recordar un jueves por la mañana"	futurs@raio.issim.net	Els dibuts són una societat peculiar que presenta certes diferències anatòmiques destacables respecte als humans. El més cridaner, i el que ha capturat la imaginació de tants infants humans al llarg dels anys, és que semblen no tenir cap. En realitat sí que en tenen, però el tenen dins del cos, replegat com si estigués protegit per una vaina. Els dibuts són individus corpulents, i el seu cap anatòmic s’ubica rere la part superior de l’estèrnum. Del que els dibuts no disposen és de boca, tot i que sí que hi veuen i hi senten a través d’unes mucoses situades allà on un humà tindria el coll. El fet de conformar una societat muda ha permès als dibuts desenvolupar una altra manera de comunicar-se, que fa ús de la rotació dels braços i del moviment del tronc. Probablement degut a la seva menor capacitat ocular i a la peculiar posició del seu cap dins el tors, els moviments amb què es comuniquen els dibuts sempre són amplis i contundents, la qual cosa fa que els seus edificis resultin monumentals a ulls humans: els cal molt d’espai per dir-se el que es volen dir._______________________________________________Futurs mailing list -- futurs@raio.issim.netTo unsubscribe send an email to futurs-leave@raio.issim.net	2025-06-24 23:52:11	<7B04D611-C59F-49F9-B025-64F70766D494@gmail.com>	\N
a8b5a9e2-5d77-4e7e-b647-d36f4441a2e1	81410a66-e2cd-4e37-bb2d-209c205e0eff	[Futurs] Re: [Diari] "Recuerdo recuerdo"	futurs@raio.issim.net	Per als auè-auè, el futur sempre és un contratemps. I per poder entrar al contratemps, s’ha de facilitar un intercanvi. Els auè-auè no accepten res del que els passa si no efectuen un sacrifici, una ofrena d’acceptació. Tant se val si el que els passa és fruit d’un desig o bé una circumstància sobrevinguda aliena al seu control. Per tal de rebre el futur, cal desprendre’s d’alguna cosa. Al llarg de la seva història, els auè-auè han excel·lit en l’art d’intercanviar el futur pel passat. Per a un ull forà, aquests intercanvis poden arribar a ser invisibles, ja que sovint no es tracta de permutes materials evidents. Un auè-auè pot decidir, per exemple, desprendre’s d’una esperança, o deixar de contestar a un amic, o negar-se a mirar el sol de per vida._______________________________________________Futurs mailing list -- futurs@raio.issim.netTo unsubscribe send an email to futurs-leave@raio.issim.net	2025-06-24 21:58:00	\N	\N
c63da6e1-1c87-4736-8559-812910aa2dcf	1accc605-14e8-4932-98f4-e9d7f1712bb8	[Ihopethismessagefindsyouwell] Re: [Futurs] [Diari] "Recuerdo en la ventana"	ihopethismessagefindsyouwell@raio.issim.net	￼\r\n\r\n _  _  _  _ _   _ _ _ \r\n//)(-_) _) (-/)(/(-/  \r\n              _/     \r\n\r\n> On 25 Jun 2025, at 08:02, central@mail.issim.net wrote:\r\n> \r\n> Per als dioll, el futur és indistingible del passat. Tot el que fan ho fan des del convenciment que el passat és davant seu per rebre’ls, i que tot ja s’ha fet abans. Una mentalitat humana ingènua pot confondre fàcilment aquesta creença amb el concepte terrà de destí, o amb la circularitat del temps que entenen algunes poblacions humanes. La mentalitat dels dioll és molt més intraduïble. La seva comprensió del passat futur no elimina la seva curiositat pel futur, com si es tractés de llegir un llibre prèviament escrit. D’entre els dioll, hi ha individus que en recorden algunes pàgines, i són capaços de predir (predir és un verb massa esbiaixadament humà, però manca una millor paraula per descriure el que ells anomenen iangvé) episodis que es produïran a la perfecció, com si ho haguessin sabut sempre. Tots els dioll neixen amb aquesta memòria fragmentària de l’univers, però no tots arriben a veure-la realitzada. Els dioll que retroben els seus records en el futur són considerats agraciats i poden viure una vida plena. Alguns són capaços de retrobar diversos records al llarg dels anys. En canvi, els que encara no han retrobat mai els seus records s’anomenen udi i viuen amb la tristesa de no saber si el temps els rebrà. Morir udi és com no haver nascut mai, i per això la gent no parla mai dels qui han mort així. De fet, no hi ha ni tan sols un nom per anomenar-los.\r\n> \r\n> [centraleta-id: 25e16b69-27ae-4be7-8904-cd31eb564665]\r\n\r\n	2025-06-25 09:31:03	<A0E438C9-A87C-4BE7-9211-55E49A14C816@gmail.com>	https://caotic.maadix.org/hyperkitty/hyperkitty/list/ihopethismessagefindsyouwell@raio.issim.net/message/GWRZROTMKEV77ECYGJVF7CJAMQNRMWAR/attachment/4/SUNSET.gif
d5688306-b7ac-44ea-85c3-d20f12b04454	1accc605-14e8-4932-98f4-e9d7f1712bb8	Reverbot	arxireflexos@raio.issim.net	[centraleta-id: 1accc605-14e8-4932-98f4-e9d7f1712bb8]\r\n\r\n\r\n\r\n	2025-06-26 16:31:00	<29ab64bb-cf93-4fe9-a316-0b834a6e7f73@mail.issim.net>	https://caotic.maadix.org/hyperkitty/hyperkitty/list/arxireflexos@raio.issim.net/message/NCHPEOC2PYHFN22VMYADCF6EUOOT7ZHP/attachment/4/3acd2060.jpg
f2fd423b-5cb2-484c-9a07-56548119946b	96cbb1b3-a623-4fa0-ac67-012bb283b573	Reverbot	arxireflexos@raio.issim.net	[centraleta-id: 96cbb1b3-a623-4fa0-ac67-012bb283b573]\r\n	2025-06-27 07:56:41	<4f97ebbf-97e4-4b50-84e3-ecbc52084c47@mail.issim.net>	https://caotic.maadix.org/hyperkitty/hyperkitty/list/arxireflexos@raio.issim.net/message/5K5UGFYELZV5HMFJYMDUJJF4E7KZLKDC/attachment/4/162852022.jpg
\.


--
-- Data for Name: reverberadors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reverberadors (id, correu, estat, categoria, url) FROM stdin;
a2ba3594-ead7-4b17-8f25-bd17bfda9010	\N	actiu	bot	arxireflexos@raio.issim.net
a66cbd6e-1ed2-42f0-8850-d9e184b73d37	\N	actiu	Messenger	ihopethismessagefindsyouwell@raio.issim.net
3da507a6-5ecc-43be-ad16-84f9cb384499	\N	actiu	Futurs	futurs@raio.issim.net
\.


--
-- Name: missatges missatges_message_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missatges
    ADD CONSTRAINT missatges_message_id_key UNIQUE (message_id);


--
-- Name: missatges missatges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missatges
    ADD CONSTRAINT missatges_pkey PRIMARY KEY (id);


--
-- Name: missatges_reverberats missatges_reverberats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missatges_reverberats
    ADD CONSTRAINT missatges_reverberats_pkey PRIMARY KEY (id);


--
-- Name: reverberadors reverberadors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reverberadors
    ADD CONSTRAINT reverberadors_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict h9JthdqXuiECs5ChNSPYfPvAUQhbXsr81HB7YRTjRsQ4HKz6feydrZOwpHxX4pa

