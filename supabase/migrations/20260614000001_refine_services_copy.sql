-- Migration: Brand refinement — B2B-focused service copy
-- Metal Shark / Serralheria Platform
-- 2026-06-14

UPDATE services SET
  tagline = 'Portões industriais, comerciais e condominiais com automação e ART inclusa',
  description = 'Fabricamos e instalamos portões de ferro, alumínio e aço inox para condomínios empresariais, galpões industriais e empreendimentos comerciais. Cada projeto é executado por equipe própria, com ART do engenheiro responsável e garantia estrutural.',
  features = '[
    {"title": "Materiais certificados", "description": "Aço ASTM, alumínio estrutural, inox 304/316 e vidro temperado 10mm", "icon": "Shield"},
    {"title": "Automação industrial", "description": "Motores de uso intensivo para alta frequência de acionamento", "icon": "Zap"},
    {"title": "Projeto sob medida", "description": "Compatível com projeto arquitetônico — aceitamos DWG e PDF", "icon": "Ruler"},
    {"title": "ART e garantia", "description": "Anotação de Responsabilidade Técnica e garantia de 5 anos em estrutura", "icon": "Award"}
  ]'::jsonb,
  faq = '[
    {"question": "Qual o prazo de entrega para portões industriais?", "answer": "Portões de uso intensivo (condomínios e galpões): prazo médio de 20 a 30 dias úteis após aprovação do projeto e pagamento do sinal, dependendo do porte e complexidade."},
    {"question": "Vocês atendem contratos de manutenção para frotas de portões?", "answer": "Sim. Oferecemos contratos de manutenção preventiva e corretiva para condomínios e empresas com múltiplos portões. Entre em contato para orçamento de contrato."},
    {"question": "Quais materiais estão disponíveis para uso industrial?", "answer": "Para uso industrial e de alta frequência recomendamos aço galvanizado a fogo, alumínio estrutural 6061 ou inox 316. Também trabalhamos com combinações e acabamentos especiais."}
  ]'::jsonb
WHERE slug = 'portoes';

UPDATE services SET
  tagline = 'Segurança perimetral industrial, comercial e condominial',
  description = 'Grades, cercas e guardrails em aço para perímetros industriais, condomínios empresariais e fachadas comerciais. Projetos compatíveis com normas de segurança patrimonial e memorial descritivo incluso em todos os fornecimentos.',
  features = '[
    {"title": "Segurança patrimonial", "description": "Estruturas certificadas para cercamento e controle de acesso", "icon": "Shield"},
    {"title": "Acabamento durável", "description": "Pintura eletrostática com garantia ou galvanização a fogo para ambientes agressivos", "icon": "Droplets"},
    {"title": "Integração com automação", "description": "Compatível com cancelas, catracas e sistemas de controle de acesso", "icon": "Zap"},
    {"title": "Equipe própria", "description": "Instalação sem terceirização — equipe própria em campo", "icon": "Clock"}
  ]'::jsonb,
  faq = '[
    {"question": "Vocês fazem cercamento para galpões industriais?", "answer": "Sim. Somos especialistas em cercamento perimetral para galpões, parques industriais e condomínios logísticos, incluindo postes, bases de concreto e integração com portões."},
    {"question": "Qual acabamento é recomendado para ambiente industrial externo?", "answer": "Para ambientes com alta umidade, agentes químicos ou salinidade, recomendamos galvanização eletrolítica ou a fogo. Para ambientes internos, pintura eletrostática em pó com primer anti-corrosão é suficiente."},
    {"question": "As grades podem ser integradas com sistemas de alarme?", "answer": "Sim, fornecemos grades com suporte para sensores magnéticos e de vibração, compatíveis com os principais sistemas de alarme do mercado."}
  ]'::jsonb
WHERE slug = 'grades_e_cercas';

UPDATE services SET
  tagline = 'Escadas estruturais para empreendimentos comerciais e industriais com ART inclusa',
  description = 'Escadas metálicas estruturais, helicoidais e flutuantes para empreendimentos comerciais, edifícios corporativos e instalações industriais. Projeto estrutural próprio, ART do engenheiro responsável e conformidade total com ABNT NBR 9077 e NBR 9050.',
  features = '[
    {"title": "Projeto e ART inclusos", "description": "Memorial de cálculo, projeto executivo e ART do responsável técnico", "icon": "FileText"},
    {"title": "Todas as tipologias", "description": "Retas, em L, em U, helicoidais, flutuantes e mistas", "icon": "Layers"},
    {"title": "Acabamentos técnicos", "description": "Aço carbono pintado, inox polido, galvanizado, com vidro ou concreto", "icon": "Gem"},
    {"title": "Normas ABNT e NR", "description": "Conformidade com NBR 9050, NBR 9077, NR-18 e NR-26", "icon": "CheckCircle"}
  ]'::jsonb,
  faq = '[
    {"question": "A escada metálica para uso comercial exige ART?", "answer": "Sim. Toda escada em ambiente de uso coletivo ou comercial requer ART (Anotação de Responsabilidade Técnica) de engenheiro responsável, que entregamos junto com o projeto executivo."},
    {"question": "Qual a carga de projeto para escadas comerciais?", "answer": "Dimensionamos conforme a NBR 6118 e NBR 7190: mínimo de 300 kg/m² para uso coletivo. Para uso industrial, calculamos conforme especificação da NR-12 e demanda do cliente."},
    {"question": "Vocês desenvolvem o projeto executivo a partir de croquis do arquiteto?", "answer": "Sim. Aceitamos projetos em DWG, PDF ou croqui técnico e desenvolvemos o projeto executivo completo, com detalhamentos de fixação, ancoragem e guarda-corpos."}
  ]'::jsonb
WHERE slug = 'escadas';

UPDATE services SET
  tagline = 'Corrimões e guarda-corpos para conformidade NR e ABNT em ambientes comerciais e industriais',
  description = 'Corrimões e guarda-corpos em aço inox, ferro e alumínio para escadas, rampas, varandas, mezaninos e plataformas industriais. Conformidade com NR-18, NR-35 e ABNT NBR 14718, com laudo técnico e ART incluso em todos os projetos.',
  features = '[
    {"title": "Aço inox 304/316", "description": "Para ambientes externos, industriais ou de alta umidade", "icon": "Star"},
    {"title": "Conformidade NR e ABNT", "description": "NR-18, NR-35 e ABNT NBR 14718 — documentação completa para auditoria", "icon": "CheckCircle"},
    {"title": "Ancoragem certificada", "description": "Fixação estrutural em concreto, alvenaria e estrutura metálica com laudo", "icon": "Anchor"},
    {"title": "Baixa manutenção", "description": "Inox polido ou escovado com durabilidade superior para uso intensivo", "icon": "Infinity"}
  ]'::jsonb,
  faq = '[
    {"question": "Qual a altura mínima exigida para guarda-corpo em ambientes industriais?", "answer": "A NBR 14718 exige 1,10m de altura mínima para ambientes de trabalho e acesso público. Para plataformas industriais, seguimos adicionalmente a NR-18 e especificações do cliente."},
    {"question": "Vocês fornecem o laudo técnico e ART para auditoria de segurança do trabalho?", "answer": "Sim. Entregamos ART do responsável técnico, memorial descritivo e laudo de conformidade para auditoria de SESMT, Ministério do Trabalho e seguradoras."},
    {"question": "É possível adequar guarda-corpos existentes para conformidade normativa?", "answer": "Sim, realizamos vistoria técnica, avaliamos a estrutura existente e propomos adequação ou substituição, com emissão de laudo de conformidade ao final."}
  ]'::jsonb
WHERE slug = 'corrimoes';

UPDATE services SET
  tagline = 'Galpões industriais, coberturas e mezaninos com projeto estrutural e ART inclusas',
  description = 'Estruturas metálicas completas para galpões industriais, coberturas, pergolados, mezaninos e plataformas. Projeto estrutural, cálculo computacional, montagem com equipe própria certificada em NR-35, ART e comissionamento inclusos. Do briefing à entrega.',
  features = '[
    {"title": "Engenharia estrutural completa", "description": "Projeto, memorial de cálculo, ART e laudo de inspeção pós-montagem", "icon": "Calculator"},
    {"title": "Gestão de cronograma", "description": "Cronograma físico-financeiro detalhado com marcos de entrega", "icon": "Calendar"},
    {"title": "Montagem certificada", "description": "Equipe própria certificada em trabalho em altura (NR-35) e montagem de estruturas", "icon": "HardHat"},
    {"title": "Certificações", "description": "NR-18, NR-35 e conformidade com ABNT NBR 7190 e 8800", "icon": "Award"}
  ]'::jsonb,
  faq = '[
    {"question": "Qual o prazo para estrutura de um galpão de 1.000m²?", "answer": "Para galpões de até 1.500m² o prazo médio é de 45 a 70 dias — projeto incluso. Acima disso, elaboramos cronograma detalhado na fase de orçamento. O prazo começa após assinatura de contrato."},
    {"question": "Vocês fornecem o projeto estrutural com memorial de cálculo?", "answer": "Sim. Temos engenheiro estrutural próprio. Entregamos projeto em DWG, memorial de cálculo, especificação de materiais e ART do responsável técnico."},
    {"question": "É possível ampliar um galpão existente sem parar a operação?", "answer": "Depende da estrutura atual. Realizamos vistoria técnica gratuita, avaliamos a viabilidade e propomos o método construtivo com menor impacto operacional. Já executamos diversas ampliações com fábrica em plena atividade."}
  ]'::jsonb
WHERE slug = 'estruturas_metalicas';

UPDATE services SET
  tagline = 'Projeto executivo em metal a partir de especificação técnica, DWG ou croqui',
  description = 'Desenvolvemos qualquer projeto metálico a partir de especificação do cliente, do arquiteto ou do engenheiro responsável. Marcenaria metálica, fachadas, mobiliário corporativo, arte em aço e instalações industriais especiais. Aceitamos DWG, PDF e croqui.',
  features = '[
    {"title": "A partir do seu projeto", "description": "DWG, PDF, croqui ou briefing técnico — desenvolvemos o executivo", "icon": "Wand2"},
    {"title": "Parceria com arquitetos", "description": "Workflow integrado com escritórios de arquitetura e engenharia", "icon": "Users"},
    {"title": "Protótipos e amostras", "description": "Desenvolvemos amostras e mockups antes da produção em série", "icon": "FlaskConical"},
    {"title": "Renderização 3D", "description": "Visualização do projeto aprovado antes da execução", "icon": "Box"}
  ]'::jsonb,
  faq = '[
    {"question": "Vocês trabalham com escritórios de arquitetura corporativa?", "answer": "Sim. Temos parceria ativa com escritórios de arquitetura corporativa e interiores. Aceitamos projetos em qualquer formato e desenvolvemos o projeto executivo com detalhamentos de fabricação."},
    {"question": "É possível fabricar mobiliário metálico corporativo em escala?", "answer": "Sim. Desenvolvemos mesas, bancadas, estações de trabalho, estantes e divisórias metálicas para escritórios, estúdios e ambientes corporativos em qualquer escala."},
    {"question": "Qual o valor mínimo de um projeto sob medida?", "answer": "Não trabalhamos com valor mínimo. O orçamento é elaborado conforme escopo técnico. Atendemos de peças únicas a instalações industriais completas. Entre em contato com o briefing do seu projeto."}
  ]'::jsonb
WHERE slug = 'sob_medida';
