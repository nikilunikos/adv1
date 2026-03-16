import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Gift, Lock, Play, Sparkles } from "lucide-react";

const ACCESS_CODE = "SLOWLIFE";
const ACCESS_RIDDLE =
  "Je suis ce que l'on veut faire de l'année qui arrive : moins vite, plus vrai. Deux mots, aucun espace.";

const COLORS = {
  bg: "#0a0d13",
  panel: "#13151c",
  plum: "#6d0f36",
  plumSoft: "#8d204a",
  silver: "#c7c1c7",
  silverSoft: "#d8c7cf",
  white: "#ffffff",
};

// Remplace ce chemin par ton vrai fichier logo dans le repo GitHub.
const LOGO_SRC = "/logo-adv1.png";

type Question = {
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
};

type Module = {
  id: number;
  title: string;
  subtitle: string;
  intro: string;
  videoUrl: string;
  giftName: string;
  giftImage: string;
  rewardLine: string;
  questions: Question[];
};

const modules: Module[] = [
  {
    id: 1,
    title: "Module 1",
    subtitle: "Vision",
    intro:
      "Les artistes ne créent pas plus d'idées que les autres. Ils voient simplement des histoires là où le reste du monde voit des situations normales.",
    videoUrl: "",
    giftName: "Carnet artiste",
    giftImage:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    rewardLine:
      "Artefact débloqué. Tu disposes maintenant d'un espace officiel pour capturer les idées avant qu'elles disparaissent.",
    questions: [
      {
        question:
          "Tu fais la queue à la pharmacie et la personne devant toi achète 47 boîtes de mouchoirs. Quelle est la réaction Vision ?",
        answers: [
          "Imaginer une ballade country sur la solitude et les éternuements collectifs",
          "Penser qu'elle doit avoir un gros rhume",
          "Te plaindre intérieurement que ça prend trop de temps",
          "Prendre une photo discrète pour Stories",
        ],
        correctIndex: 0,
        explanation:
          "Vision activée. Une file de mouchoirs peut déjà devenir une chanson si on décide de la regarder autrement.",
      },
      {
        question:
          "Quelle est la principale différence entre un non-artiste et un artiste avec Vision ?",
        answers: [
          "L'artiste porte toujours des lunettes noires",
          "L'artiste a plus d'idées par jour",
          "L'artiste voit des histoires dans les situations banales",
          "L'artiste n'a jamais de factures à payer",
        ],
        correctIndex: 2,
        explanation:
          "Les idées sont partout. La Vision, c'est le filtre qui les rend visibles.",
      },
      {
        question:
          "Tu renverses ton café sur ton agenda. Quelle est la pensée ADV1 ?",
        answers: [
          "C'est la faute du barista",
          "Faut que j'achète un agenda étanche",
          "Merde, mon agenda est foutu",
          "Carte post-apo en taches de café, futur artwork ?",
        ],
        correctIndex: 3,
        explanation: "Le chaos est de la matière première. Capture-le.",
      },
      {
        question: "Les idées sont comparées à quoi dans le Module Vision ?",
        answers: [
          "Des diamants bruts",
          "Des notifications push",
          "Des papillons bourrés à la Jäger",
          "Des post-it éternels",
        ],
        correctIndex: 2,
        explanation:
          "Elles passent vite et de façon imprévisible. Il faut les attraper avant qu'elles ne s'écrasent.",
      },
      {
        question: "Pourquoi faut-il capturer les idées immédiatement ?",
        answers: [
          "Parce que les idées disparaissent si on ne les note pas",
          "Parce que l'univers facture des pénalités de retard",
          "Parce que ton téléphone va se vider",
          "Parce que c'est une règle du programme",
        ],
        correctIndex: 0,
        explanation:
          "Une idée non capturée devient souvent un regret cosmique.",
      },
    ],
  },
  {
    id: 2,
    title: "Module 2",
    subtitle: "Expression",
    intro:
      "Une idée qui reste dans la tête n'existe pas vraiment. Les artistes deviennent artistes au moment où ils osent exprimer quelque chose, même imparfaitement.",
    videoUrl: "",
    giftName: "Stylo",
    giftImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    rewardLine:
      "Artefact débloqué. Tu disposes maintenant d'un instrument officiel de signature, de notes et d'idées légèrement dangereuses.",
    questions: [
      {
        question: "Le vrai frein numéro 1 pour la plupart des artistes ?",
        answers: [
          "Le manque de matériel pro",
          "La peur de montrer quelque chose d'imparfait",
          "Le manque de followers",
          "Le manque de talent",
        ],
        correctIndex: 1,
        explanation:
          "Exprimer l'imparfait est le premier vrai choix de carrière.",
      },
      {
        question: "Tu as écrit un texte très personnel. Que fais-tu ?",
        answers: [
          "Tu le gardes dans un dossier secret",
          "Tu attends 50 versions parfaites",
          "Tu le partages même s'il est imparfait",
          "Tu demandes l'avis de 10 personnes",
        ],
        correctIndex: 2,
        explanation:
          "Les carrières se construisent en partageant avant d'être parfait.",
      },
      {
        question: "Quelle phrase résume le mieux le Module Expression ?",
        answers: [
          "Une mauvaise idée exprimée vaut mieux qu'une bonne idée oubliée",
          "Il faut attendre le bon moment",
          "Le public n'est pas prêt",
          "Une œuvre parfaite doit rester privée",
        ],
        correctIndex: 0,
        explanation:
          "C'est la règle qui fait passer d'amateur à artiste en construction.",
      },
      {
        question: "Enregistrer une note vocale chelou à 2h du matin, c'est :",
        answers: [
          "Une perte de temps",
          "Juste pour rire",
          "Quelque chose à supprimer",
          "Le début concret de ta discographie future",
        ],
        correctIndex: 3,
        explanation:
          "Chaque expression, même bancale, peut devenir une brique du futur.",
      },
      {
        question:
          "L'Expression, pour quelqu'un qui veut devenir artiste, c'est :",
        answers: [
          "Poster tous les jours pour gagner des abonnés",
          "Attendre d'avoir un label",
          "Choisir de rendre son art visible",
          "Faire comme tout le monde",
        ],
        correctIndex: 2,
        explanation:
          "C'est le moment où l'on décide activement de sortir quelque chose dans le monde.",
      },
    ],
  },
  {
    id: 3,
    title: "Module 3",
    subtitle: "Présence",
    intro:
      "Créer quelque chose est une chose. Assumer d'exister devant les autres en est une autre. La présence commence avant même la première phrase.",
    videoUrl: "",
    giftName: "Lunettes de soleil",
    giftImage:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    rewardLine:
      "Artefact débloqué. Tu disposes maintenant d'un outil de gestion du mystère, de la présence et des entrées légèrement théâtrales.",
    questions: [
      {
        question: "Quand une star entre dans une pièce :",
        answers: [
          "Elle attend qu'on lui parle",
          "Elle s'excuse d'être là",
          "Elle entre comme si sa place était déjà réservée",
          "Elle regarde son téléphone",
        ],
        correctIndex: 2,
        explanation:
          "La présence est souvent le premier message envoyé au monde.",
      },
      {
        question:
          "Les artistes qui réussissent durablement sont souvent ceux qui :",
        answers: [
          "Ont appris à occuper l'espace",
          "Ont le plus de talent brut",
          "Changent de style tous les 6 mois",
          "Obéissent à leur manager",
        ],
        correctIndex: 0,
        explanation:
          "La présence crée parfois l'opportunité avant même que le talent parle.",
      },
      {
        question: "La Présence dans une carrière artistique c'est :",
        answers: [
          "Avoir une grosse voix",
          "Porter des vêtements flashy",
          "Décider que ton histoire mérite d'être entendue",
          "Parler plus fort que les autres",
        ],
        correctIndex: 2,
        explanation:
          "C'est un choix de place, pas une question de volume.",
      },
      {
        question: "Quelle attitude limite le plus les carrières ?",
        answers: [
          "Trop d'ambition",
          "Se faire petite et s'excuser d'exister",
          "Trop poster sur les réseaux",
          "Ne jamais sortir de chez soi",
        ],
        correctIndex: 1,
        explanation:
          "La version star ne demande pas la permission. Elle prend sa place.",
      },
      {
        question: "Un accessoire qui te donne confiance peut être :",
        answers: [
          "Superficiel",
          "Obligatoire tous les jours",
          "Un outil pour activer ta présence",
          "Juste pour les photos",
        ],
        correctIndex: 2,
        explanation:
          "Les artistes utilisent tout ce qui les aide à incarner la direction choisie.",
      },
    ],
  },
  {
    id: 4,
    title: "Module 4",
    subtitle: "Personnage",
    intro:
      "Le personnage artistique n'est pas un mensonge. C'est une version amplifiée de soi, plus libre, plus visible, plus assumée.",
    videoUrl: "",
    giftName: "Veste ADV1",
    giftImage:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
    rewardLine:
      "Artefact débloqué. Tu disposes maintenant d'une seconde peau officielle pour activer ta version ADV1.",
    questions: [
      {
        question: "Le personnage artistique est :",
        answers: [
          "Une version amplifiée de toi",
          "Un simple nom de scène",
          "Une stratégie marketing",
          "Un rôle inventé",
        ],
        correctIndex: 0,
        explanation: "Le personnage n'efface pas. Il révèle en plus grand.",
      },
      {
        question: "Pourquoi créer un personnage artistique ?",
        answers: [
          "Pour copier les autres artistes",
          "Pour oser ce que la version quotidienne n'oserait pas",
          "Pour cacher ses faiblesses",
          "Pour plaire à tout le monde",
        ],
        correctIndex: 1,
        explanation:
          "Le personnage donne de la liberté à la partie la plus audacieuse.",
      },
      {
        question: "Mettre une veste ou un accessoire signature sert à :",
        answers: [
          "Rien de spécial",
          "Être stylé",
          "Activer ta version artiste",
          "Devenir quelqu'un d'autre",
        ],
        correctIndex: 2,
        explanation:
          "Parfois un objet déclenche une posture, un ton, une permission.",
      },
      {
        question: "Le plus grand avantage du personnage artistique ?",
        answers: [
          "Gagner de l'argent rapidement",
          "Pouvoir être vulnérable et libre",
          "Avoir une excuse pour tout",
          "Plaire à tout le monde",
        ],
        correctIndex: 1,
        explanation:
          "Le personnage protège tout en permettant d'aller plus loin.",
      },
      {
        question: "Le personnage artistique sert surtout à :",
        answers: [
          "Copier tes artistes préférés",
          "Construire une identité unique",
          "Changer de style chaque année",
          "Rester exactement la même personne",
        ],
        correctIndex: 1,
        explanation:
          "C'est la forme visible de ta direction artistique.",
      },
    ],
  },
  {
    id: 5,
    title: "Module 5",
    subtitle: "Launch",
    intro:
      "Le programme ne se termine pas avec un quiz. Il se prolonge dans la vraie vie. Las Vegas devient le terrain officiel du lancement.",
    videoUrl: "",
    giftName: "ADV1 activé",
    giftImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    rewardLine:
      "ADV1 est maintenant activé. La suite du programme se déroule dans la vraie vie.",
    questions: [
      {
        question: "À quoi sert vraiment le Module Launch ?",
        answers: [
          "À ajouter encore de la préparation",
          "À transformer la théorie en vie réelle",
          "À refaire un quiz plus dur",
          "À rester dans sa chambre",
        ],
        correctIndex: 1,
        explanation: "La vraie formation commence dehors.",
      },
      {
        question: "Les artistes deviennent artistes surtout :",
        answers: [
          "En vivant des expériences",
          "En regardant plus de vidéos",
          "En attendant le bon moment",
          "En refaisant leur bio Instagram",
        ],
        correctIndex: 0,
        explanation: "Les expériences deviennent la matière de l'art.",
      },
      {
        question: "Dans ADV1, Las Vegas représente :",
        answers: [
          "Un simple décor",
          "Un test de survie budgétaire",
          "Le lieu du lancement symbolique",
          "Une pause dans le programme",
        ],
        correctIndex: 2,
        explanation:
          "Le launch sort officiellement du site et entre dans le monde.",
      },
      {
        question: "La suite logique après les modules est :",
        answers: [
          "Tout analyser encore six mois",
          "Attendre d'être plus prête",
          "Prendre des notes sans rien faire",
          "Sortir, vivre, créer",
        ],
        correctIndex: 3,
        explanation:
          "À un moment il faut cesser de préparer et commencer à vivre.",
      },
      {
        question: "Quel est le vrai statut final du programme ?",
        answers: [
          "ADV1 activé dans le monde réel",
          "En attente de validation RH",
          "À reprendre au trimestre prochain",
          "Confidentiel niveau corporate",
        ],
        correctIndex: 0,
        explanation:
          "Le programme devient réel au moment où la vie prend le relais.",
      },
    ],
  },
];

function runSanityChecks() {
  console.assert(ACCESS_CODE.length > 0, "ACCESS_CODE ne doit pas être vide");
  console.assert(modules.length === 5, "Le programme doit contenir 5 modules");

  modules.forEach((module) => {
    console.assert(module.questions.length === 5, `${module.subtitle} doit avoir 5 questions`);
    module.questions.forEach((question, index) => {
      console.assert(
        question.answers.length === 4,
        `${module.subtitle} question ${index + 1} doit avoir 4 réponses`,
      );
      console.assert(
        question.correctIndex >= 0 && question.correctIndex < question.answers.length,
        `${module.subtitle} question ${index + 1} a un correctIndex invalide`,
      );
      console.assert(
        Boolean(question.explanation),
        `${module.subtitle} question ${index + 1} doit avoir une explication`,
      );
    });
  });
}

function VideoPlayer({
  title,
  subtitle,
  intro,
  url,
}: {
  title: string;
  subtitle: string;
  intro: string;
  url: string;
}) {
  const hasVideo = Boolean(url);
  const isMp4 = hasVideo && (url.endsWith(".mp4") || url.includes(".mp4?"));

  if (hasVideo && isMp4) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/20">
        <div className="aspect-video w-full bg-black">
          <video className="h-full w-full" controls preload="metadata">
            <source src={url} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  if (hasVideo) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/20">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={url}
            title={`${title} ${subtitle}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/20">
      <div className="flex aspect-video flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full border border-white/15 bg-white/5 p-4">
          <Play className="h-8 w-8 text-white/80" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/55">Vidéo à insérer</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {title} · {subtitle}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/65">{intro}</p>
          <p className="mt-4 text-xs leading-6 text-white/40">
            Tu peux mettre un lien embed ou un fichier mp4 local. Exemple : /videos/module1.mp4
          </p>
        </div>
      </div>
    </div>
  );
}

function QuizStep({ module, onSuccess }: { module: Module; onSuccess: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () =>
      module.questions.reduce(
        (acc, question, index) => acc + (answers[index] === question.correctIndex ? 1 : 0),
        0,
      ),
    [answers, module.questions],
  );

  const allAnswered = Object.keys(answers).length === module.questions.length;
  const passed = submitted && score === module.questions.length;

  const isQuestionCorrect = (questionIndex: number) =>
    answers[questionIndex] === module.questions[questionIndex].correctIndex;

  const isAnswerLocked = (questionIndex: number) => submitted && isQuestionCorrect(questionIndex);

  const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
    if (isAnswerLocked(questionIndex)) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    if (score === module.questions.length) onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 text-white" style={{ backgroundColor: `${COLORS.plumSoft}33` }}>
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Test de validation</p>
            <h3 className="text-xl font-semibold text-white">
              Quiz {module.title} · {module.subtitle}
            </h3>
            <p className="mt-2 text-sm text-white/55">
              Après une première validation, tu peux corriger uniquement les réponses ratées. Les bonnes réponses se verrouillent.
            </p>
          </div>
        </div>
      </div>

      {module.questions.map((question, questionIndex) => {
        const questionCorrect = submitted && isQuestionCorrect(questionIndex);
        const selectedIndex = answers[questionIndex];

        return (
          <div
            key={questionIndex}
            className="rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-lg shadow-black/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                  Question {questionIndex + 1}
                </p>
                <h4 className="mt-2 text-lg font-medium leading-7 text-white">{question.question}</h4>
              </div>
              {submitted && (
                <div
                  className={[
                    "rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em]",
                    questionCorrect
                      ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : "border border-rose-400/30 bg-rose-400/10 text-rose-200",
                  ].join(" ")}
                >
                  {questionCorrect ? "Validée" : "À corriger"}
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-3">
              {question.answers.map((answer, answerIndex) => {
                const selected = selectedIndex === answerIndex;
                const revealCorrect = submitted && answerIndex === question.correctIndex;
                const revealWrong = submitted && selected && answerIndex !== question.correctIndex;
                const locked = isAnswerLocked(questionIndex);

                return (
                  <button
                    key={answerIndex}
                    onClick={() => handleAnswerClick(questionIndex, answerIndex)}
                    disabled={locked}
                    className={[
                      "rounded-2xl border px-4 py-3 text-left text-sm transition",
                      selected
                        ? "text-white"
                        : "border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]",
                      selected ? "border-white/20" : "",
                      revealCorrect ? "border-emerald-400/60 bg-emerald-400/10" : "",
                      revealWrong ? "border-rose-400/60 bg-rose-400/10" : "",
                      locked ? "cursor-default" : "",
                    ].join(" ")}
                    style={
                      selected && !revealCorrect && !revealWrong
                        ? { borderColor: `${COLORS.plumSoft}99`, backgroundColor: `${COLORS.plumSoft}1F` }
                        : undefined
                    }
                  >
                    <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current/20 text-xs uppercase">
                      {String.fromCharCode(65 + answerIndex)}
                    </span>
                    {answer}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-sm leading-6 text-white/70">
                  <span className="font-medium text-white">Explication :</span> {question.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/55">Pour débloquer l'artefact, il faut valider toutes les réponses.</p>
          {!allAnswered && (
            <p className="mt-2 text-sm font-medium text-amber-200">
              Réponds d'abord aux {module.questions.length} questions pour lancer la validation.
            </p>
          )}
          {submitted && !passed && (
            <p className="mt-2 text-sm font-medium text-rose-300">
              Résultat actuel : {score}/{module.questions.length}. Corrige uniquement les réponses marquées « À corriger », puis revalide le module.
            </p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-full px-6 py-3 font-medium text-black transition hover:scale-[1.02]"
          style={{ backgroundColor: COLORS.silver }}
        >
          {submitted && !passed ? "Revalider le module" : "Valider le module"}
        </button>
      </div>
    </div>
  );
}

function RewardReveal({ module, onContinue }: { module: Module; onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -20 }}
      className="rounded-[2rem] border p-6 shadow-[0_0_90px_rgba(141,32,74,0.18)]"
      style={{
        borderColor: `${COLORS.plumSoft}4D`,
        background: `linear-gradient(to bottom, ${COLORS.plumSoft}26, ${COLORS.panel}, ${COLORS.bg})`,
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em]"
            style={{
              borderColor: `${COLORS.silverSoft}33`,
              backgroundColor: `${COLORS.plumSoft}1F`,
              color: "#ead7de",
            }}
          >
            <Gift className="h-4 w-4" /> Artefact débloqué
          </motion.div>
          <h3 className="mt-5 text-4xl font-semibold tracking-tight text-white">{module.giftName}</h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{module.rewardLine}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onContinue}
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02]"
            >
              Continuer le programme
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -6, scale: 0.88, filter: "blur(6px)" }}
          animate={{ opacity: 1, rotate: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40"
        >
          <img src={module.giftImage} alt={module.giftName} className="h-[360px] w-full object-cover" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Adv1SitePrototype() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [accessError, setAccessError] = useState(false);

  useEffect(() => {
    runSanityChecks();
  }, []);

  const activeModule = modules[activeModuleIndex];
  const isFinalModule = activeModuleIndex === modules.length - 1;

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      setUnlocked(true);
      setAccessError(false);
    } else {
      setAccessError(true);
    }
  };

  const handleModuleSuccess = () => {
    setCompletedModules((prev) => Array.from(new Set([...prev, activeModule.id])));
    setShowReward(true);
  };

  const continueProgram = () => {
    setShowReward(false);
    if (!isFinalModule) {
      setActiveModuleIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: COLORS.bg }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 32%), radial-gradient(circle at 18% 78%, rgba(141,32,74,0.18), transparent 28%), radial-gradient(circle at 80% 15%, rgba(184,184,194,0.08), transparent 18%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
        <header className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-5">
            <img
              src={LOGO_SRC}
              alt="Logo ADV1"
              className="h-24 w-auto rounded-xl object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <p className="text-xs uppercase tracking-[0.45em]" style={{ color: COLORS.silver }}>
                American Dream Version 1
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">ADV1</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                Programme d'activation d'étoile potentielle. Plateforme interne, strictement confidentielle, à destination d'une seule participante.
              </p>
            </div>
          </div>

          {unlocked && (
            <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/35">Progression</p>
              <p className="mt-2 text-2xl font-semibold">
                {Math.min(activeModuleIndex + 1, modules.length)}/{modules.length}
              </p>
            </div>
          )}
        </header>

        {!unlocked ? (
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/45">
                <Lock className="h-4 w-4" /> Accès restreint
              </div>
              <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
                Entrer le code d'activation pour démarrer le programme
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
                Cette plateforme permet d'accéder aux modules vidéo, aux tests de validation et aux artefacts ADV1. Toute utilisation non autorisée est réservée à une personne probablement jalouse.
              </p>
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="mt-6 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/75 transition hover:bg-white/[0.06]"
              >
                {showHint ? "Masquer l'énigme" : "Afficher l'énigme"}
              </button>
              {showHint && (
                <div
                  className="mt-4 rounded-[1.5rem] border p-5 text-sm leading-7 text-white/80"
                  style={{
                    borderColor: `${COLORS.plumSoft}4D`,
                    backgroundColor: `${COLORS.plumSoft}1A`,
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "#e3d3da" }}>
                    Énigme d'accès
                  </p>
                  <p className="mt-3">{ACCESS_RIDDLE}</p>
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/20">
              <label className="text-xs uppercase tracking-[0.3em] text-white/40">Code d'activation</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="Entrer le code"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-lg uppercase outline-none placeholder:text-white/25 focus:border-white/30"
              />
              <button
                onClick={handleUnlock}
                className="mt-4 w-full rounded-full px-6 py-4 font-medium text-black transition hover:scale-[1.01]"
                style={{ backgroundColor: COLORS.silver }}
              >
                Activer ADV1
              </button>
              {accessError && (
                <p className="mt-4 text-sm font-medium text-rose-300">
                  Code incorrect. Réfléchis comme une future star, pas comme un service RH.
                </p>
              )}
            </div>
          </section>
        ) : (
          <main className="space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">{activeModule.title}</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">{activeModule.subtitle}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-white/65">{activeModule.intro}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {modules.map((module) => {
                    const done = completedModules.includes(module.id);
                    const current = module.id === activeModule.id;
                    return (
                      <div
                        key={module.id}
                        className={[
                          "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em]",
                          current ? "text-white" : "border-white/10 text-white/40",
                          done ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "",
                        ].join(" ")}
                        style={current && !done ? { borderColor: `${COLORS.plumSoft}80`, backgroundColor: `${COLORS.plumSoft}1F` } : undefined}
                      >
                        {done ? <CheckCircle2 className="mr-2 inline h-3.5 w-3.5" /> : null}
                        {module.subtitle}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <AnimatePresence mode="wait">
              {showReward ? (
                <RewardReveal
                  key={`reward-${activeModule.id}`}
                  module={activeModule}
                  onContinue={continueProgram}
                />
              ) : (
                <motion.div
                  key={`module-${activeModule.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="space-y-8"
                >
                  <VideoPlayer
                    title={activeModule.title}
                    subtitle={activeModule.subtitle}
                    intro={activeModule.intro}
                    url={activeModule.videoUrl}
                  />
                  <QuizStep module={activeModule} onSuccess={handleModuleSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        )}
      </div>
    </div>
  );
}
