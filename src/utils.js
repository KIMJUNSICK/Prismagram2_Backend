import { adjetives, nouns } from "./words";

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjetives.length);
  return `${adjetives[randomNumber]} ${nouns[randomNumber]}`;
};
