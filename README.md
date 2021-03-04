# Headline-ificator

A journalist friend uses a combination of rhyming words and common phrases as an inspiration source when writing headlines, however, they do this by using a handful of different websites.

Let's do something about that...


## Data sources

Of the three datasources I looked at, I wound up using two:

- [Datamuse](https://api.datamuse.com): A great source for word associations
- [The free dictionary](https://idioms.thefreedictionary.com): A collection of common phrases

(The other if you want to check it out is [Stands4.com](https://www.stands4.com) which has a large selection of different APIs for word asscociation)

While Datamuse has a REST API, the Free Dictionary didn't; in order to use this a combination of a scraper to get the page content and (as the page structure was consistent) a set of string queries to isoloate the content I required.

While, for the sake of this POC challenge this will suffice, a better API or a cleaner solution to extracting this information is something to come back to in the future.


## Approach

- Get a search term
- Use the searched word to get a list of rhyming words and related phrases
- Listen for click events on the rhyming words and swap those into the phrases.



## Bonus round

While experimenting with the APIs I went down a rabbit hole of word association; this can be seen on the `/associations` page.

It takes the searched word(s) and uses them to find a list of related words including  rhyme, synonyms, antonyms, found before/after, and many others.

The additioanl 'chaining' of related words takes this a step further for example, adjectives for ocean but only when related to the topic of temperature. The [Datamuse api docs](https://www.datamuse.com/api/) has more information on what is available.

Ultimately this was not as useful to the initial direction so this remain unfinished for now


### Built with...

This project is built with Next.js and on the the start template from [Learn Next.js](https://nextjs.org/learn).

