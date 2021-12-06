# near-duplicate-docs

[![By](https://img.shields.io/badge/made%20by-SasheVuchkov-blue.svg?style=flat)](https://github.com/SasheVuchkov)
[![Version](https://img.shields.io/github/v/release/SasheVuchkov/near-duplicate-docs?label=version&logo=github)](https://github.com/SasheVuchkov/near-duplicate-docs)
[![Coverage Status](https://coveralls.io/repos/github/SasheVuchkov/near-duplicate-docs/badge.svg?branch=main)](https://coveralls.io/github/SasheVuchkov/near-duplicate-docs?branch=main)
![Deploy](https://github.com/SasheVuchkov/near-duplicate-docs/actions/workflows/deploy.yml/badge.svg)

One simple library for finding near-duplicate and duplicate text documents. It works for text pieces of any kind, but I'm creating it with HTML pages in mind.

The project started as a part of the proprietary codebase of [BuhalBu's Kit](https://buhalbu.com) - a collection of free SEO tools that help you make your website more profitable by harnessing the power of many open-source and free APIs.

While implementing the functionality for finding near-identical pages in a set of crawled URLs, I decided it would be cool to extract this stuff in its own repository. Finding near-duplicate documents in a library/collection/database/file system applies to many more use cases than the original one of searching for duplicate webpage content. So I believe the project deserves its own development cycle.

I'm no expert (yet) on topics like Data Science and Natural Language Processing, so I used the methods and algorithms as described in the book [__Mining of Massive Datasets__](http://www.mmds.org/) by Jure Leskovec, Anand Rajaraman, and Jeff Ullman.

Given the excellent stuff I learned and implemented, I believe the library will be suitable for processing collections of up to a million documents (on an end-user laptop). It can handle even more docs (in a reasonable time) if some parallelism and cloud computing is involved.



### Install

#### npm

```js
npm install near-duplicate-docs --save
```

#### yarn

```js
yarn add near-duplicate-docs --save
```

### How To Use It

The easiest way to use the library is by requiring/importing the makeDuplicatesFinder factory callback and using it to create an instance of BaseNearDuplicatesFinder class.

```js
const {makeDuplicatesFinder} = require('near-duplicate-docs');

const finder = makeDuplicatesFinder({
  minSimilarity: 0.75,
  shinglesSize: 5,
  shinglesType: "word",
  signatureLength: 100,
  rowsPerBand: 5,
});

finder.add(document1.id, document1.text);
finder.add(document2.id, document2.text);
finder.add(document3.id, document3.text);
finder.add(documentN.id, documentN.text);

const duplicates = finder.search();

console.log(duplicates);

//Result

{
  document1: [[0.95, "document3"]], 
  documentN: [[0.76, "document2"], [0.80, "document3"]]
}
```

```js
const {makeAsyncDuplicatesFinder} = require('near-duplicate-docs');

const finder = makeAsyncDuplicatesFinder({
  minSimilarity: 0.75,
  shinglesSize: 5,
  shinglesType: "char",
  signatureLength: 100,
  rowsPerBand: 5,
});

const promises = [];
promises.push(finder.add(document1.id, document1.text));
promises.push(finder.add(document2.id, document2.text));
promises.push(finder.add(document3.id, document3.text));
promises.push(finder.add(documentN.id, documentN.text));

Promise.all(promises)
  .then(() => finder.search())
  .then(duplicates => console.log(duplicates))
  .catch(errors => console.log(errors));

//Result

{
  document1: [[0.95, "document3"]], 
  documentN: [[0.76, "document2"], [0.80, "document3"]]
}
```
### Factory Callback Config

To get a working instance of BaseNearDuplicatesFinder class, you need to pass a proper config object to its factory callback.

This config object must contain the following properties:

- `minSimilarity`: a value between 0 and 1 representing the minimal similarity between two documents to consider them near-duplicates or duplicates. The library can currently calculate only the Jaccard index of two similar documents, but there is room for more implementations in the future.
- `shinglesSize`: a number between 0 and Infinity. A "shingle" represents a small part of a text. It can be several words or a dozen of characters. When you pass a text for analysis, it's decomposed into shingles of the chosen size.
- `shinglesType`: word | char, you can use shingles that consists of words or character sequences. If you use chars, the finder may be more accurate but slower. If you choose words it may be faster but a little less accurate. The speed and the accuracy depend on many factors (the size and number of documents, the shingle size, the signature length, and the number of bands).
- `signatureLength`: a number between 0 and Infinity; If we compare every document to other documents, it will be awfully slow with large datasets. Instead of this, the finder "compresses" each document to a very small sequence of numbers. The `signatureLength` property defines how many numbers are to be used for a document signature. The greater the length, the more accurate (and slower) the finder will be...   
- `rowsPerBand`: some factor of `signatureLength`; To speed up the process of comparing documents, the finder doesn't compare their whole signatures, but different parts of them. If the number of rows per band is small, you can expect many "false positive" suggestions for detailed comparisons, which may slow the process. If you choose too big of a number, you can expect "false negatives," a.k.a. documents with a low similarity that are not detected. (You prefer "false positives" rather than "false negatives") 

Continue reading for more info on the meaning of these properties.

### Some Config Recommendations

The library allows you any configuration that suits your needs.  Also, you can compare anything between small pieces of text (titles, product descriptions) and big texts with thousands of words.

So there isn't a "perfect configuration." It just doesn't exist. 

The best way to find what works best for you is by experimenting, but bear in mind the following recommendations:

#### Tiny Text Pieces

It's a good idea to use char shingles with a length between 6 and 13 chars for tiny texts. Also, you can use smaller signatures with a length between 30 and 60 numbers.

If your set is not so big, there is some overhead. The library allows creating custom finder classes or functions that skip the "over-optimizations," but I will reserve this somewhat complex topic for a future blog post or documentation page.

I will share a link here, in this section, when it's ready.
#### Large Texts

You will experience the actual value of the library if you need to find similar documents in a huge collection with thousands, hundreds of thousands, or even millions of items. You can use either word or char shingles of length between 6 and 13, and the signature length could be between 100 and 200 or more numbers for better accuracy. 


#### How Many Rows per Band?

In the book, mentioned at the beginning, the authors recommend us to choose a `minSimilarity` and then arrange `signatureLength` and `rowsPerBand` around its value with the help of the following formula:

![Formula for approximating the rowsPerBand property](https://sashevuchkov.com/wp-content/uploads/2021/12/near-duplicate-text-formula.svg)

Suppose you need better accuracy, then you can choose the right side of the equation to be way smaller than the `minSimilarity` value. That way, the finder will produce more false-positive candidates for detailed comparison. 

Suppose you want better speed, then you can make the right side of the equation closer to the left side.

### Conclusion

near-duplicate-docs is a simple but powerful library for finding near-duplicate and duplicate documents in massive sets/libraries/databases. 

You can start using it by invoking a factory callback with proper configuration. Then you add the docs for comparison and execute a single method to obtain a list of similar documents and their Jaccard Similarity indexes.

Isn't that cool?

## Changelog
near-duplicates-docs follows semantic versioning. To see a changelog with all of its releases, check out the [Github releases page](https://github.com/SasheVuchkov/near-duplicate-docs/releases).

## Get in Touch
If you have any questions, please feel free to get in touch by sending emails to <sashe@buhalbu.com>, or you can tweet [@SasheVuchkov](https://twitter.com/SasheVuchkov).

Also, please don't hesitate to [file issues](https://github.com/SasheVuchkov/near-duplicate-docs/issues)...

*Copyright (c) Alexander Yuriev Vuchkov*
