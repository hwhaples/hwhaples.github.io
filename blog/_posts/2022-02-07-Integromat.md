---
layout: post
title: Automating Delivery of RSS Feed with Integromat
truncated_preview: true
excerpt_separator: <!--more-->
---
As practicing scientists and engineers are keenly aware, keeping up with the ever-growing body of technical literature is fundamental to any research endeavor. Many tools exist to help organize and curate literature for consumption, including Twitter Bots, Google Scholar Alerts, and simple RSS feeds. While all of these can be great ways to be notified of any field's current state of the art, my company has (under)-utilized a Microsoft Teams channel aptly called “Industry News.” After seeing the channel go practically unused for six months, I decided to solve the problem with automation.

<!--more-->

When I began researching for this project, I discovered many researchers who have turned to Twitter as a preferred method of curating and disseminating industry news. I stumbled upon the physpaper project by Robert Lanfear on GitHub, which provided excellent documentation on creating a Twitter bot PubMed, arxiv, and just about any other service offering an RSS feed. However, I don’t tweet or use much of any social media – making the dlvrit.com solution that pyspaper suggested unviable.

That was when I discovered integromat.com, a low code automation website that could do (almost) exactly what I wanted. I originally wanted to post directly to Microsoft Teams, however opening the integration with integromat required administrator privileges that I did not have. To overcome this, I instead designed a flow to send me an email every Monday morning with the top five hits for Concentrated Solar Power in the Springer Journals. I easily can copy this email into Teams until administrator privileges can be figured out.

<a href="/image/integromat_1.png"><img src="/image/integromat_1.png" class="center" width='650px'></a>

## Step 1: Getting the Springer RSS Feed

To connect as RSS feed as the datasource I first dragged the RSS module Integromat’s list of connections: “Retrieve and RSS feed.” Springer offers a convenient RSS feed generator for any search topic: https://link.springer.com/search

<a href="/image/integromat_2.png"><img src="/image/integromat_2.png" class="center" width='650px'></a>

After making your query and selecting “newest first” to get the newest entries, click the RSS icon to get a custom feed link that can be copied into the URL field in Integromat’s RSS block. I filled out the rest of the RSS block to look at all articles from the moment and query to a week prior and limit the results to the most recent 5. These parameters can be adjusted however you see fit.

<a href="/image/integromat_3.png"><img src="/image/integromat_3.png" class="center" width='650px'></a>

## Step 2: Building the Pipeline to Convert Email to Text

One of the most difficult aspects of setting the pipeline up was figuring out what “tool” blocks I would need from the pipeline in order to transform the RSS feed into something readable for email. The simplest way I found was the use a string aggregator in order to produce an array of Titles and URLs from the RSS feed.

<a href="/image/integromat_4.png"><img src="/image/integromat_4.png" class="center" width='650px'></a>
<a href="/image/integromat_4_1.png"><img src="/image/integromat_4_1.png" class="center" width='650px'></a>

I then used an iterator block to iterate through every entry into the array, coupled with a Text Aggregator block to strip the Titles and URLs from the array into HTML formatting. Figuring out that the Text aggregator could accept HTML was the lightbulb for me to figure out how to get this pipeline to work.

<a href="/image/integromat_5.png"><img src="/image/integromat_5.png" class="center" width='650px'></a>

## Step 3: Connecting the Gmail API to Integromet

Unfortunately, Google’s API integrations make it rather difficult to connect integromet.com to a user account in order to send an email. Essentially, it is necessary to set up a custom OAuth Client. Luckily, integromat has [detailed instructions](https://www.integromat.com/en/help/connecting-integromat-to-google-services-using-a-custom-oauth-client) on how to do this. **As a note of precaution** be careful with the security of this account. I personally recommend setting up a separate dedicated Gmail account for this connection just in case.

After connecting the OAuth client, it was easy to take the text output in the process flow and send it straight to email.

<a href="/image/integromat_6.png"><img src="/image/integromat_6.png" class="center" width='650px'></a>

Finally, I ran a quick test to make sure the pipeline was functional and set an automated recurring activation once a week every Monday. Checked my email and got a nifty reading list! 

<a href="/image/integromat_7.png"><img src="/image/integromat_7.png" class="center" width='650px'></a>

So, what’s next? I’m leaving it as is for now, but I could easily see two great extensions:

1.	Accumulating more RSS feeds than just Springer to look through many different news and journal sources.
2.	Adjusting queries to be smarter than just picking the top 5 most recent entries.




In the context of COVID, I used my own home to install my work. Driven by how periodic, yet disrupting working from home has been, I selected a message that I thought would be widely reaching in general as well as within my own family.


<a href="https://drive.google.com/drive/folders/1JpDboZv8ro50OMgAN9OORKLnpEj3RKpy?usp=sharing">Click here for more pictures!</a>



<center><em>There's only one checkbox left on the to-do, I know that you'll pull through.</em></center>



<!--
<div class="message">
  Howdy! This is an example blog post that shows several types of HTML content supported in this theme.
</div>

## Inline HTML elements

HTML defines a long list of available inline tags, a complete list of which can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

- **To bold text**, use `<strong>`.
- *To italicize text*, use `<em>`.
- Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use `<abbr>`, with an optional `title` attribute for the full phrase.
- Citations, like <cite>&mdash; Mark otto</cite>, should use `<cite>`.
- <del>Deleted</del> text should use `<del>` and <ins>inserted</ins> text should use `<ins>`.
- Superscript <sup>text</sup> uses `<sup>` and subscript <sub>text</sub> uses `<sub>`.

Most of these elements are styled by browsers with few modifications on our part.

## Truncated Post Previews

Celeste also supports truncated post previews that are customizable on a per-post basis. This is a sample of how a truncated post looks like. Click on **Read more** to see the rest of the post!
-->
<!--more-->
<!--
More details on how to use truncated post previews are in the [v1.4.0 release notes](https://github.com/nicoelayda/celeste/releases/tag/v1.4.0).

-----

Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. *Aenean eu leo quam.* Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

> Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta **sem malesuada magna** mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.

## Footnotes

Footnotes are supported as part of the Markdown syntax. Here's one in action. Clicking this number[^fn-sample_footnote] will lead you to a footnote. The syntax looks like:

{% highlight text %}
Clicking this number[^fn-sample_footnote]
{% endhighlight %}

Each footnote needs the `^fn-` prefix and a unique ID to be referenced for the footnoted content. The syntax for that list looks something like this:

{% highlight text %}
[^fn-sample_footnote]: Handy! Now click the return link to go back.
{% endhighlight %}

You can place the footnoted content wherever you like. Markdown parsers should properly place it at the bottom of the post.

## Heading

Vivamus sagittis lacus vel augue rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Code

Inline code is available with the `<code>` element. Snippets of multiple lines of code are supported through [rouge](https://github.com/jneen/rouge). Longer lines will automatically scroll horizontally when needed.

{% highlight js %}
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
{% endhighlight %}

You may also optionally show code snippets with line numbers. Add `linenos` to the rouge tags.

{% highlight js linenos %}
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
{% endhighlight %}

Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.

### Gists via GitHub Pages

Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui.

{% gist 13f94b734a4ddb132735 gist.md %}

Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper.

### Lists

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

* Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
* Donec id elit non mi porta gravida at eget metus.
* Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1. Vestibulum id ligula porta felis euismod semper.
2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3. Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.

<dl>
  <dt>HyperText Markup Language (HTML)</dt>
  <dd>The language used to describe and define the content of a Web page</dd>

  <dt>Cascading Style Sheets (CSS)</dt>
  <dd>Used to describe the appearance of Web content</dd>

  <dt>JavaScript (JS)</dt>
  <dd>The programming language used to build advanced Web sites and applications</dd>
</dl>

Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.

### Images

Quisque consequat sapien eget quam rhoncus, sit amet laoreet diam tempus. Aliquam aliquam metus erat, a pulvinar turpis suscipit at.

![placeholder](http://placehold.it/800x400 "Large example image")
![placeholder](http://placehold.it/400x200 "Medium example image")
![placeholder](http://placehold.it/200x200 "Small example image")

### Tables

Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Upvotes</th>
      <th>Downvotes</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>Totals</td>
      <td>21</td>
      <td>23</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>10</td>
      <td>11</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>4</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Charlie</td>
      <td>7</td>
      <td>9</td>
    </tr>
  </tbody>
</table>

Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo.

-----

Want to see something else added? <a href="https://github.com/nicoelayda/celeste/issues/new">Open an issue.</a>

[^fn-sample_footnote]: Handy! Now click the return link to go back.
-->