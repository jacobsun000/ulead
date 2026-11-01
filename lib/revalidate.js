import { revalidatePath } from "next/cache";

// Public-facing paths that should be revalidated whenever admin content changes.
const PUBLIC_PATHS = [
  "/",
  "/en",
  "/university",
  "/zh",
  "/zh/university",
  "/zh/highschool",
  "/zh/summer-school/university",
  "/zh/summer-school/highschool",
  "/zh/lead-program/university",
  "/zh/news",
  "/en/highschool",
  "/en/university",
  "/en/about-us",
  "/en/lead-program",
  "/en/schools",
  "/zh/lead-program/highschool",
];

export function revalidatePublicPages() {
  PUBLIC_PATHS.forEach((path) => revalidatePath(path));
}

export { PUBLIC_PATHS };
