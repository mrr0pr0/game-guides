-- Insert sample games
INSERT INTO games (title, slug, description, cover_image, platforms) VALUES
('The Legend of Zelda: Breath of the Wild', 'zelda-breath-of-the-wild', 'An open-world action-adventure game set in the kingdom of Hyrule.', 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400', ARRAY['Nintendo Switch', 'Wii U']),
('Elden Ring', 'elden-ring', 'A fantasy action RPG developed by FromSoftware.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', ARRAY['PC', 'PlayStation', 'Xbox']),
('God of War', 'god-of-war', 'Follow Kratos and Atreus on their journey through Norse mythology.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', ARRAY['PlayStation', 'PC']);

-- Insert sample guides (for Zelda)
INSERT INTO guides (game_id, title, slug, content, guide_type, author) VALUES
(
  (SELECT id FROM games WHERE slug = 'zelda-breath-of-the-wild'),
  'Beginner''s Guide - Getting Started',
  'beginners-guide',
  'Welcome to Hyrule! This guide will help you get started in The Legend of Zelda: Breath of the Wild.

First Steps:
After waking up in the Shrine of Resurrection, you''ll need to find clothes and weapons. Look around the shrine for a chest containing the Old Shirt and Well-Worn Trousers.

Essential Tips:
1. Collect everything you see - materials are crucial for cooking and crafting
2. Talk to NPCs to unlock quests and learn about the world
3. Activate towers to reveal the map
4. Don''t be afraid to run from tough enemies early on

Cooking Basics:
Hold up to 5 ingredients and cook them at any pot. Combining different ingredients creates meals with various effects. Try combining Hearty ingredients for extra hearts!',
  'walkthrough',
  'GameGuide Team'
),
(
  (SELECT id FROM games WHERE slug = 'zelda-breath-of-the-wild'),
  'All Shrine Locations',
  'all-shrines',
  'There are 120 Shrines scattered across Hyrule. Completing them gives you Spirit Orbs which can be exchanged for hearts or stamina.

Great Plateau Shrines (Tutorial Area):
1. Oman Au Shrine - Magnesis Trial
2. Ja Baij Shrine - Bomb Trial  
3. Keh Namut Shrine - Cryonis Trial
4. Owa Daim Shrine - Stasis Trial

Tips for Finding Shrines:
- Activate Sheikah Towers to reveal shrine locations on your map
- Talk to NPCs who often give hints about nearby shrines
- Use the Sheikah Sensor+ to detect shrines when nearby
- Look for orange glowing pedestals on high ground',
  'collectibles',
  'GameGuide Team'
);

-- Insert guide for Elden Ring
INSERT INTO guides (game_id, title, slug, content, guide_type, author) VALUES
(
  (SELECT id FROM games WHERE slug = 'elden-ring'),
  'Class Selection Guide',
  'class-selection',
  'Choosing your starting class is an important decision in Elden Ring. Here''s a breakdown of each class:

Vagabond (Knight):
Best for beginners. High vigor and strength, starts with solid armor and shield. Great for melee-focused builds.

Warrior:
Dual-wielding specialist. Starts with two scimitars and high dexterity. Good for aggressive playstyles.

Astrologer (Mage):
Starts with powerful sorceries. High intelligence and mind. Best for ranged magic builds.

Samurai:
Balanced dexterity build with katana and bow. Good starting equipment and stats.

Recommendation for Beginners:
Start with Vagabond for the easiest experience, or Samurai for a balanced approach with ranged options.',
  'tips',
  'GameGuide Team'
);