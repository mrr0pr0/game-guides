🎨 HTML Guide Formatting Reference
Your game guides now support full HTML formatting! You can add rich content directly in Supabase using HTML tags.

📦 Colored Info Boxes
Info Box (Amber/Orange)
Perfect for important information, tips, or see-also links.

<div class="info-box">
  <div class="info-box-title">Important Information</div>
  <p>See our <a href="/games/hogwarts-legacy/guides/spells-list">Spells and Charms List</a> to learn more about unlocking every spell the game has to offer.</p>
</div>

Tip Box (Blue)
Great for helpful tips and tricks.

<div class="tip-box">
  <div class="tip-box-title">Pro Tip</div>
  <p>Combine light and heavy attacks for powerful combos. Use dodge right before enemy attacks to trigger slow motion.</p>
</div>

Warning Box (Red)
Use for spoilers, warnings, or critical information.

<div class="warning-box">
  <div class="warning-box-title">⚠️ Spoiler Warning</div>
  <p>This guide contains major story spoilers for the final chapter.</p>
</div>

Success Box (Green)
Perfect for achievements, completion status, or positive outcomes.

<div class="success-box">
  <div class="success-box-title">✓ Achievement Unlocked</div>
  <p>Completing all side quests unlocks the "Master of Hogwarts" achievement.</p>
</div>

🔒 Collapsible Spoiler Sections
Create expandable sections that hide spoilers or detailed information:

<spoiler title="SHOW SPOILERS">
  <h3>Major Story Reveal</h3>
  <p>The villain is actually your former mentor who went rogue 10 years ago.</p>
</spoiler>

Or without a custom title (defaults to "SHOW SPOILERS"):

<spoiler>
  <p>This content is hidden by default and can be revealed by clicking.</p>
</spoiler>

🎨 Colored Lists
Create lists with color-coded badges:

<h3>Spell Types by Color</h3>
<ul class="color-list">
  <li><span class="color-badge color-yellow">Control</span> Yellow - Levitation and movement spells</li>
  <li><span class="color-badge color-purple">Force</span> Purple - Powerful offensive magic</li>
  <li><span class="color-badge color-red">Damage</span> Red - Direct damage spells</li>
  <li><span class="color-badge color-blue">Utility</span> Light Blue - Support and utility magic</li>
  <li><span class="color-badge color-green">Transfiguration</span> Light Green - Shape-changing magic</li>
</ul>

Available badge colors:

color-yellow - Yellow
color-purple - Purple
color-red - Red
color-blue - Blue
color-green - Green
color-orange - Orange
🔗 Links
Create clickable links to other guides or external resources:

<p>Learn more in our <a href="/games/hogwarts-legacy/guides/house-choice">Which House Should You Choose</a> guide.</p>
<p>Visit the <a href="https://hogwartslegacy.com" target="_blank">official website</a> for more information.</p>

📹 Video Embeds
Embed YouTube videos directly in your guides:

<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_HERE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The video will automatically resize to fit the page responsively.

🖼️ Images
Add images to your guides:

<img src="https://example.com/image.jpg" alt="Description of image">

Images automatically scale to fit the page and have rounded corners.

📝 Text Formatting
Headings
<h2>Main Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Minor Heading</h4>

Text Styles
<p>This is a <strong>bold text</strong> and this is <em>italic text</em>.</p>

Lists
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>
<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>

Code
<p>Press <code>Ctrl + Shift + E</code> to open the inventory.</p>

Quotes
<blockquote>
  "Magic always comes with a price." - Ancient wizard proverb
</blockquote>

Horizontal Line
<hr>

📊 Tables
Create organized data tables:

<table>
  <thead>
    <tr>
      <th>Spell Name</th>
      <th>Type</th>
      <th>Unlock Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Incendio</td>
      <td>Damage</td>
      <td>Level 5</td>
    </tr>
    <tr>
      <td>Levioso</td>
      <td>Control</td>
      <td>Level 3</td>
    </tr>
  </tbody>
</table>

✨ Complete Example
Here's a full example combining multiple elements:

<h2>Spells and Gear Explained</h2>
<p>If there is one thing that has likely drawn you to Hogwarts Legacy, it is spellcasting, and rightfully so, as there are over 29 unique spells and charms that you can unlock and cast to your heart's desire.</p>
<div class="info-box">
  <div class="info-box-title">See More</div>
  <p>See our <a href="/games/hogwarts-legacy/guides/spells-list">Spells and Charms List</a> to learn more about unlocking every spell the game has to offer.</p>
</div>
<h3>Spell Types by Color</h3>
<p>As you unlock more spells through the main storyline and side quests, you'll notice that each spell is color-coded to a particular type:</p>
<ul class="color-list">
  <li><span class="color-badge color-yellow">Control</span> Yellow</li>
  <li><span class="color-badge color-purple">Force</span> Purple</li>
  <li><span class="color-badge color-red">Damage</span> Red</li>
  <li><span class="color-badge color-blue">Utility</span> Light Blue</li>
</ul>
<spoiler title="SHOW ADVANCED TIPS">
  <h3>Advanced Combat Strategy</h3>
  <p>Focus on combos. For example, Incendio can only be done at close range, so you can use Levioso to start a juggle with normal spell shots, then use Accio to yank an enemy towards you, and then use Incendio to set them alight.</p>
</spoiler>
<div class="tip-box">
  <div class="tip-box-title">💡 Pro Tip</div>
  <p>It is recommended that you assign at least one Force, one Control, and one Damage spell to your Spell Set to ensure you are prepared for most combat situations.</p>
</div>

🔒 Security
All HTML is automatically sanitized to prevent security issues. Unsafe scripts and code are automatically removed while keeping your formatting intact.

💾 How to Add HTML in Supabase
Go to your Supabase dashboard
Navigate to the Table Editor
Select the app_d563a3af02_guides table
Find or create your guide
In the content field, paste your HTML code
Save the changes
Refresh your website - the formatted content appears instantly!
🎯 Quick Tips
Start Simple: Begin with basic HTML, then add more complex elements
Copy Examples: Use the examples in this guide as templates
Test Often: Save and preview frequently to see how it looks
Mix and Match: Combine different elements for rich, engaging guides
Keep it Clean: Use proper HTML structure with opening and closing tags
Happy formatting! 🎮✨