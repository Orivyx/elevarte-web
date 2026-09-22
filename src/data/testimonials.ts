export interface Testimonial {
  id: string;
  quote: { pt: string; en: string };
  name: string;
  role: { pt: string; en: string };
}

// Testimonials supplied by the user.



export const testimonials: Testimonial[] = [
  {
    "id": "mariana",
    "name": "Mariana Costa",
    "role": {
      "pt": "Fundadora · Casa Oliva",
      "en": "Founder · Casa Oliva"
    },
    "quote": {
      "pt": "Chegamos com muitas ideias, mas sem saber como traduzi-las em uma marca. A equipe entendeu nossa essência e criou uma identidade que tem tudo a ver com a Casa Oliva. Hoje, conseguimos apresentar nosso trabalho com muito mais confiança.",
      "en": "We came with many ideas but did not know how to translate them into a brand. The team understood our essence and created an identity that truly fits Casa Oliva. Today, we can present our work with much more confidence."
    }
  },
  {
    "id": "rafael",
    "name": "Rafael Mendes",
    "role": {
      "pt": "Diretor de Marketing · Vértice Tecnologia",
      "en": "Marketing Director · Vértice Tecnologia"
    },
    "quote": {
      "pt": "O grande diferencial foi o cuidado em entender nosso negócio antes de começar a desenhar. O resultado trouxe clareza para a comunicação e facilitou o trabalho da nossa equipe no dia a dia.",
      "en": "What stood out was the care taken to understand our business before starting to design. The result brought clarity to our communication and made our team’s everyday work easier."
    }
  },
  {
    "id": "camila",
    "name": "Camila Duarte",
    "role": {
      "pt": "Sócia-diretora · Aurora Arquitetura",
      "en": "Managing Partner · Aurora Arquitetura"
    },
    "quote": {
      "pt": "Queríamos uma identidade que transmitisse a personalidade do escritório. Do primeiro encontro à entrega, sentimos que nossas ideias foram ouvidas. Cada escolha fez sentido, e o resultado ficou muito próximo de quem somos.",
      "en": "We wanted an identity that expressed our studio’s personality. From the first meeting to delivery, we felt our ideas were heard. Every choice made sense, and the result felt very close to who we are."
    }
  },
  {
    "id": "lucas",
    "name": "Lucas Ferreira",
    "role": {
      "pt": "CEO · Nexo Consultoria",
      "en": "CEO · Nexo Consultoria"
    },
    "quote": {
      "pt": "Nossa apresentação visual já não acompanhava o momento da empresa. O estúdio nos ajudou a organizar a mensagem e construir uma marca mais consistente. Foi um processo colaborativo, com espaço para conversar e ajustar cada detalhe.",
      "en": "Our visual presentation no longer reflected where the company was. The studio helped us organize our message and build a more consistent brand. It was a collaborative process, with room to discuss and refine every detail."
    }
  },
  {
    "id": "beatriz",
    "name": "Beatriz Almeida",
    "role": {
      "pt": "Fundadora · Botânica Café",
      "en": "Founder · Botânica Café"
    },
    "quote": {
      "pt": "Foi especial ver a identidade ganhar vida nas embalagens, no cardápio e na fachada. Tudo conversa entre si e combina com a experiência que queremos oferecer. Os clientes perceberam esse cuidado também.",
      "en": "It was special to see the identity come to life on the packaging, menu and storefront. Everything works together and matches the experience we want to offer. Customers noticed that care too."
    }
  }
];
