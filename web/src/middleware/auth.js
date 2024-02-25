import { getSession } from "../services/services/user.service";

export default async function auth({ next }) {
  console.log("SESSION  ");
  const auth = await getSession();

  if (!auth.response.data.status) {
    console.log("SESSION  ");
    return next({
      name: "Signin",
    });
  }
  return next();
}
