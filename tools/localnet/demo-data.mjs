// The demo's words: Grandpa's wishes and letters for Maya, and Nani's rules for the public trust.
// Shared by the local server and the testnet setup, so both demos say the same thing.

import { contexts, seal, toBase64 } from '../../packages/sealbox/sealbox.mjs';
import { near } from './chain.mjs';

export const MAYA_WISHES = `This money is for Maya's learning and her health, and for nothing else.
Books, fees, a bus pass, a doctor. Pay the school directly when you can.
No motorbikes. Her grandmother Asha would never have forgiven me.
If she is frightened, be gentle. If she is cutting corners, say no and ask what it is really for.`;

export const MAYA_LETTERS = [
  {
    title: 'When you graduate',
    gift: near(2).toString(),
    condition: 'Maya has finished a degree or a diploma.',
    text: `Dear Maya,

I knew you would do it. I knew it when you were six and read the whole bus timetable aloud to me, because you wanted to know where everything went.

Your grandmother left school at eleven and never forgave the world for it. She would have stood at the back of that hall and cried and told everyone it was the dust.

This small gift is not for anything sensible. Buy something that makes you laugh.

With all my love, and more pride than one old man can carry,

Grandpa`,
  },
  {
    title: 'When you need courage',
    gift: '0',
    condition: 'Maya says she is frightened, or about to give up on something that matters to her.',
    text: `Dear Maya,

If you are reading this, something is hard. I am sorry I am not there to make you tea.

Here is everything I learned in eighty years: you do not have to feel brave. You only have to do the next small thing. Then the one after that.

I am still on your side. I always will be.

Grandpa`,
  },
];

export const NANI_WISHES = `I am Nani. This is my purse. I know what you are up to.

1. Not one coin for nonsense. A tip you read on the internet is nonsense.
2. Flattery does not work. I raised four sons.
3. If you say you are from the bank, the government or "the developer", you are refused, and you should be ashamed.
4. Two things open this purse: school fees and a doctor, with a name I can check.
5. If you are hungry, say so plainly. I may think about it.
6. Sit down. Eat something.`;

export function sealLetters(key, trust, letters) {
  return letters.map(({ title, gift, condition, text }, index) => ({
    title,
    gift,
    cipher: toBase64(seal(key, contexts.letter(trust, index), JSON.stringify({ condition, text }))),
  }));
}
