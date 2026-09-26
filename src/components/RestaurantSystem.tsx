import { AnimatePresence, LayoutGroup, motion, useInView } from "framer-motion";
import { ChefHat, ClipboardList, BellRing } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { demoMenu, techStack, type MenuId } from "../data/site";
import { useLang } from "../i18n";
import { selectInterest } from "../lib/interests";
import { Reveal, SectionTitle, ease } from "./Shared";

type Order = {
  id: number;
  table: number;
  items: MenuId[];
  total: number;
  status: 0 | 1 | 2; // 0 mozo, 1 cocina, 2 listo
};

const columnIcons = [ClipboardList, ChefHat, BellRing];

const initialOrders: Order[] = [
  { id: 1, table: 4, items: ["croquetas", "cana"], total: 10.5, status: 1 },
  { id: 2, table: 9, items: ["paella", "tinto", "tarta"], total: 23.9, status: 0 },
];

let nextId = initialOrders.length + 1;
function newOrder(): Order {
  const n = 1 + Math.floor(Math.random() * 3);
  const picks = [...demoMenu].sort(() => Math.random() - 0.5).slice(0, n);
  return {
    id: nextId++,
    table: 1 + Math.floor(Math.random() * 12),
    items: picks.map((p) => p.id),
    total: picks.reduce((a, p) => a + p.price, 0),
    status: 0,
  };
}

export function RestaurantSystem() {
  const { t, money } = useLang();
  const sys = t.system;
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boardRef, { margin: "-100px" });
  // Pedidos iniciales fijos (iguales en el HTML pre-armado y en el navegador);
  // los siguientes se generan al azar mientras la sección está a la vista.
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const ordersRef = useRef(orders);
  const [sales, setSales] = useState(1845.5);
  const [served, setServed] = useState(23);
  const [bars, setBars] = useState([40, 65, 50, 80, 55, 90, 70]);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      let next = ordersRef.current.map((o) => ({ ...o }));
      // Se entrega el pedido que estaba listo
      const done = next.find((o) => o.status === 2);
      if (done && Math.random() < 0.6) {
        next = next.filter((o) => o.id !== done.id);
        setSales((s) => s + done.total);
        setServed((s) => s + 1);
        setBars((b) => {
          const copy = [...b];
          copy[copy.length - 1] = Math.min(100, copy[copy.length - 1] + 6);
          return copy;
        });
      } else {
        // Avanza el pedido más viejo que no esté listo
        const move = next.find((o) => o.status < 2 && !(o.status === 1 && next.some((x) => x.status === 2)));
        if (move) move.status = (move.status + 1) as Order["status"];
      }
      if (next.filter((o) => o.status === 0).length === 0 && next.length < 5) next.push(newOrder());
      ordersRef.current = next;
      setOrders(next);
    }, 1500);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section className="section" id="sistemas">
      <div className="container">
        <SectionTitle eyebrow={sys.eyebrow} title={sys.title} subtitle={sys.subtitle} />

        <Reveal>
          <div className="board" ref={boardRef}>
            <div className="board-bar">
              <span className="dot r" />
              <span className="dot y" />
              <span className="dot g" />
              <span className="board-url">tu-restaurante.app/panel</span>
              <span className="live">
                <span className="live-dot" /> {sys.live}
              </span>
            </div>

            <div className="board-kpis">
              <div className="kpi">
                <small>{sys.salesToday}</small>
                <motion.strong key={sales} initial={{ scale: 1.15, color: "#0f9d84" }} animate={{ scale: 1, color: "#0c2622" }}>
                  {money(sales, 2)}
                </motion.strong>
              </div>
              <div className="kpi">
                <small>{sys.served}</small>
                <motion.strong key={served} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  {served}
                </motion.strong>
              </div>
              <div className="kpi">
                <small>{sys.avgTicket}</small>
                <strong>{money(sales / served, 2)}</strong>
              </div>
              <div className="kpi kpi-chart">
                <small>{sys.perHour}</small>
                <div className="mini-bars">
                  {bars.map((h, i) => (
                    <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.05 }} />
                  ))}
                </div>
              </div>
            </div>

            <LayoutGroup>
              <div className="board-cols">
                {sys.columns.map((col, ci) => {
                  const Icon = columnIcons[ci];
                  const colOrders = orders.filter((o) => o.status === ci);
                  return (
                    <div key={ci} className={`board-col col-${ci}`}>
                      <div className="col-head">
                        <Icon size={18} />
                        <strong>{col.title}</strong>
                        <small>{col.sub}</small>
                        <span className="col-count">{colOrders.length}</span>
                      </div>
                      <div className="col-body">
                        <AnimatePresence>
                          {colOrders.map((o) => (
                            <motion.div
                              key={o.id}
                              layoutId={`order-${o.id}`}
                              className="order-card"
                              initial={{ opacity: 0, scale: 0.7, y: -20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.6, x: 60 }}
                              transition={{ type: "spring", stiffness: 260, damping: 26 }}
                            >
                              <div className="order-top">
                                <b>
                                  {sys.table} {o.table}
                                </b>
                                <span>#{String(o.id).padStart(3, "0")}</span>
                              </div>
                              <ul>
                                {o.items.map((it) => (
                                  <li key={it}>{t.menu[it]}</li>
                                ))}
                              </ul>
                              <div className="order-total">{money(o.total, 2)}</div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        </Reveal>

        <div className="roles-grid">
          {sys.roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1} className="role-card">
              <span className="role-emoji">{r.emoji}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="tech-row" delay={0.1}>
          {techStack.map((t, i) => (
            <motion.span key={t} className="tech-pill" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07, ease }}>
              {t}
            </motion.span>
          ))}
          <button type="button" className="btn btn-primary btn-sm" onClick={() => selectInterest({ id: "sistema" })}>
            {sys.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
