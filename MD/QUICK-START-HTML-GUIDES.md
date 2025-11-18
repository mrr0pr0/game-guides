🚀 Quick Start: Adding HTML-Formatted Guides
Your guides now support rich HTML formatting! Here's how to get started in 3 easy steps.

Step 1: Go to Supabase
Open your Supabase dashboard
Click Table Editor in the sidebar
Select the app_d563a3af02_guides table
Step 2: Add or Edit a Guide
Click on any guide's content field (or create a new guide) and paste HTML like this:

Example 1: Simple Colored Box
<h2>Getting Started</h2>
<p>Welcome to this comprehensive guide!</p>
<div class="info-box">
  <div class="info-box-title">📖 Important</div>
  <p>Make sure to check out our other guides for more tips!</p>
</div>

Example 2: Colored List (Like Your Image!)
<h3>Spell Types by Color</h3>
<ul class="color-list">
  <li><span class="color-badge color-yellow">Control</span> Yellow spells</li>
  <li><span class="color-badge color-purple">Force</span> Purple spells</li>
  <li><span class="color-badge color-red">Damage</span> Red spells</li>
  <li><span class="color-badge color-blue">Utility</span> Blue spells</li>
</ul>

Example 3: Spoiler Section (Collapsible)
<spoiler title="SHOW SPOILERS">
  <h3>Major Plot Twist</h3>
  <p>This content is hidden until the user clicks to reveal it!</p>
</spoiler>

Step 3: Save and View
Save your changes in Supabase
Refresh your website
Your beautifully formatted guide appears instantly!
📦 Available Box Types
Info Box (Orange/Amber)
<div class="info-box">
  <div class="info-box-title">Title Here</div>
  <p>Your content here</p>
</div>

Tip Box (Blue)
<div class="tip-box">
  <div class="tip-box-title">💡 Pro Tip</div>
  <p>Your tip here</p>
</div>

Warning Box (Red)
<div class="warning-box">
  <div class="warning-box-title">⚠️ Warning</div>
  <p>Your warning here</p>
</div>

Success Box (Green)
<div class="success-box">
  <div class="success-box-title">✓ Success</div>
  <p>Your success message here</p>
</div>

🎨 Color Badges
Available colors: color-yellow, color-purple, color-red, color-blue, color-green, color-orange

<span class="color-badge color-purple">Purple Badge</span>

🔗 Other Features
Links: <a href="/path">Link text</a>
Bold: <strong>bold text</strong>
Italic: <em>italic text</em>
Images: <img src="url" alt="description">
YouTube: <iframe src="https://www.youtube.com/embed/VIDEO_ID"...></iframe>
Tables: Standard HTML <table> tags
Code: <code>keyboard shortcut</code>
📄 Complete Example
See example-html-formatted-guide.sql for a full working example you can copy and paste into Supabase!

📖 Full Documentation
For complete documentation with all features and examples, see HTML-GUIDE-FORMATTING.md

That's it! You can now create beautiful, rich game guides with colors, boxes, spoilers, and more! 🎮✨