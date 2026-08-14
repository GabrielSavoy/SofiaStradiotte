import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------
// Conteúdo padrão (usado apenas se a tabela site_content ainda não tiver
// a linha correspondente — ex.: logo após rodar o schema.sql pela primeira
// vez). Assim que a Sofia salvar algo pelo painel, esse fallback deixa de
// ser usado. Os valores abaixo reproduzem o texto original do site.
// ---------------------------------------------------------------------

export const DEFAULT_HOME = {
  eyebrow: "olá, eu sou a",
  name: "Sofia Stradiotte",
  description:
    "Estudante de Moda na FAAP apaixonada por criação, estilo e contar histórias através do design.",
  cta_label: "Saiba mais sobre mim →",
  hero_image_url: "/images/hero-bg.jpg",
  profile_photo_url: "",
  cards: [
    {
      title: "Sobre Mim",
      description: "Um pouco sobre quem sou, minha trajetória e minhas paixões.",
      href: "/sobre",
    },
    {
      title: "Portfólio",
      description: "Confira meus projetos e trabalhos acadêmicos de Moda.",
      href: "/portfolio",
    },
    {
      title: "Fotos",
      description: "Uma seleção especial de fotos e registros que me inspiram.",
      href: "/fotos",
    },
    {
      title: "Currículo",
      description: "Veja minha formação, experiências e habilidades.",
      href: "/curriculo",
    },
    {
      title: "Contato",
      description: "Vamos conversar? Estou aberta a novas conexões!",
      href: "/contato",
    },
  ],
};

export const DEFAULT_ABOUT = {
  heading: "Sobre Mim",
  bio: "Página em construção.",
  formation: "",
  interests: "",
  skills: [],
  image_url: "/images/mannequin-clean.jpg",
};

export const DEFAULT_RESUME = {
  formation: [],
  experience: [],
  courses: [],
  skills: [],
  softwares: [],
  languages: [],
  pdf_url: "",
};

export const DEFAULT_CONTACT = {
  email: "",
  instagram: "",
  linkedin: "",
  phone: "",
  other_links: [],
  page_text: "Vamos conversar? Preencha o formulário abaixo ou me chame nas redes sociais.",
};

async function getSiteContent(key, fallback) {
  const supabase = createClient();
  const { data } = await supabase
    .from("site_content")
    .select("data")
    .eq("key", key)
    .maybeSingle();

  if (!data) return fallback;
  return { ...fallback, ...data.data };
}

export async function getHomeContent() {
  return getSiteContent("home", DEFAULT_HOME);
}

export async function getAboutContent() {
  return getSiteContent("about", DEFAULT_ABOUT);
}

export async function getResumeContent() {
  return getSiteContent("resume", DEFAULT_RESUME);
}

export async function getContactContent() {
  return getSiteContent("contact", DEFAULT_CONTACT);
}

export async function saveSiteContent(key, data) {
  const supabase = createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, data, updated_at: new Date().toISOString() });

  if (error) throw error;
}

// ---------------------------------------------------------------------
// Portfólio
// ---------------------------------------------------------------------

export async function getPortfolioProjects({ onlyPublished = true } = {}) {
  const supabase = createClient();
  let query = supabase
    .from("portfolio_projects")
    .select("*, portfolio_images(*)")
    .order("order_index", { ascending: true });

  if (onlyPublished) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPortfolioProject(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*, portfolio_images(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------------
// Galeria de fotos
// ---------------------------------------------------------------------

export async function getGalleryPhotos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// ---------------------------------------------------------------------
// Mensagens de contato
// ---------------------------------------------------------------------

export async function getContactMessages() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
