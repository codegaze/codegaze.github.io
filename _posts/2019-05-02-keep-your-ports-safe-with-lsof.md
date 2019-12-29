---
layout: post
title: Checking your open ports with lsof
description: Checking your open ports with lsof, while doing some development work or not.
post_description: While doing some development work or not.
categories: Workflow
---

Ok, some terminal stuff today. 💻

Have you ever thought about all these servers, databases, and other services we run in our machines and how vulnerable we become to malicious attacks?

Let me give you a simple example, I use the `vue-cli` to create and manage vue applications. Once you create an application, by default vue-cli exposes the port `8081` to everyone inside your network.

This means that everyone can visit `http://myinternalip:8081` and see my application and do whatever he or she wants. I'm not saying that this is the cli's fault. I should be able to configure my application to listen only to my machine's request.

We are not going to cover here how to prevent this kind of situation but how we can see which of our processes are listening to every request.

## How to check our open ports

Well, `lsof` FTW, which is a command that `lists open files`. In Unix systems this means "everything".

A colleague of mine sent me this which gives a list of ports that listen to requests:

```lsof -i -P -n | grep LISTEN```

Which translates to:
{% highlight html %}
lsof -i // List all the connections
-P // show the port numbers (not names)
-n // Don't give me hostnames (IPs only)
| grep LISTEN // Find ports that are awaiting connections.
{% endhighlight %}

In our vue cli example you would see something like that:

{% highlight html %}
node      69218 thanos   24u  IPv4 0x89e5844963379b35      0t0  TCP *:8081
{% endhighlight %}

When you see `*:port` means open to everyone. Everything else that has `127.0.0.1` or `[::1]` before the port will be listening only to local requests.

Here is another example with two Python simple servers. Based on our previous examples, one is open to everyone and one only in the local machine.

<figure>
  <a href="/public/terminal.png"><img src="/public/terminal.png" border="0"></a>
</figure>

So, try to remember to bind your services to `127.0.0.1`! :)

Bonus: Check this well written and quick [article](https://danielmiessler.com/study/lsof/) about lsof.
