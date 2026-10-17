/* =========================================================
   Content — plans, doorways, topics, and the eight volumes
   ========================================================= */
const PLANS = [
  {
    tier: 'Basic', name: '1 Month Diet Plan', price: '5,000',
    desc: 'A focused starting point for practical nutrition planning.',
    features: ['Personalized nutrition review', 'Practical 1-month meal guidance', 'Simple routine-building support']
  },
  {
    tier: 'Advance', badge: 'Most popular', featured: true,
    name: '3 Months Transformation Journey', price: '12,000',
    desc: 'More space for reflection, practice and sustainable habit-building.',
    features: ['Three-month guided nutrition plan', 'Follow-up reflection and adjustments', 'Sustainable habit-building support']
  },
  {
    tier: 'Premium', name: 'Complete Transformation Package', price: '25,000',
    desc: 'Including diet plan, related products, e-books and extended support.',
    features: ['Complete diet and routine plan', 'Related products and e-books', 'Extended support for everyday practice']
  }
];

const DOORWAYS = [
  { key: 'child', num: '01', title: 'I’m here for my child', text: 'Toddler, child or teenager support', sub: 'Toddler · Child · Teenager', go: '/specialization', scroll: 'pediatric' },
  { key: 'parent', num: '02', title: 'I’m here as a parent', text: 'Family meals, picky eating and confidence', sub: 'Family meals · Picky eating · Guidance', go: '/parents' },
  { key: 'adult', num: '03', title: 'I’m here for myself', text: 'Adult nutrition, routines and sustainable support', sub: 'Food habits · Sustainable nutrition', go: '/approach' },
  { key: 'habits', num: '04', title: 'I want help with food habits', text: 'A non-diagnostic starting point for reflection', sub: 'Notice · Understand · Practice', go: '/approach' }
];

const PARENT_TOPICS = [
  { tag: 'Toddler nutrition', title: 'A calmer way to introduce food variety', text: 'Practical ideas for supportive routines, exploration and low-pressure mealtimes.', book: 0 },
  { tag: 'Family meals', title: 'Building a food environment that works', text: 'Small, sustainable changes that make everyday meals feel more manageable.', book: 1 },
  { tag: 'Teen nutrition', title: 'Supporting growth with trust and steadiness', text: 'A compassionate guide to routines, energy and a positive relationship with food.', book: 2 },
  { tag: 'Picky eating', title: 'The picky eater, understood', text: 'Looking at the reasons behind selective eating rather than a label.', book: 4 },
  { tag: 'Food habits', title: 'Small steps that can feel sustainable', text: 'Noticing patterns and practising supportive habits without judgment.', book: 3 },
  { tag: 'Everyday routines', title: 'A parent’s guide to mealtime peace', text: 'Lowering the temperature at the table, one ordinary meal at a time.', book: 7 }
];

/* ---------- the eight volumes ---------- */
const BOOKS = [
  {
    volume: 'I', short: 'Food Variety',
    title: 'A Calmer Way to Introduce Food Variety',
    cat: 'Toddler nutrition',
    c1: '#1d4436', c2: '#0e2a20', w: 46, h: 272, shelf: 1,
    chapters: [
      {
        title: 'Start with the table',
        paragraphs: [
          'Variety rarely begins with a new food. It begins with a table where a child feels safe enough to be curious. Before any vegetable is negotiated, the atmosphere matters: a predictable seat, a familiar adult, a plate that does not feel like a test.',
          'Young children are learning what food is — its colour, weight, smell and sound — long before they learn to enjoy eating it. When a new food appears quietly beside something familiar, it becomes part of the scenery rather than an event. Scenery is repeatable. Events are not.',
          'This is why a calm plate often does more for variety than an enthusiastic presentation. The goal of a meal is not a clean plate or a brave bite; it is another ordinary, low-stakes experience of food.'
        ],
        practice: 'Serve one familiar food beside one new food, and let the new food simply be present — without a single question about it.'
      },
      {
        title: 'The pressure-free plate',
        paragraphs: [
          'Pressure can look polite. “Just one bite.” “You’ll like it.” “For me?” All of it asks the child to perform, and most children respond by becoming more careful, not more curious.',
          'A useful division of responsibility keeps things simple: the adult decides what is offered, when and where. The child decides whether to eat, and how much. That is not permissiveness — it is a clear, respectful boundary that removes the negotiation from the table.',
          'Language can carry the same message. “You can decide if you’d like any” says more than a dozen encouraging sentences, and it can be said once, calmly, every night.'
        ],
        practice: 'Replace “just try one bite” with “you can decide if you’d like any.” Say it once, and let the meal continue.'
      },
      {
        title: 'Exploring, not performing',
        paragraphs: [
          'Looking counts. Touching counts. Sniffing, licking, holding a piece up to the light — all of it is a child gathering information at their own pace. The plate is a classroom, not a stage.',
          'Some children need many quiet meetings with a food before it feels ordinary enough to taste. The number is different for every child, and it is rarely improved by encouragement, bargaining or a reward at the end of the meal.',
          'Keep exploring small and frequent. A tiny bowl of something new on the table — no announcement, no expectation — repeated across weeks, is one of the gentlest teachers there is.'
        ],
        practice: 'Put a new food in a small bowl on the table tonight, with no expectation attached. Do the same tomorrow.'
      }
    ]
  },
  {
    volume: 'II', short: 'Food Environment',
    title: 'Building a Food Environment That Works',
    cat: 'Family meals',
    c1: '#5a2730', c2: '#37161c', w: 52, h: 262, shelf: 1,
    chapters: [
      {
        title: 'What lives in your kitchen',
        paragraphs: [
          'Before changing what a family eats, it helps to look at what the kitchen itself is saying. Whatever sits on the counter, at eye level in the fridge, or within a child’s reach becomes the easy choice — for everyone, adults included.',
          'An environment is not a rulebook. It is a set of gentle defaults: a fruit bowl that is actually visible, water where it is simplest to reach, snacks in a cupboard rather than on display. Nothing is banned; some things simply take one extra step.',
          'Families often find that adjusting the room is easier and calmer than adjusting behaviour at the table. The table can stay a place for conversation, not enforcement.'
        ],
        practice: 'Move one thing you would like to see chosen more often to the easiest shelf — and one thing you would like to see less often one step further away.'
      },
      {
        title: 'Routines before rules',
        paragraphs: [
          'Children relax around food when they can predict it. A loose rhythm of three meals and two or three sit-down snacks is often enough to make appetite feel safe, and to reduce grazing through the afternoon.',
          'Rules tend to multiply at the table — finish this, earn that, no seconds until… Routines do the opposite: they give the day a shape without turning each meal into a decision.',
          'The rhythm does not need to be perfect. A late snack or a rushed breakfast is not a failure; it is simply tomorrow’s opportunity to return to the pattern.'
        ],
        practice: 'Choose a snack time that suits your afternoons and keep it roughly the same for a week. That is the whole task.'
      },
      {
        title: 'The shared table',
        paragraphs: [
          'Family-style serving — dishes in the middle, everyone helping themselves with support — lets children practise choice in a natural way. It also quietly communicates that the meal belongs to everyone.',
          'One meal, offered the same way to adults and children, saves effort and reduces the feeling of being “fed differently.” If a child prefers components separated, that can be arranged on the plate without a separate menu.',
          'What happens at the table matters as much as what is on it. A little conversation, a little boredom, one familiar face — these are the conditions under which children usually eat best.'
        ],
        practice: 'Tonight, put one dish in the centre of the table instead of plating it in advance, and let everyone serve themselves with help.'
      }
    ]
  },
  {
    volume: 'III', short: 'Growth & Trust',
    title: 'Supporting Growth with Trust and Steadiness',
    cat: 'Teen nutrition',
    c1: '#24344f', c2: '#131f33', w: 40, h: 282, shelf: 1,
    chapters: [
      {
        title: 'The changing body',
        paragraphs: [
          'The teenage years are a long stretch of change: growth spurts, shifts in appetite, new schedules and a developing sense of self. Appetite often rises and falls unevenly through this time, and both are usually normal.',
          'What does not help is commentary. Remarks about weight, portions or appearance — even well-meant ones — tend to make teenagers more self-conscious about eating, and more likely to eat away from the family table.',
          'The steadier approach is unremarkable: regular meals, available food, and conversations that are not about the body. Trust grows quietly in that ordinary consistency.'
        ],
        practice: 'For one week, notice any comment you are about to make about appearance or eating, and let it pass unsaid.'
      },
      {
        title: 'Autonomy at the table',
        paragraphs: [
          'Teenagers need ownership. Being given choices — which meal, when to join, what to add — meets that need without turning food into a battleground.',
          'This often means loosening the shape of family meals: a plate kept warm, an open invitation to sit, a standing breakfast that works with early mornings. Flexibility is not the same as no structure; it is structure that respects growing independence.',
          'When a teenager declines a meal, it can be useful to ask, once, what they would like available instead — then stock it. Making the healthy option the easy option is more persuasive than any lecture.'
        ],
        practice: 'Ask your teenager what they would actually like to have available for after-school or late evening, and add one of their answers to the weekly shop.'
      },
      {
        title: 'Conversations that help',
        paragraphs: [
          'Food talk with teenagers works best when it is short, curious and free of moral judgement. “What did you have at lunch?” lands differently from “You should be eating better.”',
          'Try to keep the focus on how food helps them do what they already care about — energy for training, concentration for exams, feeling steady through the day. Nutrition becomes relevant when it serves their own goals.',
          'If something worries you deeply — a big change in eating, weight or mood — speak with a health professional rather than turning the kitchen into a clinic. Teenagers usually need adults who can hold concern without making food the subject of every conversation.'
        ],
        practice: 'Replace one “you should…” with “what would help?” this week.'
      }
    ]
  },
  {
    volume: 'IV', short: 'Small Steps',
    title: 'Small Steps That Can Feel Sustainable',
    cat: 'Food habits',
    c1: '#463049', c2: '#291b2c', w: 44, h: 250, shelf: 1,
    chapters: [
      {
        title: 'Notice',
        paragraphs: [
          'Change begins with noticing, not judging. Before deciding what to adjust, it helps to look at an ordinary week with curiosity: when meals happen, where they happen, what feels rushed, and what already works.',
          'Noticing is not a diary to be graded. It is simply information. Families often discover that the hardest moments are not really about food — they are about timing, tiredness or transitions.',
          'Once a pattern is visible, it becomes something that can be gently adjusted, rather than a personal failing to be fixed.'
        ],
        practice: 'For three days, note only two things: what time meals actually happened, and how the table felt. Nothing else.'
      },
      {
        title: 'Choose one thing',
        paragraphs: [
          'Big plans fail quietly. One specific, modest change — added to an existing routine — tends to last far longer than a complete overhaul.',
          'Good examples are small enough to be uninteresting: water on the table at every meal, a fruit added to breakfast, one shared dinner each week without screens. If the change feels almost too easy, it is probably right.',
          'Choose it because it matters for your family, not because it sounds impressive. Sustainable habits are usually plain.'
        ],
        practice: 'Write down one change you could start tomorrow and keep for two weeks, even on a bad day.'
      },
      {
        title: 'Keep and adjust',
        paragraphs: [
          'A habit is built through repetition and repair, not perfection. Missed days are part of the process; the useful question is what made the habit harder, not who is to blame.',
          'After a couple of weeks, reflect: is this working? If yes, keep going. If not, shrink the change rather than abandoning it. A habit that survives a difficult week is worth more than a plan that only works on calm ones.',
          'Only then consider adding the next small thing. Stacking slowly is what makes a routine feel like your own life rather than a programme.'
        ],
        practice: 'At the end of the week, ask one question: “what made this easier, and what made it harder?” Adjust one of the answers.'
      }
    ]
  },
  {
    volume: 'V', short: 'Picky Eater',
    title: 'The Picky Eater, Understood',
    cat: 'Eating behaviour',
    c1: '#1f4747', c2: '#0f2c2c', w: 46, h: 268, shelf: 2,
    chapters: [
      {
        title: 'Behaviour is information',
        paragraphs: [
          'Selective eating is not stubbornness for its own sake. It can be connected to sensory sensitivity, a need for control, anxiety, appetite, painful eating experiences, or simply a cautious temperament.',
          'This is why the label “picky eater” is often less useful than it sounds. It describes the behaviour at the table but says nothing about the reason — and the reason is what guides the support.',
          'Looking for the reason is not about blaming anyone. It is about noticing when the behaviour is strongest, what it protects the child from, and what would help them feel safe enough to try.'
        ],
        practice: 'Next time a meal is difficult, ask yourself one curious question: “what might this behaviour be telling me?”'
      },
      {
        title: 'Serve without pressure',
        paragraphs: [
          'Pressure wears many disguises: encouragement, praise for trying, negotiation, hiding and bargaining. Children often read all of it as “this food is a big deal”, which makes it harder to approach.',
          'A more supportive pattern is to serve a safe food alongside the family meal, keep portions small and neutral, stay calm and let the child decide. Some families call this a “learning plate” — food that is there to be explored, not finished.',
          'It helps to protect the social side of meals, too. Eating together without an audience focused on intake teaches more than any instruction.'
        ],
        practice: 'At the next meal, place one very small portion of the family food on the plate without comment — and say nothing if it stays there.'
      },
      {
        title: 'Progress, not perfection',
        paragraphs: [
          'Progress can be slow and non-linear: touching a food this month, tasting it next month, accepting it next year. That is a normal timeline for many children.',
          'Support is worth seeking when eating is affecting growth, causes significant distress, narrows to very few foods, or when a child gags, coughs or struggles with certain textures. In those situations, a paediatrician or feeding specialist should be involved alongside nutrition support.',
          'At home, the most protective thing you can offer is calm consistency: the same gentle structure, the same pressure-free table, and the willingness to let progress look small.'
        ],
        practice: 'Keep a short note of small wins — a touch, a sniff, a taste. Read it back at the end of the month.'
      }
    ]
  },
  {
    volume: 'VI', short: 'Balanced Plates',
    title: 'Balanced Plates for Busy Weeknights',
    cat: 'Everyday meals',
    c1: '#6b4227', c2: '#422716', w: 50, h: 256, shelf: 2,
    chapters: [
      {
        title: 'The plate, simply',
        paragraphs: [
          'A balanced plate does not need to be measured. It is a useful picture, not a rule: something with protein, something with carbohydrate, vegetables or fruit, and a little fat for flavour and satisfaction.',
          'Meals do not need to include every element perfectly. Balance is better judged across a day or a week than at a single meal — and even then, it is a direction, not a score.',
          'When families stop chasing the ideal plate, they often start cooking more often. That is a better outcome than a perfect plan followed twice.'
        ],
        practice: 'Look at tonight’s meal and ask which of the four elements is already there. Add just one that is missing — nothing more.'
      },
      {
        title: 'Twenty-minute foundations',
        paragraphs: [
          'Busy weeknights are won in advance, with a few basics ready in the fridge or cupboard: cooked grains, washed vegetables, a protein that can be reheated, a jar of something that adds flavour quickly.',
          'These are not meal plans; they are ingredients that make a decent meal possible in twenty minutes. A child can help assemble, which quietly builds familiarity with the food being served.',
          'Convenience is not the opposite of good nutrition. Frozen vegetables, tinned beans and ready-cooked grains are perfectly useful tools for a real family week.'
        ],
        practice: 'Prepare one base ingredient tonight — a pot of rice, some boiled eggs, or chopped vegetables — to make tomorrow easier.'
      },
      {
        title: 'Planning without pressure',
        paragraphs: [
          'A plan that survives real life is loose. Many families find a simple weekly rhythm more workable than a detailed menu: a pasta night, a legume night, a fish or chicken night, a leftovers night.',
          'Repetition is not laziness — it reduces decisions and often increases how much children eat, because familiar meals feel safe. Variety can be added inside a familiar shape.',
          'Leave two nights open. A week with space in it is a week that can still work when something changes.'
        ],
        practice: 'Write a four-night rhythm for next week and leave the other nights unplanned.'
      }
    ]
  },
  {
    volume: 'VII', short: 'Appetite & Growth',
    title: 'Appetite, Growth and Gentle Structure',
    cat: 'Child nutrition',
    c1: '#2f4a2b', c2: '#1b2e19', w: 38, h: 276, shelf: 2,
    chapters: [
      {
        title: 'Appetite varies',
        paragraphs: [
          'Appetite is not a setting; it is a signal that moves. Children can eat a great deal one day and very little the next, and both can be entirely ordinary. Growth happens in waves, and appetite often follows.',
          'This variability is one reason “clean plate” expectations can backfire. They teach a child to ignore fullness — the very signal that helps them regulate eating for life.',
          'It helps to look at intake across a week rather than a single meal. Most children balance surprisingly well when the structure around them is steady.'
        ],
        practice: 'For one week, notice what your child eats across the whole week rather than judging any single meal.'
      },
      {
        title: 'Structure and trust',
        paragraphs: [
          'A dependable rhythm of meals and snacks supports appetite without pressure. It gives hunger a place to land, and it removes the need to graze constantly between times.',
          'Within that rhythm, trust the child’s cues. Offer the food, sit together, and let appetite decide the amount. A child who is allowed to stop when full is learning something valuable.',
          'Growth and development are best assessed by a health professional over time, using measurements and context — not by comparing plates at the table.'
        ],
        practice: 'Keep meals and snacks at roughly the same times for a week, and let quantity be entirely your child’s decision.'
      },
      {
        title: 'When to seek support',
        paragraphs: [
          'Some situations deserve professional attention rather than patience alone: weight loss or faltering growth, extreme restriction, choking or difficulty swallowing, persistent pain, or a marked change in energy and mood.',
          'In those cases, nutrition support works alongside your physician or a paediatric specialist. A dietitian helps translate medical guidance into everyday food that a child can actually manage.',
          'Seeking help early is not an overreaction. It is the same instinct that makes a parent notice — and it deserves a calm, qualified response.'
        ],
        practice: 'If something has worried you for more than a few weeks, write it down and bring it to your next medical appointment.'
      }
    ]
  },
  {
    volume: 'VIII', short: 'Mealtime Peace',
    title: 'A Parent’s Guide to Mealtime Peace',
    cat: 'Routines',
    c1: '#4d2136', c2: '#2c1120', w: 42, h: 260, shelf: 2,
    chapters: [
      {
        title: 'Lower the temperature',
        paragraphs: [
          'The atmosphere at a meal is contagious. When a parent is tense, children often become more cautious; when a parent is calm, the table becomes a less important place to win or lose.',
          'Lowering the temperature can be physical as well as emotional: fewer demands, less commentary, a predictable start, and permission for the meal to be unremarkable.',
          'This is not about pretending everything is fine. It is about choosing not to make food the place where every worry is negotiated.'
        ],
        practice: 'Before sitting down tonight, take one slow breath and decide that the meal does not need to be fixed.'
      },
      {
        title: 'Scripts that help',
        paragraphs: [
          'Having a few calm sentences ready makes difficult moments easier. “This is what we’re having today.” “You don’t have to eat it.” “You can decide.” “There will be another meal later.”',
          'These phrases do two things at once: they hold the boundary and they remove pressure. Said once, without argument, they are usually enough.',
          'It also helps to decide in advance which conversations do not belong at the table. Correction and coaching can wait; a shared meal is a poor classroom and a good meeting place.'
        ],
        practice: 'Choose one sentence from this chapter and practise it once before dinner, so it arrives calmly.'
      },
      {
        title: 'Repair, not perfect',
        paragraphs: [
          'Some meals will go badly. Someone will cry, someone will shout, and the food will go uneaten. This is ordinary family life, not evidence that the approach has failed.',
          'What matters is repair: the next meal begins again, calmly, without a speech about last night. Children learn more from how a family returns to the table than from any single meal.',
          'Peace at mealtimes is not the absence of difficulty. It is the presence of a routine gentle enough for everyone to come back to.'
        ],
        practice: 'If a meal goes badly this week, let the next one start with no reference to it at all.'
      }
    ]
  }
];
