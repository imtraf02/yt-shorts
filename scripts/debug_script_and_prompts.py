# -*- coding: utf-8 -*-
import json
import sys

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Original prompts from user prompt:
PROMPTS = {
    1: "{MINH} lying on his bed at night scrolling on his phone, face lit by cold blue glow, cozy messy bedroom, city lights through the window, medium shot",
    2: "Extreme close-up of a thumb swiping a phone screen filled with colorful abstract video thumbnails, motion lines, shallow depth of field",
    3: "Wide establishing shot of a giant glowing skyscraper shaped like a smartphone with a massive golden vault on its roof, city at dusk, epic scale",
    4: "A gigantic mountain of gold coins reaching the clouds at sunset, tiny human silhouettes at its base looking up in awe",
    5: "{MINH} turning his empty wallet inside out with a comically confused face, floating glowing question-mark symbols around him",
    6: "Split composition: on the left {MINH} smiling while scrolling his phone, on the right a shadowy hand in a business suit reaching from behind and counting coins",
    7: "Silhouette of {MR_FEED} standing on a rooftop overlooking a city of glowing windows, each window showing a tiny person looking at a phone, night, moody",
    8: "{XU} peeking out of {MINH}'s hoodie pocket and winking at the viewer, playful close-up",

    9: "19th-century American saloon interior, wooden bar, a chalkboard with a drawn plate icon and no text, crowded customers eating a free lunch, warm lantern light",
    10: "Close-up of salty pretzels and cured ham on a plate, a customer beside it looking thirsty with a sweat drop, gripping an empty mug",
    11: "A sly bartender filling a row of beer mugs, coins clinking into an old cash register, warm saloon atmosphere",
    12: "Modern Vietnamese cafe, {MINH} at a table with a laptop and a single empty glass, a glowing wifi symbol above him, the cafe owner watching from the counter with a raised eyebrow, comedic mood",
    13: "Bakery production line, loaves of bread on a conveyor belt each with a small coin tag, showing cost per loaf, warm colors",
    14: "A server room of glowing racks, a single luminous app icon being duplicated into thousands of copies flowing out along light beams to phones around the globe",
    15: "A giant machine stamping out identical glowing cubes, each one almost weightless, a tiny cent coin beside the output slot",
    16: "A price tag tumbling down a steep slide into a glowing circular hole, playful and exaggerated",
    17: "Two rival shops on opposite sides of a street, both owners nervously lowering price tags that carry only a circle symbol, comedic tension",
    18: "{XU} sitting on a swing looking suspiciously at the viewer with a lunch tray beside it, ambiguous 'who pays for this?' expression",

    19: "Traditional Vietnamese market scene, vendors and buyers, a central stall owner linking both sides with glowing golden threads, lively and colorful",
    20: "An old newspaper stand, readers on one side buying cheaply, advertisers on the other side passing up poster boards, vintage warm tones",
    21: "A giant glowing bridge connecting two islands, one island packed with crowds of people, the other with shops and billboards, aerial view, fantasy anime style",
    22: "A credit-card terminal scene: a shopper swipes a card, the shop owner smiles, a glowing thread runs from the terminal to a bank tower in the distance",
    23: "{MR_FEED} standing on a golden balance scale between two crowds: on the left people holding phones, on the right people in suits holding megaphones and briefcases",
    24: "A giant see-saw with crowds of people and heart icons lifted high on one side, a heavy pile of gold coins on the other, {MR_FEED} sitting at the pivot",
    25: "Two entrance gates: a bright welcoming gate with no ticket booth for users, and a golden gate with a cash register for advertisers",
    26: "A kindly elderly economist character with gray hair at a chalkboard drawing two connected circles with arrows (icons only, no text), warm classroom light",
    27: "{MINH} sees a monthly price tag and runs away comically, a stream of tiny users fleeing out of an app-shaped door behind him",
    28: "The abandoned app city: empty streets and plazas, advertisers standing baffled in an empty square, dry leaves blowing, funny-sad mood",
    29: "A small elegant purple door with a shield icon labeled with no text, {MINH} holding his wallet hesitating in front of it, a price tag floating nearby",
    30: "Surreal shot: a giant marketplace whose stalls stand on a huge portrait of {MINH} lying like a landscape, tiny vendors selling on his face, whimsical",

    31: "An old inventor sitting alone next to the world's first telephone in an empty room, wires leading nowhere, lonely and funny",
    32: "A city fully connected by telephone wires, people chatting joyfully on balconies and streets, colorful and lively",
    33: "A glowing network of nodes connecting people across a globe, exponential growth, luminous lines, dark blue background",
    34: "A large flywheel made of people, coins and phones circulating around a circle, dynamic energy, motion trails",
    35: "A cliff edge tipping point: small rival app characters left behind on one side, one giant glowing ball rolling downhill and growing, dramatic angle",
    36: "A snowball rolling down a mountain gathering people, houses and coins as it grows, action shot",
    37: "{MR_FEED} feeding stacks of cash into a furnace to power a locomotive racing across a landscape, cheering passengers in the windows",
    38: "A generic neon-colored mascot character throwing gift envelopes and confetti at a crowd of new users, party mood, no real brand shapes",
    39: "{MINH} trying to sneak out through a 'group chat' door while a horde of chibi relatives' hands pulls him back by the hoodie, comedic",
    40: "A cozy cage shaped like a heart-notification icon with a sofa and wifi inside, the door wide open but nobody leaving, humorous",
    41: "{MR_FEED} holding a giant vacuum scooping up tiny startup apps into a tray, small apps waving in panic, cartoonish",
    42: "Two small generic buildings, one shaped like a camera and one like a speech bubble, being bought with briefcases of cash by {MR_FEED}, corporate acquisition parody, no logos",
    43: "Split composition: left a web of friends linked by lines, right a rain of glowing videos falling toward one viewer who catches the ones they like",
    44: "{HA} shocked at her phone as fireworks, stars and confetti burst around her, viral moment, joyful",

    45: "A fictional 1970s scholar in a library of towering book stacks, an avalanche of papers burying a tiny lightbulb-shaped 'attention' character, dramatic",
    46: "A large 24-hour clock shaped like a pie chart with big wedges for sleeping, working and eating, and a tiny slice left that {MINH} holds like a piece of cake",
    47: "A tiny golden hourglass held between two fingers, tiny crowds trying to grab the falling sand, macro fantasy style",
    48: "A never-ending vertical road made of video frames stretching into the sky, {MINH} a tiny figure walking on it, surreal",
    49: "{MINH} eating from a bowl of chips whose bottom is a swirling portal, chips endlessly refilling, comedic",
    50: "A red notification bubble glowing like a menacing eye in a dark room, {MINH} half asleep staring at it",
    51: "{MINH} riding an armchair on a sushi-style conveyor belt loaded with video frames, dreamy and funny",
    52: "A slot machine with phone screens as reels, {MINH} pulling the lever with sparkles of hearts and stars, sly {MR_FEED} standing in the background",
    53: "A candy dispenser dropping a colorful candy with each swipe, {MINH} surrounded by a pile of wrappers, cute but slightly sinister",
    54: "A choice illustration: left a tiny cake labeled 'now' by a clock icon, right a huge glowing treasure chest far away, {MINH} reaching for the cake with a hopeless smile",
    55: "A dark bedroom at 2 AM with phone glow, {MINH} watching a video of someone baking, while a single raw egg sits untouched in a pot on a kitchen counter in the background, comedic",
    56: "Dreamlike surreal scene of dozens of melting clocks shaped like phones drooping over branches, anime style",

    57: "A giant glass jar holding tiny floating icons of {MINH}'s interests (shoes, food, music, games), {MINH} peering at it through a magnifier",
    58: "A huge eye-shaped camera lens watching a crowd, each person with a small thought bubble of icons (shoes, travel, coffee)",
    59: "Close-up of {MINH}'s pupils reflecting a shoe ad on a phone screen, a clock ticking beside him, {MR_FEED} peeking through a magnifying glass at the reflection",
    60: "A phone lying on a cafe table with a pair of tiny curious eyes on its dark screen, secretly watching {MINH} chatting with a friend about new shoes, comedic",
    61: "A high-speed auction room, {MS_ADS} and rival advertisers raising paddles, a holographic silhouette of {MINH} floating as the prize",
    62: "Time-freeze shot: {MINH}'s thumb tapping an app icon and a ripple of dozens of tiny bidders' hands appearing around the tap point, dynamic",
    63: "Three floating orbs (a coin, a cursor arrow, a star) merging into one glowing ad card, {MS_ADS} looking thrilled",
    64: "Comparison scene: a tailor measuring a customer with care on one side, a factory mass-producing identical suits on the other",
    65: "A crowd in a plaza where a person hands out flyers randomly, most falling to the ground, versus a warm spotlight on one bride-to-be in the crowd, split composition",
    66: "An endless scroll of legal paper unrolling into the horizon, only two buttons at the end (a green check and a red exit door), {MINH} tiny in front of it",
    67: "A world map where regions glow with coins of different sizes, {MINH} standing on his home region looking at his small coin with a comedic sigh, respectful and light",
    68: "{MINH} standing on an auction stage in a spotlight, paddles raised in the dark audience, holding an unopened invitation envelope, confused",

    69: "A balance scale, one pan with a price tag, the other with half a price tag, and glowing bonus coins floating up from the difference",
    70: "A warm scene of a grandmother on a video call with her grandchild abroad, tea on the table, soft evening light",
    71: "A student learning to repair a bicycle by watching a tutorial on a phone, small workshop, hopeful mood",
    72: "Fairy-like map and search-bar icon helpers hovering around {MINH} riding a scooter through a busy Vietnamese street",
    73: "Researchers in lab coats holding a poll clipboard with a floating pile of coins in a thought bubble, comedic exaggeration",
    74: "{MINH} deactivating his app: a heavy backpack lifting off his shoulders, sunlight breaking through the clouds, relief",
    75: "An economist squinting through a magnifier at a giant ledger book with an empty glowing page where the free things are invisible",
    76: "Tug of war: a rope with a sparkling gift at one end and a heavy chain at the other, {MINH} in the middle",
    77: "{XU} balancing on a see-saw with a heart on one end and a clock on the other, thoughtful expression",
    78: "A crossroads: one path leads to a bright green park with friends, the other to a neon glowing screen world, {MINH} standing in between",

    79: "A factory chimney pouring smoke over a small village while the factory owner counts profits inside, classic pollution metaphor, moody sky",
    80: "The same layout but the chimney is shaped like a smartphone and the smoke is made of notification bubbles drifting into people's homes",
    81: "A giant year calendar grid with about thirty squares faded and shaded, {MINH} looking at the 'lost month' with a stunned face",
    82: "An hourglass pouring two hours of sand each day, a year's pile forming a mountain, comparing to a whole month",
    83: "A person looking in a mirror while shiny idealized versions of others float on screens around them, gentle sadness, soft colors",
    84: "Two lab groups presenting different result charts (icons only) with a shrug expression from a scientist, 'evidence is mixed' mood",
    85: "An outrageous headline-shaped megaphone spreading wildfire across a town, a small calm candle of truth ignored on a windowsill",
    86: "An angry-face bubble riding a rocket while a calm truth bubble walks slowly on foot, rocket far ahead, comedic",
    87: "A government inspector with a big tax stamp approaching the phone-shaped chimney factory, stern but humorous",
    88: "A scale showing profit for the company on one side and a huge invisible bill floating above everyone else's heads on the other",

    89: "{HA} filming a video in a small cozy apartment with a ring light and phone on a tripod, hopeful expression, warm light",
    90: "A pyramid of income: a tiny top with a gold-crowned superstar under stage lights and a vast base of small figures looking up",
    91: "A lottery drum spinning with tiny creator faces inside, {HA} watching with fingers crossed",
    92: "A rice paddy field, {HA} in a conical hat farming, {MR_FEED} as a landlord in a suit collecting a big sack of rice at harvest",
    93: "A giant weather vane spinning wildly, {HA}'s rice field suddenly empty and dusty, eerie silence",
    94: "{CO_BA} in her wedding-dress boutique staring at a long monthly ad-cost receipt with a big sigh, mannequins in the background",
    95: "A crowded auction of shop owners bidding for a single customer, a thermometer rising with the prices",
    96: "Three-panel evolution: a friendly cafe welcoming users, then the same cafe filled with ad posters, then the same cafe crammed with ads and price hikes and a sad owner",
    97: "A cake being sliced: the platform takes the biggest slice, {HA} holds a thin sliver with a wry smile",
    98: "{HA} building her own small lighthouse on a rocky coast, storm clouds behind her, hopeful and determined",

    99: "A woman regulator in a suit holding balance scales confronting a giant tech titan with calm respect, courtroom light",
    100: "Small startups on a beach in front of a rising wave shaped like a giant phone, a small lighthouse offering hope",
    101: "A grand council chamber with characters debating around a round table, a holographic padlock floating above it",
    102: "A padlock and key over a data vault, {MINH} receiving the key with a proud expression",
    103: "Two doors again: a bright free door with ad posters and a plain paid door without, {MINH} thinking carefully",
    104: "{MINH} in work clothes at a data mine with a pickaxe shaped like a phone, receiving a paycheck envelope, whimsical",
    105: "Debate scene split in two: pro-regulation and anti-regulation groups pulling a rope, neutral and balanced mood",
    106: "A future city in 2040 with floating screens and people walking, friendly atmosphere, slightly ambiguous mood",
    107: "Sunrise over a city skyline, soft light, hopeful and uncertain, cinematic wide shot",
    108: "A giant question-mark-shaped cloud on the horizon of a blue sky, {MINH} looking up at it",

    109: "{MINH} setting a timer on his phone, a small hourglass icon on the screen, bright sunlit bedroom, cheerful",
    110: "{MINH} muting notifications, red bubbles fizzling out like extinguished sparks, calm atmosphere",
    111: "{MINH} putting his phone in a drawer and stepping out to a sunny park with friends, joyful",
    112: "{MINH} looking in a mirror with a thought bubble of icons (an app and a question mark), self-aware and amused",
    113: "{HA} placing eggs into several different baskets (a website, an envelope, a community icon), sensible and cute",
    114: "A bridge linking {HA} directly with her audience without a platform in the middle, sunny landscape",

    115: "{XU} holding a big question mark and smiling at the viewer, single spotlight, clean background",
    116: "Group shot of {MINH}, {HA}, {CO_BA}, {MS_ADS}, {MR_FEED} and {XU} standing together on a sunny city rooftop, warm friendly mood",
    117: "Close-up of {MINH}'s face with a knowing smile, soft light",
    118: "A quiet final shot: a phone face-down on a table next to a cup of coffee and window light, peaceful",
    119: "{XU} waving goodbye with sparkles around it",
    120: "Warm sunset over the rooftop with a small silhouette of {MINH} walking away, cinematic ending frame"
}

meta = json.load(open("src/data/facebook_who_pays_chapters.json", encoding="utf-8"))
for ch in meta:
    print(f"\n==================== {ch['id']} ({ch['title']}) ====================")
    for p_idx, para in enumerate(ch["paragraphs"]):
        print(f"--- Para {p_idx+1}: {para}")
