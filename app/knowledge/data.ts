export type KnowledgeCategory =
  | "Exam Guides"
  | "Understanding Your Body"
  | "Healthy Lifestyle";

export type KnowledgeArticle = {
  id: string;
  slug: string;
  title: string;
  category: KnowledgeCategory;
  excerpt: string;
  content: string[]; // paragraphs for simple rendering
  visuals?: {
    type: "diagram" | "video";
    src?: string; // optional for future
    description?: string;
  }[];
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "exam-basics",
    slug: "exam-basics",
    title: "Breast Self-Check: A Gentle Guide",
    category: "Exam Guides",
    excerpt:
      "Learn a simple, mindful approach to scanning in four areas to notice changes early.",
    content: [
      "Self-awareness is about noticing what’s normal for you. A calm, consistent routine helps you recognize changes over time.",
      "Use the pads of your fingers and move in small circles, covering the full breast in four areas: upper-left, upper-right, lower-left, and lower-right.",
      "Apply light to medium pressure and take your time. If you notice something new, make a note and re-check in a few days or talk to a professional.",
    ],
    visuals: [
      { type: "diagram", description: "Four-quadrant breast diagram" },
    ],
  },
  {
    id: "know-your-normal",
    slug: "know-your-normal",
    title: "Know Your Normal",
    category: "Understanding Your Body",
    excerpt:
      "Hormones and cycles can change how your body feels. Tracking patterns reveals your normal.",
    content: [
      "Tenderness or swelling can appear during certain parts of your cycle. Logging helps connect symptoms with time.",
      "Look for what’s typical for you. If something persists or feels different, write it down and follow up.",
    ],
  },
  {
    id: "daily-care",
    slug: "daily-care",
    title: "Daily Care Habits",
    category: "Healthy Lifestyle",
    excerpt:
      "Small, steady habits—sleep, hydration, and movement—support long-term breast health.",
    content: [
      "Aim for regular sleep, hydration, and gentle movement. Supportive clothing can help reduce discomfort.",
      "Stress care matters too. Breathing practices and short walks can make a difference.",
    ],
    visuals: [
      { type: "video", description: "1-minute breathing exercise" },
    ],
  },
];

export const knowledgeCategories: KnowledgeCategory[] = [
  "Exam Guides",
  "Understanding Your Body",
  "Healthy Lifestyle",
];

export function findArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((a) => a.slug === slug);
}

