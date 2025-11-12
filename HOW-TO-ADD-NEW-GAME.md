# 🎮 How to Add a New Game Like AC Odyssey to Your Site

This guide shows you exactly what to add in Supabase to create a comprehensive game guide like IGN's Assassin's Creed Odyssey wiki.

## 📊 Required Database Fields

### Games Table (already exists)
- ✅ `title` - Game name
- ✅ `slug` - URL-friendly name (e.g., "assassins-creed-odyssey")
- ✅ `description` - Game overview
- ✅ `cover_image` - Banner/cover image URL
- ✅ `release_date` - Launch date
- ✅ `developer` - Studio name
- ✅ `publisher` - Publishing company
- ✅ `platforms` - Array of platforms

### Guides Table (already exists)
- ✅ `game_id` - Links to the game
- ✅ `title` - Guide title
- ✅ `slug` - URL-friendly guide name
- ✅ `content` - Guide text content
- ✅ `guide_type` - Category (walkthrough, collectibles, tips)
- ✅ `author` - Writer name

## 🚀 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query

### Step 2: Add the Game
Copy this template and customize it:

```sql
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
  'Your Game Title',                    -- Change this
  'your-game-slug',                     -- Change this (lowercase, hyphens)
  'Your game description here...',      -- Change this
  'https://image-url.com/cover.jpg',    -- Change this
  '2024-01-15',                        -- Change this (YYYY-MM-DD)
  'Developer Studio',                   -- Change this
  'Publisher Name',                     -- Change this
  ARRAY['PC', 'PlayStation 5', 'Xbox Series X']  -- Change platforms
);
```

### Step 3: Add Multiple Guides

For a comprehensive game guide like AC Odyssey, you need **at least 8-10 guides** covering different categories:

#### Required Guide Categories:

1. **Walkthrough** (guide_type: 'walkthrough')
   - Main story walkthrough
   - Side quests guide
   - Choices and consequences

2. **Collectibles** (guide_type: 'collectibles')
   - All collectible locations
   - Hidden items
   - Easter eggs and secrets

3. **Tips** (guide_type: 'tips')
   - Essential tips and tricks
   - Character/class selection
   - Best abilities/skills
   - Romance options
   - How to level up fast

### Step 4: Use the Example File
I've created `example-game-setup.sql` with a complete AC Odyssey example including:
- ✅ 9 different guides
- ✅ All major categories
- ✅ Detailed content examples
- ✅ Verification queries

**To use it:**
1. Open `example-game-setup.sql`
2. Copy all the SQL code
3. Paste into Supabase SQL Editor
4. Click "Run" to insert all data
5. Your site will automatically show the new game!

## 🎨 How Data Maps to Your Site

### Home Page (`/`)
- Shows game `cover_image` in grid
- Displays game `title`
- Shows `platforms` below title

### Game Page (`/games/[slug]`)
- **Banner**: Uses `cover_image`
- **Title**: Shows `title` + "Guide"
- **Description**: Displays game `description`
- **Metadata Box**: Shows:
  - Release date from `release_date`
  - Platforms from `platforms` array
  - Developer from `developer`
  - Publisher from `publisher`
- **Sidebar**: Shows guide categories (unique `guide_type` values)
- **Guide Sections**: Groups guides by `guide_type`

### Guide Page (`/games/[slug]/guides/[guide-slug]`)
- **Sidebar**: Lists all guides for navigation
- **Title**: Shows guide `title`
- **Author**: Shows `author` name
- **Category Badge**: Shows `guide_type`
- **Date**: Shows `updated_at` or `created_at`
- **Content**: Displays formatted `content`

## 📝 Content Formatting Tips

Your `content` field supports:

### Headings
```
Section Title:
This creates a heading
```

### Numbered Lists
```
1. First item
2. Second item
3. Third item
```

### Paragraphs
Just use double line breaks between paragraphs.

### Example:
```
Introduction to Combat:
Master these essential combat techniques.

Basic Attacks:
1. Light attack for quick damage
2. Heavy attack for breaking guards
3. Dodge to avoid damage

Advanced Tips:
Combine light and heavy attacks for combos. Use dodge right before enemy attacks to trigger slow motion.
```

## ✅ Checklist for Complete Game Guide

Use this checklist to ensure you have all components:

### Game Data
- [ ] Title and slug
- [ ] Description (2-3 sentences)
- [ ] Cover image URL (use Unsplash or game official art)
- [ ] Release date
- [ ] Developer name
- [ ] Publisher name
- [ ] Platform list (at least 2-3)

### Guide Coverage (Aim for 8-12 guides)
- [ ] Main walkthrough guide
- [ ] Side quests guide
- [ ] Character/class selection guide
- [ ] Best abilities/skills guide
- [ ] Collectibles location guide
- [ ] Tips and tricks (50+ tips)
- [ ] Romance/relationships guide (if applicable)
- [ ] Choices and consequences guide
- [ ] Easter eggs and references
- [ ] Secrets and hidden content

### Guide Types Distribution
- [ ] At least 2-3 "walkthrough" guides
- [ ] At least 2-3 "collectibles" guides
- [ ] At least 3-4 "tips" guides

## 🔍 Verification

After adding your data, run these queries in Supabase to verify:

```sql
-- Check the game exists
SELECT * FROM games WHERE slug = 'your-game-slug';

-- Count guides by category
SELECT guide_type, COUNT(*) 
FROM guides 
WHERE game_id = (SELECT id FROM games WHERE slug = 'your-game-slug')
GROUP BY guide_type;

-- View all guide titles
SELECT title, guide_type 
FROM guides 
WHERE game_id = (SELECT id FROM games WHERE slug = 'your-game-slug')
ORDER BY guide_type, title;
```

## 🎯 Quick Start: Copy & Modify Template

The fastest way to add a new game:

1. **Copy** the entire `example-game-setup.sql` file content
2. **Find and Replace**:
   - Replace `assassins-creed-odyssey` with your game slug
   - Replace `Assassins Creed Odyssey` with your game title
   - Replace `Ubisoft Quebec` with your developer
3. **Modify** the guide content to match your game
4. **Run** in Supabase SQL Editor
5. **Visit** your site - the game appears instantly!

## 📸 Image Resources

For cover images, you can use:
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [Official game websites](https://www.ubisoft.com/) - Game promotional art
- Keep images around 1200x400px for best results

## 💡 Pro Tips

1. **Start Small**: Add the game + 3 basic guides first, then expand
2. **Copy Structure**: Use the AC Odyssey example as a template
3. **Consistent Slugs**: Always use lowercase with hyphens
4. **Rich Content**: Longer guides (300+ words) look more professional
5. **Category Balance**: Mix walkthrough, collectibles, and tips
6. **Update Dates**: Guides show "Updated [date]" automatically

## 🆘 Common Issues

**Q: Game doesn't appear on site?**
- Check the slug is correct (no spaces, all lowercase)
- Verify the INSERT ran successfully in Supabase
- Refresh your browser (Ctrl+F5)

**Q: Guides not showing?**
- Verify game_id matches the game
- Check guide slugs are unique per game
- Ensure guide_type is one of: walkthrough, collectibles, tips

**Q: Images not displaying?**
- Use direct image URLs (not page links)
- Ensure URLs start with https://
- Test the URL in a new browser tab

---

**Need help?** Check the `example-game-setup.sql` file for a complete working example!
