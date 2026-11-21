# We Are Amdavadi website

Plain HTML, CSS and JavaScript. No Node, no npm, no build step, no database. Free on Cloudflare Pages.

## Already configured
- WhatsApp: +91 8140354824 (`https://wa.me/918140354824`). Email: hiteshrathodseo@gmail.com.
- The floating WhatsApp button, hero buttons, footer and contact page use these details.
- On the contact page, "Send via WhatsApp" and "Send via email" open a pre-filled message in the visitor's own app. Nothing is sent until the visitor sends it. The form never pretends to submit to a server.
- Change details later in `assets/main.js` (top line `CONFIG`). The visible contact text and links are in the HTML pages, so search for the old value in GitHub and edit them too.

## Optional: real online form
Sign up for a free form service (for example Formspree), create a form, and copy its URL. Paste it as `formEndpoint:"https://..."` in `assets/main.js`. A "Send enquiry" button then appears. If the service needs another domain, add it to `connect-src` in `_headers` (https: is already allowed). Never put secret keys in this project; form URLs are public by design.

## Upload to GitHub (browser)
1. Unzip the download.
2. At github.com click **New repository**, name it `weareamdavadi`, click **Create repository**.
3. Click **uploading an existing file**, drag in everything from INSIDE the unzipped folder (not the folder itself), then **Commit changes**. (GitHub Desktop also works.)

## Deploy on Cloudflare Pages
1. Cloudflare dashboard > **Workers & Pages** > **Create** > **Pages** > **Connect to Git** and pick the repository.
2. Framework preset: **None**. Build command: leave **empty**. Build output directory: **/** (or leave empty).
3. **Save and Deploy**. You get a free `.pages.dev` address.

## Connect weareamdavadi.in
Pages project > **Custom domains** > **Set up a custom domain** > enter `weareamdavadi.in` and follow the prompts. If the domain's DNS is not on Cloudflare yet, Cloudflare will guide you to add it or to set the needed DNS record. Repeat for `www.weareamdavadi.in` if you want it, and set it to redirect to the main domain. HTTPS is automatic. Clean URLs work because each page is a folder with an `index.html`.

## Update website text
In GitHub open the page's folder, open `index.html`, click the pencil icon, edit the words between the tags, and **Commit changes**. Cloudflare republishes in about a minute. Keep every page title and meta description unique, and keep one H1 per page.

## Add a blog post
1. Create `blog/your-post-name/index.html`. Copy `about/index.html` as a starting point and change the title, description, canonical URL, H1 and text.
2. Open `blog/index.html`, find `<!-- BLOG CARDS GO HERE -->` and paste:
```
<article class="card"><h3><a href="/blog/your-post-name/">Post title</a></h3><p>Published 1 January 2027</p><p>One-sentence excerpt.</p><a href="/blog/your-post-name/">Read article</a></article>
```
3. Delete the "Our first articles are being prepared" box in `blog/index.html` once you have posts.
4. Add `<url><loc>https://weareamdavadi.in/blog/your-post-name/</loc></url>` to `sitemap.xml`. Only add real, published posts.
Images: put files in `assets/`, use `.webp` or compressed `.jpg`, and always add `alt`, `width` and `height`.
(Avoid inline `style="..."` attributes: the security headers block them. Add CSS classes in `assets/style.css` instead.)

## Still to do manually
1. Have a lawyer review the Privacy Policy and Terms. I did not add a registered address, company registration or legal status, and I did not claim legal compliance. Please confirm the "Last updated" date (21 November 2026), and decide whether to add a governing-law clause.
2. Confirm you are happy to show the WhatsApp number and email publicly.
3. Add the site to Google Search Console and submit `https://weareamdavadi.in/sitemap.xml`. Create or verify your Google Business Profile.
4. Optional: set up the form endpoint above.
5. Test in a real browser on your phone after deployment.
