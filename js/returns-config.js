/*
 * THE BLURGBLOG — Returns (comments) settings
 * =============================================================
 *
 * WHERE COMMENTS ARE STORED
 * -------------------------
 * "local"    — Preview mode. Comments are saved in each visitor's own browser,
 *              so only they can see what they posted. Good for testing.
 *
 * "supabase" — Shared mode. Everyone sees everyone's comments.
 *              Supabase has a free tier. To set it up:
 *
 *   1. Make a free project at https://supabase.com
 *   2. In the project, open "SQL Editor", paste this and press Run:
 *
 *        create table public.returns (
 *          id         bigint generated always as identity primary key,
 *          created_at timestamptz not null default now(),
 *          name       text check (char_length(name) <= 40),
 *          movie      text check (char_length(movie) <= 80),
 *          comment    text not null check (char_length(comment) between 2 and 600)
 *        );
 *        alter table public.returns enable row level security;
 *        create policy "anyone can read returns"  on public.returns for select using (true);
 *        create policy "anyone can drop a return" on public.returns for insert with check (true);
 *
 *      (Nobody can edit or delete through the website. You can delete
 *       comments yourself in Supabase under "Table Editor" → returns.)
 *
 *   3. Open "Project Settings" → "API" and copy the Project URL and the
 *      "anon public" key into the settings below, then change type to "supabase".
 *      The anon key is meant to be public — it only allows what the policies above allow.
 */
window.RETURNS_BACKEND = {
  type: "local",          // "local" or "supabase"
  url: "",                // e.g. "https://abcdefgh.supabase.co"
  anonKey: ""             // the long "anon public" key
};

/*
 * A pinned note from the staff, always shown first in the bin.
 * Set to null to remove it.
 */
window.RETURNS_PINNED = {
  name: "Blurg (staff)",
  movie: "General chatter",
  comment: "The drop box is open! Tell us which tape we rated too high, which one we got wrong, or which terrible masterpiece we need to review next. Be kind — please rewind.",
  created_at: "2026-11-12T12:00:00Z"
};
