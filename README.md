
# Description

This extension increases the difficulty of the popular language learning app Duolingo (https://www.duolingo.com/learn). In Duolingo users perform various exercises to learn a new language. One of those exercises asks users to translate a sentence from the target language to their own language. It gives the users an audio prompt and a written prompt. This extension removes the written prompt, which forces users to develop their listening comprehension.

I wrote this extension because this is a feature that helped me learn languages faster. I believe that other Duo users will also find this extension useful.

Technically speaking, the extension itself is pretty simple. It only runs when the user is on the /skill route and it looks for DOM changes that would indicate that a new exercise has loaded and, if that exercise provides a hint sentence, hides the hint.
