-- Example: Add a beautifully formatted guide with HTML to your Supabase database
-- This demonstrates all the rich formatting features available

-- First, make sure you have a game to attach this guide to
-- If you already have a game, skip this step and use its ID below

-- Step 1: Insert or use an existing game (example with Hogwarts Legacy)
INSERT INTO app_d563a3af02_games (title, slug, description, cover_image, release_date, developer, publisher, platforms)
VALUES (
  'Hogwarts Legacy',
  'hogwarts-legacy',
  'Experience life as a student at Hogwarts School of Witchcraft and Wizardry in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart.',
  'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=1200&h=400&fit=crop',
  '2023-02-10',
  'Avalanche Software',
  'Warner Bros. Games',
  ARRAY['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch']
) ON CONFLICT (slug) DO NOTHING;

-- Step 2: Insert a guide with rich HTML formatting
INSERT INTO app_d563a3af02_guides (
  game_id,
  title,
  slug,
  content,
  guide_type,
  author
) VALUES (
  (SELECT id FROM app_d563a3af02_games WHERE slug = 'hogwarts-legacy'),
  'Spells and Combat Guide - Complete Beginner Tips',
  'spells-combat-guide',
  '<h2>Spells and Gear Explained</h2>

<p>If there is one thing that has likely drawn you to Hogwarts Legacy, it is spellcasting, and rightfully so, as there are over 29 unique spells and charms that you can unlock and cast to your heart''s desire. These spells range from fan-favorites like Avada Kedavra, Levioso, Incendio, and much more.</p>

<div class="info-box">
  <div class="info-box-title">📖 See More</div>
  <p>See our <a href="/games/hogwarts-legacy/guides/all-spells">Spells and Charms List</a> to learn more about unlocking every spell the game has to offer.</p>
</div>

<h2>Understanding Spell Types</h2>

<p>As you unlock more spells through the main storyline and side quests, you''ll notice that each spell is color-coded to a particular type:</p>

<ul class="color-list">
  <li><span class="color-badge color-yellow">Control</span> Yellow - Levitation and movement spells</li>
  <li><span class="color-badge color-purple">Force</span> Purple - Powerful offensive magic</li>
  <li><span class="color-badge color-red">Damage</span> Red - Direct damage spells</li>
  <li><span class="color-badge color-blue">Utility</span> Light Blue - Support and utility magic</li>
  <li><span class="color-badge color-green">Transfiguration</span> Light Green - Shape-changing spells</li>
</ul>

<div class="tip-box">
  <div class="tip-box-title">💡 Combat Strategy</div>
  <p>It is recommended that you assign at least one Force, one Control, and one Damage spell to your Spell Set to ensure you are prepared for most combat situations.</p>
</div>

<h2>Combat Tips and Tricks</h2>

<p>While there are six different types of spells, it is recommended that you assign at least one Force, one Control, and one Damage spell to your Spell Set to ensure you are prepared for most combat situations.</p>

<h3>Essential Combat Techniques</h3>

<ol>
  <li><strong>Light Attack</strong> - Quick damage with normal spell shots</li>
  <li><strong>Heavy Attack</strong> - Break through enemy guards and shields</li>
  <li><strong>Dodge Timing</strong> - Dodge right before enemy attacks to trigger slow motion</li>
  <li><strong>Combo Attacks</strong> - Chain different spell types for maximum effect</li>
</ol>

<spoiler title="SHOW ADVANCED COMBO STRATEGIES">
  <h3>Advanced Combat Combos</h3>
  
  <p>Furthermore, rather than firing off spells individually, focus on combos. For example, Incendio can only be done at close range, so you can use Levioso to start a juggle with normal spell shots, then use Accio to yank an enemy towards you, and then use Incendio to set them alight.</p>
  
  <div class="warning-box">
    <div class="warning-box-title">⚠️ Unforgivable Curses Spoiler</div>
    <p>The three Unforgivable Curses (Avada Kedavra, Crucio, and Imperio) are extremely powerful but come with story consequences. Choose wisely!</p>
  </div>
</spoiler>

<h2>Best Spells for Each Situation</h2>

<table>
  <thead>
    <tr>
      <th>Situation</th>
      <th>Recommended Spell</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Large Groups</td>
      <td>Incendio</td>
      <td>Damage (AoE)</td>
    </tr>
    <tr>
      <td>Shielded Enemies</td>
      <td>Bombarda</td>
      <td>Force</td>
    </tr>
    <tr>
      <td>Single Target</td>
      <td>Crucio</td>
      <td>Damage (High)</td>
    </tr>
    <tr>
      <td>Crowd Control</td>
      <td>Levioso</td>
      <td>Control</td>
    </tr>
  </tbody>
</table>

<h2>Spell Upgrades and Talents</h2>

<p>As you progress through the game, you can upgrade your spells using the Talent system. Here are the most important upgrades:</p>

<div class="success-box">
  <div class="success-box-title">✨ Top Priority Talents</div>
  <ul>
    <li><strong>Stupefy Expertise</strong> - Increases stun duration</li>
    <li><strong>Incendio Mastery</strong> - Larger area of effect</li>
    <li><strong>Levioso Duration</strong> - Keep enemies suspended longer</li>
  </ul>
</div>

<h2>Gear and Equipment Tips</h2>

<p>Your gear plays a crucial role in combat effectiveness. Here''s what you need to know:</p>

<blockquote>
"The wand chooses the wizard, but the wizard chooses their gear wisely."
</blockquote>

<h3>Gear Priorities</h3>

<ol>
  <li>Focus on gear with <strong>offensive stats</strong> early game</li>
  <li>Upgrade your <strong>wand handle</strong> for spell damage</li>
  <li>Collect gear sets for <strong>bonus effects</strong></li>
  <li>Don''t forget <strong>defensive gear</strong> for harder battles</li>
</ol>

<hr>

<h2>Quick Reference: Keyboard Controls</h2>

<p>Master these controls for fluid combat:</p>

<ul>
  <li>Left Click - <code>Basic Attack</code></li>
  <li>Right Click - <code>Block/Protego</code></li>
  <li>Q, E, R, F - <code>Spell Slots 1-4</code></li>
  <li>Space - <code>Dodge Roll</code></li>
  <li>Tab - <code>Switch Spell Set</code></li>
</ul>

<div class="tip-box">
  <div class="tip-box-title">🎮 Practice Makes Perfect</div>
  <p>Visit the Room of Requirement to practice spell combinations without risk. The training dummies there are perfect for mastering your combos!</p>
</div>',
  'tips',
  'Gaming Expert'
);

-- Verification: Check if the guide was added successfully
SELECT 
  g.title as game_title,
  gd.title as guide_title,
  gd.guide_type,
  gd.author
FROM app_d563a3af02_guides gd
JOIN app_d563a3af02_games g ON g.id = gd.game_id
WHERE gd.slug = 'spells-combat-guide';
