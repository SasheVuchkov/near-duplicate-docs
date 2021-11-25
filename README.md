# near-duplicate-docs

[![By](https://img.shields.io/badge/made%20by-SasheVuchkov-blue.svg?style=flat)](https://github.com/SasheVuchkov)
[![By](https://img.shields.io/github/v/release/SasheVuchkov/near-duplicate-docs?label=version&logo=github)](https://github.com/SasheVuchkov/near-duplicate-docs)

One simple library for finding duplicate text documents. It works for text pieces of any kind, but I'm creating it with HTML pages in mind.

The project started as part of the proprietary codebase of [BuhalBu's Kit](https://buhalbu.com) - a collection of free SEO tools that help you make your website more profitable by harnessing the power of many open-source and free APIs.

In implementing the functionality for finding near-identical pages in a set of crawled URLs, I decided it would be cool to extract this stuff in its own repository. Finding near-duplicate documents in a library/collection/database/file system applies to many more use cases than the original one of searching for duplicate webpage content. So I believe the project deserves its own development cycle.

I'm no expert (yet) on topics like Data Science and Natural Language Processing, so I used the methods and algorithms as described in the book [__Mining of Massive Datasets__](http://www.mmds.org/) by Jure Leskovec, Anand Rajaraman, and Jeff Ullman.

Given the excellent stuff I learned and implemented, I believe the library will be suitable for processing collections of up to a million documents (on an end-user laptop). It can handle even more docs (in a reasonable time) if some parallelism and cloud computing is involved.

__That is just a hypothesis at the moment because the library is under development.__
