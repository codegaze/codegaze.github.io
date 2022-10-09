---
layout: post
title: Chaos Engineering For Humans
description: Can we apply Chaos Engineering principles to teams?
categories: Leadership
social_image: ChaosEngineeringForHumans.png
---

If you came here about Chaos Engineering for your services, “it’s not what it looks like”.

## Chaos Engineering
You might think I just said it’s not about Chaos Engineering, but I’m about to give some kind of definition of Chaos Engineering. Yes, I am.

Our products have become, or maybe better say, have progressed to be, a sum of multiple services and not a monolith service that tries to do everything. Core application, auth service, user service, payments service, prospects service. Name your service here.

The whole system should be resilient.

Unit and end-to-end testing should be in place for each service, but these are done in a predictable way. What I mean by “predictable way” is that we provide a specific input and expect a specific output. And this is what we test.

Don’t get me wrong, this is a great state. But what would be the next step?

Here is where Chaos Engineering comes in. The essence is that you create a situation for your whole system, for example, latency or absence of a service. You observe what happens, and then you prioritize improvements.

This helps increase confidence, have a more predictable system and protect customers from a total failure of your system if your 10th service down the road underperforms.

## Getting Closer to A Point
What is a team? A group of individuals that work together have an input (a goal), a throughput (their work, processes etc.) and an output (results).

A team is a system.

When all parts work, we have great results. When something is wrong with a part of the system, then the whole system starts to show signs of latency.

Do you see where I’m going with this?

## Teams as Systems
This all began when I started thinking of what would happen if someone from my team left tomorrow or a new team was created, and we had to do an internal restructuring? What would happen if a manager had a sabbatical? What if someone was on medical leave for two weeks?

Would that absence block the team? What could we do to remove some uncertainty? Can we get some ideas from Chaos Engineering and apply them to a team?

The idea is to find a way to observe when limitations arise in a team and understand where we can optimize.

Here are some simple metrics you can have, but of course, it varies based on each organization:
* Can the team groom a feature?
* Can the team deploy a feature?
* If specialization is missing, can the team find a way to bypass that?
* Are the initial milestones on track?
* Is team morale high?
* What are the main areas the team struggled with?
* Can the team self-organize and communicate with the stakeholders if leadership is absent?

## The Organic Way
There is an easy and organic way to observe and draw some conclusions without changing anything in your team.

Try to observe when someone has Paid Time Off or, for some reason, cannot contribute to the problem at hand. Is there sufficient documentation? Do you have a bus factor one? Having one person less, will reduce the capacity of a team, but is it in the danger zone?

Note down the observations, share them with the team and create action items.

## The More Creative Way
Create the circumstances that will create some “planned turbulence” for the team.

Once a quarter, throw all the team’s names in a randomizer, and the winner gets one or two weeks of having to work on a project they choose or join another team. During that time, they should not interact with the rest of the team.

There are no secrets or sketchy areas here. The team should know the goals and the metrics.

## Final Notes
Please remember that this is not a way to calculate individual impact, create mayhem or stress your team. It’s one more tool to create the circumstances for a team to observe and improve. Low impact initiatives might also be a good start.

Keep your team in the loop if you want to try this out. If they don’t feel comfortable, abort.

I would consider this suitable for an environment with a great culture. You need safety and team maturity. This is a next-level approach. You wouldn’t try Chaos Engineering for your system if you didn’t have a good system in place first, would you?

And one last thing, in case this wasn’t clear. You can apply this to any kind of team, not just Engineering teams.

Happy experimenting!
