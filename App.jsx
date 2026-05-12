import { useState } from "react";

const ink = "#1a1410";
const parchment = "#f5f0e8";
const gold = "#c4a35a";
const accent = "#8b6f47";
const deep = "#3d2b1f";
const warm = "#c9b99a";
const white = "#fdfaf5";

const weeks = [
  {
    num: 1,
    title: "Тіло",
    sub: "Тіло як перше слово",
    color: "#2e1f14",
    icon: "∿",
    intro: "Тіло знає раніше, ніж розум встигає сформулювати. Цей тиждень — не про аналіз. Про слухання.",
    days: [
      { day: "Пн", q: "Де в тілі живе твоя тривога прямо зараз? Намалюй або опиши словами — форму, колір, температуру.", type: "deep" },
      { day: "Вт", q: "Що тіло відчуває вранці — до того, як думки починаються? Важкість, легкість, напруга, порожнеча?", type: "body" },
      { day: "Ср", q: "Згадай одну подію цього тижня. Як її відчуло тіло — не розум?", type: "emotion" },
      { day: "Чт", q: "Є якийсь симптом, що повертається? Де він? Коли зʼявився вперше — що відбувалося тоді в житті?", type: "deep" },
      { day: "Пт", q: "Що тіло хоче більше цього тижня — і чого хоче менше? Не те, що «треба». Те, що хоче.", type: "body" },
      { day: "Сб", q: "Ляж або сядь зручно. Пройдись увагою від стоп до голови. Де є напруга? Запиши — і подякуй цьому місцю.", type: "practice" },
      { day: "Нд", q: "Одне речення: що тіло відкрило тобі цього тижня?", type: "integration" },
    ],
    reflection: "Яке тілесне відчуття супроводжувало тебе найчастіше цього тижня? Що воно намагалося сказати?"
  },
  {
    num: 2,
    title: "Емоції",
    sub: "Емоція як сигнал, не як ворог",
    color: "#3d2b1f",
    icon: "◎",
    intro: "Емоція — це не слабкість і не проблема. Це інформація. Цей тиждень — про те, щоб навчитися її читати.",
    days: [
      { day: "Пн", q: "Яку емоцію ти найчастіше намагаєшся не відчувати? Де вона живе в тілі?", type: "deep" },
      { day: "Вт", q: "Назви три емоції, які ти відчув/ла сьогодні. Не «добре» чи «погано» — конкретні назви.", type: "emotion" },
      { day: "Ср", q: "Яка емоція у тебе вважалась «забороненою» в дитинстві? Як це впливає на тебе зараз?", type: "deep" },
      { day: "Чт", q: "Коли ти востаннє плакав/ла? Не від болю — від чогось глибшого. Що це було?", type: "emotion" },
      { day: "Пт", q: "Яка емоція дає тобі найбільше сили? Коли ти її відчуваєш?", type: "body" },
      { day: "Сб", q: "Практика: відчуй будь-яку емоцію прямо зараз і не роби з нею нічого. Просто будь з нею 5 хвилин. Що сталося?", type: "practice" },
      { day: "Нд", q: "Одне речення: яку емоцію ти дозволив/ла собі цього тижня — вперше або по-новому?", type: "integration" },
    ],
    reflection: "Є емоція, яку ти постійно перетворюєш на щось інше (злість → контроль, страх → іронія)? Що під нею?"
  },
  {
    num: 3,
    title: "Переконання",
    sub: "Програми, що керують без дозволу",
    color: "#4a3020",
    icon: "◈",
    intro: "Переконання — це не правда. Це рішення, яке ти колись прийняв/ла, щоб вижити. Час переглянути деякі з них.",
    days: [
      { day: "Пн", q: "Заверши речення: «Я не заслуговую на ___». Звідки це переконання? Чий це голос?", type: "deep" },
      { day: "Вт", q: "Яке переконання про гроші ти отримав/ла в дитинстві? Як воно проявляється зараз?", type: "emotion" },
      { day: "Ср", q: "Заверши: «Щоб мене любили, я маю ___». Це правда чи стара програма?", type: "deep" },
      { day: "Чт", q: "Яке переконання про себе ти хотів/ла б відпустити? Що стоїть на заваді?", type: "body" },
      { day: "Пт", q: "Напиши переконання, яке тебе обмежує. Тепер напиши 3 докази, що воно неправдиве.", type: "practice" },
      { day: "Сб", q: "Яке нове переконання ти хочеш «встановити»? Сформулюй у першій особі, теперішній час, позитивно.", type: "practice" },
      { day: "Нд", q: "Одне речення: яку програму ти почав/ла переписувати цього тижня?", type: "integration" },
    ],
    reflection: "Яке переконання передали тобі батьки — не словами, а своїм прикладом? Ти хочеш його зберегти?"
  },
  {
    num: 4,
    title: "Стосунки",
    sub: "Інші як дзеркало",
    color: "#2a1a10",
    icon: "◇",
    intro: "У стосунках ми бачимо себе — те, що приймаємо, і те, що відкидаємо. Цей тиждень — про проєкції та контакт.",
    days: [
      { day: "Пн", q: "Яка якість найбільше дратує тебе в інших? Де ця якість є в тобі самому/самій?", type: "deep" },
      { day: "Вт", q: "З ким ти почуваєшся найбільш собою? Що в цій людині дозволяє тобі бути справжнім/ньою?", type: "emotion" },
      { day: "Ср", q: "Є стосунки, де ти граєш роль? Яку? Чому саме цю?", type: "deep" },
      { day: "Чт", q: "Що ти ніколи не кажеш близьким — але хочеш сказати? Напиши це тут.", type: "emotion" },
      { day: "Пт", q: "Який патерн повторюється у твоїх стосунках знову і знову? Коли він зʼявився вперше?", type: "deep" },
      { day: "Сб", q: "Напиши листа людині, з якою є незакрита емоція. Не надсилай — просто напиши.", type: "practice" },
      { day: "Нд", q: "Одне речення: що ти побачив/ла в стосунках, чого раніше не помічав/ла?", type: "integration" },
    ],
    reflection: "Яку потребу ти найчастіше не озвучуєш у стосунках — і чому?"
  },
  {
    num: 5,
    title: "Страхи",
    sub: "Страх як охоронець",
    color: "#1e1208",
    icon: "✦",
    intro: "Страх не є твоїм ворогом. Він охороняє щось важливе. Цей тиждень — про те, щоб познайомитися з ним обличчям до обличчя.",
    days: [
      { day: "Пн", q: "Який твій найглибший страх — той, що ти рідко комусь признаєш? Напиши його.", type: "deep" },
      { day: "Вт", q: "Що цей страх охороняє? Яку цінність, яку частину тебе?", type: "emotion" },
      { day: "Ср", q: "Як страх проявляється в тілі? Де саме і як?", type: "body" },
      { day: "Чт", q: "Що б ти зробив/ла, якби цього страху не існувало? Запиши конкретно.", type: "deep" },
      { day: "Пт", q: "Уяви свій страх як істоту. Як він виглядає? Що хоче тобі сказати?", type: "practice" },
      { day: "Сб", q: "Зроби одну маленьку дію назустріч страху. Не велику — маленьку. Запиши що і як.", type: "practice" },
      { day: "Нд", q: "Одне речення: як змінилися твої стосунки зі страхом цього тижня?", type: "integration" },
    ],
    reflection: "Є речі, які ти не починаєш через страх невдачі. Назви одну. Що найгірше могло б статися — і чи пережив/ла б ти це?"
  },
  {
    num: 6,
    title: "Ресурси",
    sub: "Повернення до себе",
    color: "#352010",
    icon: "—",
    intro: "Ресурс — це не те, що ти заробляєш. Це те, що вже є в тобі. Цей тиждень — про повернення до власної сили.",
    days: [
      { day: "Пн", q: "Коли ти відчував/ла себе найбільш живим/ою? Що відбувалося? Де було тіло?", type: "deep" },
      { day: "Вт", q: "Що відновлює тебе — не розважає, а саме відновлює? Список без цензури.", type: "body" },
      { day: "Ср", q: "Яка твоя сила, яку ти рідко визнаєш своєю? Чому рідко?", type: "deep" },
      { day: "Чт", q: "Що або хто дає тобі відчуття опори? Конкретно — людина, місце, практика, відчуття.", type: "emotion" },
      { day: "Пт", q: "Заверши: «Я справляюся найкраще, коли ___». Що це говорить про тебе?", type: "body" },
      { day: "Сб", q: "Практика: проведи 20 хвилин наодинці з тим, що тебе відновлює. Без телефону. Запиши що відчув/ла.", type: "practice" },
      { day: "Нд", q: "Одне речення: який ресурс у собі ти відкрив/ла або пригадав/ла цього тижня?", type: "integration" },
    ],
    reflection: "Є внутрішній стан, до якого ти хочеш повертатися частіше. Як би ти його назвав/ла?"
  },
  {
    num: 7,
    title: "Тінь",
    sub: "Те, що ти від себе ховаєш",
    color: "#120a04",
    icon: "◉",
    intro: "Тінь — це не погане в тобі. Це все, що ти вирішив/ла назвати поганим і сховати. Юнг казав: у тіні є золото.",
    days: [
      { day: "Пн", q: "Яку частину себе ти соромишся найбільше? Коли вперше навчив/ла себе її ховати?", type: "deep" },
      { day: "Вт", q: "Яка якість, яку ти засуджуєш в інших, є і в тобі — але у прихованій формі?", type: "deep" },
      { day: "Ср", q: "Є щось, що ти робиш або думаєш — і потім відчуваєш сором? Що це? Що стоїть за цим?", type: "emotion" },
      { day: "Чт", q: "Уяви «темну версію» себе. Як вона виглядає? Чого вона хоче? Що вона може тобі дати?", type: "deep" },
      { day: "Пт", q: "Є мрія або бажання, яке ти вважаєш «забороненим» або «не для тебе»? Назви його.", type: "emotion" },
      { day: "Сб", q: "Напиши діалог між собою і своєю тінню. Дай їй сказати все, що вона хоче. Вислухай.", type: "practice" },
      { day: "Нд", q: "Одне речення: яке «золото» ти знайшов/ла у своїй тіні цього тижня?", type: "integration" },
    ],
    reflection: "Що в тобі чекає на визнання — не виправлення, не зміну, а просто визнання?"
  },
  {
    num: 8,
    title: "Інтеграція",
    sub: "Зібрати себе докупи",
    color: "#1a1410",
    icon: "∞",
    intro: "Інтеграція — це не кінець. Це місце, де всі частини тебе сідають за один стіл. Цей тиждень — про цілісність.",
    days: [
      { day: "Пн", q: "Що найважливіше ти відкрив/ла про себе за ці 8 тижнів? Одне головне відкриття.", type: "deep" },
      { day: "Вт", q: "Яка частина тебе змінилась найбільше? Як ти це відчуваєш у тілі?", type: "body" },
      { day: "Ср", q: "Що ти хочеш залишити позаду? Назви конкретно — переконання, патерн, роль.", type: "deep" },
      { day: "Чт", q: "Яку версію себе ти хочеш розвивати далі? Опиши її — не ідеальну, а справжню.", type: "emotion" },
      { day: "Пт", q: "Напиши листа собі — тому собі, що відкрив/ла цей щоденник 8 тижнів тому.", type: "practice" },
      { day: "Сб", q: "Що ти хочеш пообіцяти собі — не з тиску, а з турботи про себе?", type: "practice" },
      { day: "Нд", q: "Одне речення: ким ти є зараз — після цих 8 тижнів?", type: "integration" },
    ],
    reflection: "Якщо б твоя найглибша частина могла звернутися до тебе — що б вона сказала?"
  }
];

const typeColors = {
  deep: { bg: "#1a1410", border: gold, label: "Глибина", dot: gold },
  body: { bg: "#2e1f14", border: accent, label: "Тіло", dot: accent },
  emotion: { bg: "#3d2b1f", border: warm, label: "Емоція", dot: warm },
  practice: { bg: "#251810", border: "#a0856a", label: "Практика", dot: "#a0856a" },
  integration: { bg: "#120e0a", border: gold, label: "Інтеграція", dot: gold },
};

const diagQuestions = [
  "Що змусило тебе відкрити цей щоденник саме зараз?",
  "Яке відчуття ти найчастіше ігноруєш?",
  "Де в тілі ти найчастіше відчуваєш напругу?",
  "Яку версію себе ти хочеш краще зрозуміти?",
  "Що ти ніколи не кажеш вголос — але часто думаєш?",
];

export default function App() {
  const [screen, setScreen] = useState("cover");
  const [activeWeek, setActiveWeek] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [diagStep, setDiagStep] = useState(0);
  const [diagAnswers, setDiagAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const [reflAnswers, setReflAnswers] = useState({});

  const saveAnswer = (key, val) => setAnswers(a => ({ ...a, [key]: val }));
  const saveDiag = (val) => {
    setDiagAnswers(a => ({ ...a, [diagStep]: val }));
  };

  // COVER
  if (screen === "cover") return (
    <div style={{ background: ink, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", fontFamily: "Georgia,serif", fontSize: 200, fontWeight: 300, color: "transparent", WebkitTextStroke: "1px rgba(196,163,90,0.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", userSelect: "none" }}>K</div>
      <div style={{ textAlign: "center", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: 6, textTransform: "uppercase", color: gold, opacity: 0.6, fontFamily: "Georgia,serif" }}>Nataliia Koveda</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 48, fontWeight: 300, letterSpacing: 14, color: parchment, lineHeight: 1 }}>KOVEDA</div>
        <div style={{ width: 80, height: 1, background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
        <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontStyle: "italic", color: warm, fontWeight: 300, letterSpacing: 2 }}>Origins</div>
        <div style={{ width: 40, height: 1, background: `rgba(196,163,90,0.3)` }} />
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: warm, opacity: 0.5 }}>8-тижневий щоденник самопізнання</div>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 260 }}>
          <button onClick={() => setScreen("intro")} style={{ padding: "14px 0", background: gold, color: ink, border: "none", fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" }}>Почати</button>
          <button onClick={() => setScreen("weeks")} style={{ padding: "14px 0", background: "transparent", color: warm, border: `1px solid rgba(196,163,90,0.3)`, fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" }}>Тижні</button>
        </div>
      </div>
    </div>
  );

  // INTRO
  if (screen === "intro") return (
    <div style={{ background: ink, minHeight: "100vh", padding: "3rem 2rem", maxWidth: 600, margin: "0 auto" }}>
      <button onClick={() => setScreen("cover")} style={{ background: "none", border: "none", color: warm, fontSize: 20, cursor: "pointer", marginBottom: 32 }}>←</button>
      <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: gold, marginBottom: 24, fontFamily: "Georgia,serif" }}>Про цей щоденник</div>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontStyle: "italic", color: parchment, lineHeight: 1.6, marginBottom: 28, fontWeight: 300 }}>
        Ти вже запрограмований/а — батьками, суспільством, досвідом.
      </div>
      <div style={{ fontSize: 13, lineHeight: 2, color: warm, opacity: 0.8, marginBottom: 28, fontFamily: "Georgia,serif" }}>
        Але найважливіший виклик — не стати кращим. А зустріти себе справжнього/ю. Побачити, що керує твоїми реакціями, відносинами і рішеннями — без засудження.
      </div>
      <div style={{ fontSize: 13, lineHeight: 2, color: warm, opacity: 0.8, marginBottom: 32, fontFamily: "Georgia,serif" }}>
        Цей щоденник — не про позитивне мислення. Не про «стати кращою версією себе». Це про зустріч із тим, що вже є. З тілом, емоціями, тінню, ресурсами.
      </div>
      <div style={{ padding: "20px 24px", border: `1px solid rgba(196,163,90,0.2)`, marginBottom: 32 }}>
        <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: gold, marginBottom: 12, fontFamily: "Georgia,serif" }}>8 тижнів · 8 шарів</div>
        {["Тіло", "Емоції", "Переконання", "Стосунки", "Страхи", "Ресурси", "Тінь", "Інтеграція"].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 0", borderBottom: i < 7 ? `1px solid rgba(196,163,90,0.08)` : "none" }}>
            <div style={{ fontSize: 9, color: gold, opacity: 0.5, width: 16, textAlign: "right", fontFamily: "Georgia,serif" }}>{i + 1}</div>
            <div style={{ fontSize: 13, color: parchment, fontFamily: "Georgia,serif", fontStyle: "italic" }}>{t}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setScreen("diag")} style={{ width: "100%", padding: "14px 0", background: gold, color: ink, border: "none", fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" }}>Діагностика входу →</button>
    </div>
  );

  // DIAGNOSTICS
  if (screen === "diag") {
    const done = diagStep >= diagQuestions.length;
    return (
      <div style={{ background: deep, minHeight: "100vh", padding: "3rem 2rem", maxWidth: 600, margin: "0 auto" }}>
        <button onClick={() => done ? setScreen("weeks") : diagStep > 0 ? setDiagStep(s => s - 1) : setScreen("intro")} style={{ background: "none", border: "none", color: warm, fontSize: 20, cursor: "pointer", marginBottom: 32 }}>←</button>
        {!done ? (
          <>
            <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: gold, marginBottom: 8, fontFamily: "Georgia,serif" }}>Діагностика входу · {diagStep + 1} / {diagQuestions.length}</div>
            <div style={{ width: "100%", height: 2, background: `rgba(196,163,90,0.15)`, marginBottom: 36, borderRadius: 1 }}>
              <div style={{ height: 2, width: `${((diagStep) / diagQuestions.length) * 100}%`, background: gold, borderRadius: 1, transition: "width 0.4s" }} />
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 20, fontStyle: "italic", color: parchment, lineHeight: 1.65, marginBottom: 32, fontWeight: 300 }}>
              {diagQuestions[diagStep]}
            </div>
            <textarea
              value={diagAnswers[diagStep] || ""}
              onChange={e => saveDiag(e.target.value)}
              placeholder="Пиши чесно. Це тільки для тебе."
              style={{ width: "100%", minHeight: 140, background: "rgba(196,163,90,0.05)", border: `1px solid rgba(196,163,90,0.2)`, color: parchment, padding: "16px", fontFamily: "Georgia,serif", fontSize: 13, lineHeight: 1.9, resize: "none", outline: "none", boxSizing: "border-box" }}
            />
            <button onClick={() => setDiagStep(s => s + 1)} style={{ marginTop: 16, width: "100%", padding: "13px 0", background: diagAnswers[diagStep] ? gold : "rgba(196,163,90,0.15)", color: diagAnswers[diagStep] ? ink : "rgba(196,163,90,0.3)", border: "none", fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>
              Далі →
            </button>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", gap: 24 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 36, color: gold, opacity: 0.6 }}>✦</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontStyle: "italic", color: parchment, lineHeight: 1.6, fontWeight: 300 }}>Ти готовий/а розпочати</div>
            <div style={{ fontSize: 12, color: warm, opacity: 0.65, lineHeight: 1.8, fontFamily: "Georgia,serif" }}>Твої відповіді збережені. Вони покажуть, наскільки ти зміниш/ся за 8 тижнів.</div>
            <button onClick={() => setScreen("weeks")} style={{ padding: "14px 40px", background: gold, color: ink, border: "none", fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" }}>До тижнів →</button>
          </div>
        )}
      </div>
    );
  }

  // WEEKS LIST
  if (screen === "weeks") return (
    <div style={{ background: ink, minHeight: "100vh", padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <button onClick={() => setScreen("cover")} style={{ background: "none", border: "none", color: warm, fontSize: 20, cursor: "pointer" }}>←</button>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 16, letterSpacing: 8, color: parchment, fontWeight: 300 }}>KOVEDA</div>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: gold, marginBottom: 28, fontFamily: "Georgia,serif" }}>8 тижнів · Origins</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {weeks.map(w => {
          const filled = w.days.filter((_, di) => answers[`${w.num}-${di}`]).length;
          const pct = Math.round((filled / 7) * 100);
          return (
            <button key={w.num} onClick={() => { setActiveWeek(w.num - 1); setScreen("week"); }}
              style={{ background: w.color, border: "none", padding: "20px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 28, color: gold, opacity: 0.4, width: 32, flexShrink: 0, lineHeight: 1 }}>{w.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 16, color: parchment }}>{w.title}</div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: gold, opacity: 0.5, fontFamily: "Georgia,serif" }}>Тиждень {w.num}</div>
                </div>
                <div style={{ fontSize: 11, color: warm, opacity: 0.6, marginBottom: 8, fontFamily: "Georgia,serif" }}>{w.sub}</div>
                <div style={{ height: 2, background: "rgba(196,163,90,0.12)", borderRadius: 1 }}>
                  <div style={{ height: 2, width: `${pct}%`, background: gold, borderRadius: 1 }} />
                </div>
              </div>
              <div style={{ color: warm, opacity: 0.4, fontSize: 16 }}>›</div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 24, padding: "16px 20px", border: `1px solid rgba(196,163,90,0.15)`, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: warm, opacity: 0.5, fontFamily: "Georgia,serif", textTransform: "uppercase" }}>Загальний прогрес</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: gold }}>
          {Object.keys(answers).length} / 56
        </div>
      </div>
    </div>
  );

  // WEEK VIEW
  if (screen === "week") {
    const w = weeks[activeWeek];
    return (
      <div style={{ background: w.color, minHeight: "100vh", maxWidth: 600, margin: "0 auto" }}>
        {/* Week Header */}
        <div style={{ padding: "2rem 2rem 1.5rem", background: `linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)` }}>
          <button onClick={() => setScreen("weeks")} style={{ background: "none", border: "none", color: warm, fontSize: 20, cursor: "pointer", marginBottom: 20 }}>←</button>
          <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: gold, opacity: 0.7, marginBottom: 8, fontFamily: "Georgia,serif" }}>Тиждень {w.num}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 32, color: gold, opacity: 0.5 }}>{w.icon}</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 32, fontWeight: 300, color: parchment, letterSpacing: 2 }}>{w.title}</div>
          </div>
          <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 13, color: warm, opacity: 0.7, marginBottom: 16 }}>{w.sub}</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: warm, lineHeight: 1.85, opacity: 0.8, padding: "16px", border: `1px solid rgba(196,163,90,0.15)`, background: "rgba(0,0,0,0.2)", marginBottom: 16 }}>
            {w.intro}
          </div>
        </div>

        {/* Days */}
        <div style={{ padding: "0 1.5rem 2rem", display: "flex", flexDirection: "column", gap: 8 }}>
          {w.days.map((d, di) => {
            const key = `${w.num}-${di}`;
            const tc = typeColors[d.type];
            const done = !!answers[key];
            return (
              <button key={di} onClick={() => { setActiveDay(di); setScreen("day"); }}
                style={{ background: done ? "rgba(196,163,90,0.08)" : tc.bg, border: `1px solid ${done ? gold : "rgba(196,163,90,0.12)"}`, padding: "16px", display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer", textAlign: "left" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: gold, opacity: 0.6, fontFamily: "Georgia,serif", textTransform: "uppercase" }}>{d.day}</div>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: done ? gold : tc.dot, opacity: done ? 1 : 0.4 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: tc.dot, opacity: 0.7, marginBottom: 6, fontFamily: "Georgia,serif" }}>{tc.label}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 13, color: done ? gold : parchment, lineHeight: 1.7, fontWeight: 300 }}>{d.q}</div>
                </div>
                <div style={{ color: done ? gold : warm, opacity: done ? 1 : 0.3, fontSize: 14, flexShrink: 0 }}>{done ? "✓" : "›"}</div>
              </button>
            );
          })}

          {/* Weekly Reflection */}
          <div style={{ marginTop: 8, padding: "20px", border: `1px solid rgba(196,163,90,0.2)`, background: "rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: gold, marginBottom: 12, fontFamily: "Georgia,serif" }}>Тижнева рефлексія</div>
            <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 13, color: warm, lineHeight: 1.75, marginBottom: 16, opacity: 0.9 }}>{w.reflection}</div>
            <textarea
              value={reflAnswers[w.num] || ""}
              onChange={e => setReflAnswers(r => ({ ...r, [w.num]: e.target.value }))}
              placeholder="Твої думки після тижня..."
              style={{ width: "100%", minHeight: 100, background: "rgba(196,163,90,0.05)", border: `1px solid rgba(196,163,90,0.15)`, color: parchment, padding: "12px", fontFamily: "Georgia,serif", fontSize: 12, lineHeight: 1.8, resize: "none", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {activeWeek < 7 && (
            <button onClick={() => { setActiveWeek(w => w + 1); setScreen("week"); }}
              style={{ marginTop: 8, padding: "13px 0", background: "rgba(196,163,90,0.15)", color: gold, border: `1px solid rgba(196,163,90,0.2)`, fontFamily: "Georgia,serif", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" }}>
              Наступний тиждень →
            </button>
          )}
        </div>
      </div>
    );
  }

  // DAY VIEW
  if (screen === "day") {
    const w = weeks[activeWeek];
    const d = w.days[activeDay];
    const key = `${w.num}-${activeDay}`;
    const tc = typeColors[d.type];
    return (
      <div style={{ background: ink, minHeight: "100vh", maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <button onClick={() => setScreen("week")} style={{ background: "none", border: "none", color: warm, fontSize: 20, cursor: "pointer" }}>←</button>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: gold, opacity: 0.6, fontFamily: "Georgia,serif" }}>Тиждень {w.num} · {d.day}</div>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ display: "inline-block", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", border: `1px solid ${tc.dot}`, color: tc.dot, padding: "4px 10px", marginBottom: 24, opacity: 0.8, fontFamily: "Georgia,serif" }}>{tc.label}</div>

        <div style={{ fontFamily: "Georgia,serif", fontSize: 20, fontStyle: "italic", color: parchment, lineHeight: 1.7, marginBottom: 32, fontWeight: 300, borderLeft: `2px solid ${gold}`, paddingLeft: 20 }}>
          {d.q}
        </div>

        <textarea
          value={answers[key] || ""}
          onChange={e => saveAnswer(key, e.target.value)}
          placeholder="Пиши без цензури. Це простір тільки для тебе."
          style={{ width: "100%", minHeight: 220, background: "rgba(196,163,90,0.04)", border: `1px solid rgba(196,163,90,0.18)`, color: parchment, padding: "18px", fontFamily: "Georgia,serif", fontSize: 14, lineHeight: 2, resize: "none", outline: "none", boxSizing: "border-box", marginBottom: 16 }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          {activeDay > 0 && (
            <button onClick={() => setActiveDay(d => d - 1)} style={{ flex: 1, padding: "12px 0", background: "transparent", color: warm, border: `1px solid rgba(196,163,90,0.2)`, fontFamily: "Georgia,serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer" }}>← Попередній</button>
          )}
          {activeDay < 6 && (
            <button onClick={() => setActiveDay(d => d + 1)} style={{ flex: 1, padding: "12px 0", background: answers[key] ? gold : "rgba(196,163,90,0.12)", color: answers[key] ? ink : "rgba(196,163,90,0.3)", border: "none", fontFamily: "Georgia,serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>Наступний →</button>
          )}
          {activeDay === 6 && (
            <button onClick={() => setScreen("week")} style={{ flex: 1, padding: "12px 0", background: gold, color: ink, border: "none", fontFamily: "Georgia,serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer" }}>До тижня ✓</button>
          )}
        </div>

        <div style={{ marginTop: 24, padding: "14px 16px", background: "rgba(196,163,90,0.04)", border: `1px solid rgba(196,163,90,0.1)`, display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: gold, opacity: 0.4 }}>∿</div>
          <div style={{ fontSize: 11, color: warm, opacity: 0.55, fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.7 }}>
            Тіло — твій союзник. Якщо застрягаєш, відчуй де це питання живе в тілі — і почни звідти.
          </div>
        </div>
      </div>
    );
  }

  return null;
}
