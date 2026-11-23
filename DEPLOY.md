# Publish the portfolio

From the repository root, run `npm ci` and `npm run build`. The static site is in `dist/`.

1. In GitHub Settings → Pages, select **GitHub Actions**.
2. To enable Gemini, sign in to Cloudflare with Wrangler, open the `worker` directory, and run `npx wrangler deploy`. Run `npx wrangler secret put GEMINI_API_KEY` there and paste the key at its prompt. Set `PORTFOLIO_ORIGIN` in wrangler.toml if the Pages origin changes.
3. The Pages workflow uses the deployed portfolio Worker by default. To change its URL, set the repository variable `VITE_CHAT_ENDPOINT` under **Settings → Secrets and variables → Actions → Variables**.
4. Push the site and workflow to main or run **Deploy portfolio to GitHub Pages**. Rebuild after changing the endpoint.

Built-in answers work independently of the Worker. Only the current unmatched question goes to Gemini. Chat messages live in page memory and clear on refresh or New chat. The Worker has no conversation store or application logs. Google processes questions under the Gemini API terms for the account.
