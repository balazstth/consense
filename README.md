ConSense
===

**2018-09-22: ConSense is being revived. That means linting and sorting out obvious problems. Using what still can be used. Having a look at what is still working ten years after! I was a very young man when I started working on ConSense - a brat, - let's see how it fares today. A fun project.**

**Have a look at the site for more info and to see where we are going. This software has a good amount of features and a good amount TODO. While maintaining to be lean and simple. The Changelog is also an interesting place to check.**

**[Site index](https://cdn.rawgit.com/balazstth/consense/master/index.html)** (Might not be fully up to date due to caching in RawGit hosting.)

**Back from 2011:**

Disclaimer and a little bit of history:

This is rather a salvage operation than a true archive of my earlier ConSense project. ConSense and its accompanying frameworks were actively developed in 2005 and 2006 (right when ajax was born) and maintained in 2007 and 2008. In those years some assignments of mine were implemented using this tool and all my customers said that my web apps (a wholesale shop for instance) were the fastest ones they have ever used. The goal of the project was twofold:

- To create a really able debug environment both for FF and IE. (Remember, there existed no such thing as FireBug at that time, and - naturally - the already existing Firefox development tools were only available to Firefox.) So I created ConSense, and you could do (and can still do) wonders with it: dig in and parse through the internal workings of mainstream browsers, find the incompatibilities and act accordingly. And all that in mere minutes, without any exaggeration. In this part of the project high speeds were no goal, only maximal usability.
- The other fundamental part of the project is an accompanying framework with an ajax-like (IFrame-based) implementation and various other tools. My load mechanism simply did not need any server-side support. It could work with any server backend, but did not rely on it at all. All in all it was a client-heavy application, which was a novum at that time, and was lightning fast.

Then why did the project stop? Because on one hand it became more and more time consuming to maintain and I had a day job to do. On the other hand several professional solutions arose, and despite my emotions towards my work it was not logical to continue working on it. Now I enjoy more of the work of others and still find my places of contribution in the new landscape of compact application design (not only web app design any more - fortunately those borders do not exist any more). Lots of lessons learned, and lots - oh lots - of fun facts experienced about the inner workings of browsers. (The nightmares still come sometimes...)

So here it is in a salvaged form, deprecated parts yanked from it, only the essence remained, the debug console, some utility functions and the most basic load mechanism itself. Enjoy!
