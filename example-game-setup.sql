-- =====================================================
-- COMPLETE GAME GUIDE SETUP EXAMPLE
-- This creates a game similar to IGN's AC Odyssey wiki
-- =====================================================

-- 1. INSERT THE GAME
-- Copy this and modify with your game's details
INSERT INTO games (
  title, 
  slug, 
  description, 
  cover_image, 
  release_date,
  developer,
  publisher,
  platforms
) VALUES (
  'Assassins Creed Odyssey',
  'assassins-creed-odyssey',
  'The Assassin''s Creed Odyssey Wiki Guide contains a full Walkthrough with boss tips, choice consequences, a guide to the best Armor, collectibles like Ainigmata Ostraka Locations, a guide to recommended Abilities and more.',
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
  '2018-10-05',
  'Ubisoft Quebec',
  'Ubisoft',
  ARRAY['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Stadia']
);

-- 2. INSERT ALL THE GUIDES
-- Get the game_id first (you'll need to replace this with the actual ID from step 1)
-- Or use the subquery as shown below

-- WALKTHROUGH GUIDES
INSERT INTO guides (game_id, title, slug, content, guide_type, author) VALUES
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Complete Walkthrough - Main Story',
  'complete-walkthrough',
  'Welcome to the Assassin''s Creed Odyssey Walkthrough! This guide will take you through the entire main story.

Chapter 1: So It Begins
Your journey starts in Kephallonia. Here''s what you need to know:
1. Meet Markos and accept your first quest
2. Complete the tutorial combat section
3. Learn the basic stealth mechanics
4. Acquire your first weapon and armor

Chapter 2: The Wolf of Sparta
This chapter introduces you to the main conflict:
1. Travel to Megaris
2. Meet the mysterious stranger
3. Make your first major story choice
4. Complete the assassination mission

Tips for Main Story:
- Take your time exploring between missions
- Complete side quests for better gear and XP
- Make choices carefully - they affect the ending
- Level up before tackling difficult story missions',
  'walkthrough',
  'GameGuide Team'
),

-- SIDE QUESTS
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'All Side Quests Guide',
  'all-side-quests',
  'This guide covers all side quests in Assassin''s Creed Odyssey organized by region.

Kephallonia Side Quests:
1. A Small Odyssey - Help a local merchant with deliveries
2. Debt Collector - Collect debts from various NPCs
3. The Blood Fever - Investigate a mysterious illness

Megaris Side Quests:
1. Brewing Love - Help a woman create a love potion
2. Age is Just a Number - Assist an elderly couple
3. Daughters of Artemis - Join the hunters'' group

Rewards:
- Unique armor sets
- Legendary weapons
- XP and Drachmae
- Engravings for gear customization',
  'walkthrough',
  'GameGuide Team'
),

-- COLLECTIBLES GUIDES
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Ainigmata Ostraka Locations - All Riddle Solutions',
  'ainigmata-ostraka-locations',
  'Ainigmata Ostraka are ancient riddle tablets scattered throughout Greece. Solving them rewards you with engravings and legendary gear.

What are Ainigmata Ostraka?
These tablets contain riddles that point to specific locations. Once you solve the riddle and find the location, you''ll discover a hidden treasure.

Kephallonia Tablets:
1. Awaken the Myth - "Where Myths are Born"
   Location: Temple of Zeus, beneath the statue
   Reward: Legendary Engraving

2. Lore of the Sphinx - "Where Knowledge Sleeps"
   Location: Ancient Library ruins
   Reward: +5% Damage Engraving

Phokis Tablets:
1. Prophecy Foretold - "Where the Oracle Speaks"
   Location: Delphi, Oracle''s chamber
   Reward: Assassin Damage +10%

Tips for Finding Tablets:
- Use Ikaros to scout locations
- Check caves and ruins thoroughly
- Tablets glow when nearby
- Some require specific story progress',
  'collectibles',
  'GameGuide Team'
),

(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Cult of Kosmos - All Cultist Locations',
  'cult-of-kosmos-locations',
  'The Cult of Kosmos has 44 members hidden throughout Greece. Eliminating them all is essential for upgrading your Spear of Leonidas.

How to Hunt Cultists:
1. Gather clues from missions and locations
2. Reveal their identity on the Cultist menu
3. Track them down using hints
4. Eliminate them for legendary gear

Eyes of Kosmos Branch:
1. The Master - Location: Revealed after eliminating all others
2. Elpenor - Location: Phokis Sanctuary
3. Sotera - Location: Megaris Camp

Gods of the Aegean Sea Branch:
1. The Hydra - Location: Naval battle in Messara
2. Melite - Location: Kos Island
3. The Octopus - Location: Messenia

Rewards Per Cultist:
- Legendary Armor Piece
- Legendary Weapon
- Spear Upgrade Fragment
- Achievement Progress',
  'collectibles',
  'GameGuide Team'
),

-- TIPS AND TRICKS
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  '50 Essential Tips and Tricks',
  'essential-tips-and-tricks',
  'Master Assassin''s Creed Odyssey with these essential tips for combat, exploration, and progression.

Combat Tips:
1. Parry at the last moment for critical damage
2. Use abilities to break enemy shields
3. Dodge attacks rather than blocking
4. Upgrade your gear regularly
5. Switch weapon types based on enemy armor

Exploration Tips:
1. Use Ikaros to mark enemies and loot
2. Synchronize viewpoints to reveal map
3. Fast travel to any synchronized location
4. Dive underwater for hidden chests
5. Climb high peaks for legendary creatures

Leveling and Progression:
1. Complete bounties for quick XP
2. Focus on main story for level-appropriate content
3. Craft arrows regularly - you''ll need them
4. Dismantle unwanted gear for resources
5. Invest in ship upgrades early

Economy Tips:
1. Sell unneeded gear to blacksmiths
2. Complete contracts for steady income
3. Loot fallen enemies always
4. Trade with traveling merchants
5. Complete conquest battles for rewards',
  'tips',
  'GameGuide Team'
),

-- CHARACTER GUIDES
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Character Selection - Kassandra vs Alexios',
  'character-selection-guide',
  'Choosing between Kassandra and Alexios is your first major decision. Here''s everything you need to know.

Story Differences:
Both characters experience the exact same story. Your choice is purely cosmetic and based on personal preference.

Voice Acting:
- Kassandra: Performed by Melissanthi Mahut
- Alexios: Performed by Michael Antonakos

Gameplay Differences:
There are NO gameplay differences between the characters:
- Same abilities and skill trees
- Same equipment options
- Same romance options
- Same combat moves

Recommendation:
Choose based on which character you prefer visually or whose voice acting you enjoy more. Both are equally viable for the entire game.

Note: Once selected, you cannot change characters without starting a new game.',
  'tips',
  'GameGuide Team'
),

(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Best Abilities and Skill Tree Guide',
  'abilities-skill-tree-guide',
  'Master the three skill trees in AC Odyssey: Hunter, Warrior, and Assassin.

Hunter Abilities (Ranged Combat):
1. Devastating Shot - High damage arrow attack (Priority: HIGH)
2. Multi-Shot - Hit multiple targets (Priority: MEDIUM)
3. Predator Shot - Control arrow mid-flight (Priority: HIGH)

Warrior Abilities (Melee Combat):
1. Shield Break - Break enemy defenses (Priority: HIGH)
2. Sparta Kick - Iconic 300-style kick (Priority: MEDIUM)
3. Ring of Chaos - AOE knockback (Priority: MEDIUM)

Assassin Abilities (Stealth):
1. Critical Assassination - Kill higher level enemies (Priority: HIGH)
2. Shadow Assassin - Chain assassinations (Priority: HIGH)
3. Vanish - Escape combat instantly (Priority: MEDIUM)

Recommended Build - Early Game:
1. Critical Assassination (Level 2)
2. Shield Break (Level 3)
3. Devastating Shot (Level 4)
4. Second Wind (Level 5)

Recommended Build - Late Game:
Focus on one tree for specialization or create a hybrid build mixing all three.',
  'tips',
  'GameGuide Team'
),

-- ROMANCE AND RELATIONSHIPS
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Romance Options - All Relationships Guide',
  'romance-relationships-guide',
  'AC Odyssey features multiple romance options available to both Kassandra and Alexios.

How Romance Works:
1. Complete character-specific quests
2. Choose flirtatious dialogue options (marked with ♥)
3. Complete their storyline
4. Romance becomes available

Major Romance Options:
1. Alkibiades - Available: Early game, Quests: Multiple
2. Kyra - Available: Mykonos, Quests: Trouble in Paradise
3. Thaletas - Available: Mykonos, Quests: Conflict resolution
4. Auxesia - Available: Phokis, Quests: Side quest chain
5. Lykaon - Available: Phokis, Quests: Helping hand

Important Notes:
- You can romance multiple characters
- Romance choices don''t affect main story
- Some romances are one-time encounters
- Others develop into longer relationships
- No consequences for romancing everyone',
  'tips',
  'GameGuide Team'
),

-- CHOICES AND CONSEQUENCES
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Choices and Consequences - Ending Guide',
  'choices-consequences-guide',
  'Your choices throughout AC Odyssey affect the ending. Here are the major decision points.

WARNING: SPOILERS AHEAD

Family Reunion Choices:
These choices determine if you get the best ending with your family reunited.

1. Spare Nikolaos (The Wolf)
   - Recommendation: SPARE him for best ending
   - Consequence: He appears later in the story

2. Spare Stentor
   - Recommendation: SPARE him
   - Consequence: Can recruit him later

3. Convince Deimos in Dialogue
   - Recommendation: Choose peaceful options
   - Consequence: Affects final family outcome

Atlantis DLC Choices:
Major choices that affect the DLC ending:

1. Romance Consequences
   - Your partner may become infected
   - Choose carefully in final missions

2. Isu Knowledge
   - Decide fate of ancient technology
   - Affects future Assassin''s Creed timeline

Best Ending Requirements:
1. Spare Nikolaos
2. Don''t kill Stentor
3. Save Deimos
4. Complete family dinner quest',
  'walkthrough',
  'GameGuide Team'
),

-- EASTER EGGS
(
  (SELECT id FROM games WHERE slug = 'assassins-creed-odyssey'),
  'Easter Eggs and Secret References',
  'easter-eggs-references',
  'AC Odyssey is packed with references to movies, games, and pop culture.

Gaming References:
1. The Legend of Zelda
   - Location: Small island near Kephallonia
   - Reference: Sword in stone, Link''s outfit style
   - Reward: Legendary sword

2. 300 Movie Reference
   - Location: Thermopylae
   - Reference: Famous battle scene
   - Easter Egg: Kick enemies off cliffs

3. God of War
   - Location: Various Greek temples
   - Reference: Kratos mythology connections
   - Fun Fact: Both set in Greek mythology

Historical References:
1. Socrates Dialogue
   - Location: Athens Agora
   - Reference: Real philosophical questions
   - Fun Fact: Uses actual Socratic method

2. Olympic Games
   - Location: Olympia
   - Reference: Ancient Olympics
   - Activity: Compete in games

Pop Culture:
1. Wonder Woman
   - Location: Messara Arena
   - Reference: Female warrior aesthetic
   - Note: Similar time period inspiration',
  'collectibles',
  'GameGuide Team'
);

-- =====================================================
-- VERIFICATION QUERY
-- Run this to confirm your data was inserted correctly
-- =====================================================

-- Check the game was created
SELECT title, slug, developer, release_date, platforms 
FROM games 
WHERE slug = 'assassins-creed-odyssey';

-- Check all guides were created
SELECT g.title as game, guide.title as guide_title, guide.guide_type
FROM guides guide
JOIN games g ON g.id = guide.game_id
WHERE g.slug = 'assassins-creed-odyssey'
ORDER BY guide.guide_type, guide.title;

-- Count guides by category
SELECT g.title as game, guide.guide_type, COUNT(*) as guide_count
FROM guides guide
JOIN games g ON g.id = guide.game_id
WHERE g.slug = 'assassins-creed-odyssey'
GROUP BY g.title, guide.guide_type
ORDER BY guide_count DESC;
