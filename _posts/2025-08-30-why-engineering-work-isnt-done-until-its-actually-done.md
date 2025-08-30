---
layout: post
title: "Why Engineering Work Isn't Done Until It's Actually Done"
description: I can picture myself in a team meeting or a 1:1, bringing this up - and yes, I’m spoiling the article a bit - "Asking someone to review your work isn’t a favor. It’s part of the job. It’s literally in their job description".
categories: ["Software", "Collaboration", "Culture"]
---

I can picture myself in a team meeting or a 1:1, bringing this up - and yes, I’m spoiling the article a bit - "Asking someone to review your work isn’t a favor. It’s part of the job. It’s literally in their job description".

If I had a dollar for every apologetic follow-up I’ve read (or written myself) that starts with "Sorry to bother you… 😅" and asks for something be be unblocked, well, let’s not exaggerate. I wouldn’t be rich, but I’d be in a better financial state.

Sure, it has to do with everyone’s confidence and experience, and the environment and culture. But there’s also something broken in how we think about our work.

Our industry has a tendency to celebrate lone - but productive - wolves, the superstars, the sole engineer who stayed up until 2 a.m. to deliver a "mission critical" feature. Sounds good, but in practice, we’ve tried that before, and it didn’t work the way we hoped. We just produced burned-out people. Rich, maybe, but burned-out. Modern software development is collaborative, and it should be.

Asking for a PR review a second time? That’s not nagging, that’s about making sure of quality and also ownership. And just to be clear if there’s one thing to keep from this piece, it’s that the work doesn’t end when you move your task to the “Merged” column. It ends when it’s in production, and making sure everything works in production too.

## When Politeness (or Confidence) Becomes Self-Sabotage

Why do engineers find the collaborative parts of their job challenging, especially when they need to ask for something to be done?

First, it’s human nature. Most of us find it difficult to be "that person" who asks three times for a review, the next iteration of a design, or specs that never came with a ticket. We don't want to stop people doing their "more important" work. And let’s not forget about introverts!

But there’s something deeper. Many engineers, especially early in their careers, see their work as done when they move a ticket from "Started" to "Review." Usually, a senior engineer or manager will step in, but too often, no one explains that we all contribute to the team’s success, not just with code.

I’ve seen projects delayed because hesitation accumulated over time. Nobody got hurt, and the company didn’t fail, but it’s a shame to lose a milestone after hard work, just because someone didn’t follow up.

## What "Done" Actually Means (Spoiler: It’s Not What You Might Think)

Let’s be honest. Engineering or implementation work is usually only 50–60% of the total effort. When you click "Create PR" and add reviewers, the work isn’t done. It’s really just a draft waiting for review, either code-wise or as an end-to-end experience.

There could be one minor comment, a major issue, or even a complete misinterpretation of the specs that needs rewriting that can get the team off of their plans by significant time. It all depends on the case.

So yes, our work isn’t done when we create the PR. It’s done when it’s in production, and the system hasn’t crashed. I once had a very experienced engineer on my team who, with every release, would open a new tab to check, “Did we bring down the app? Nope. So far so good.” After all these years, that habit still sticks and I still crack a smile every once in a while when thinking about it.

But back to following up on work that isn’t visible. Let’s call our engineer Anna. She got specs for a new feature, estimated her work, implemented it, and wrote solid tests. She moved her ticket to “Review” after self-testing and creating a PR, and added a reviewer. The next day, she mentioned in standup that she’d start the next ticket while waiting for feedback.

Her PR sat untouched for five days because she only mentioned it once. When she finally followed up, the reviewer was busy with something urgent. Between UI changes and code revisions, the feature took an extra week and a half. Yes, Anna did amazing work, and yes, someone else could have raised their hand earlier, but the milestone failed simply because she didn’t follow up.

## The Professional Follow-Up Playbook

Here’s the good news: this is a learnable skill. The secret is replacing apologetic uncertainty with confident ownership.

Timing matters, but not the usual way. For normal reviews, 24–48 hours is reasonable. For blockers, same day follow up is expected without being aggressive. Critical issues? Most of the team should already be on top of it.

Context is everything. Compare these approaches:

- “Hey, can you please review my PR when you have some time?” (ambiguous, easy to ignore, priority unclear, it will most probably be at the bottom of the tasks)
- “@specificmembersoftheteam Could you please review the payment integration in PR #847 by Thursday? It’s needed for the client demo we discussed.” (specific, deadline-driven, business context)

One gets lost in the noise. The other gets action.

**Make it stupidly easy for reviewers.** Write PR descriptions explaining not just what changed, but why. Add self-review comments highlighting areas where you want specific feedback. Include screenshots for UI changes. Provide context. Your reviewer probably has multiple PRs to handle - like you probably do - so removing ambiguity about urgency is crucial.

Follow up, especially if it’s a repeat request: "I need a review on PR #847 by EOD Friday to hit our sprint commitments. Can someone take a look, or should I find another reviewer?" This isn’t confrontational, it's trying to figure out a solution.

Stop apologizing for doing your job. Replace "Sorry to bother you again…" with "Following up on…" You’re not bothering anyone. Treat this like any other impediment in delivering your work. Because it is.

## Building a Culture That Actually Works

Now, if for some reason you ended up on the leadership side, then this is for you. Many things can go wrong, but leadership sets the tone. Encourage the team to remember that success is a group effort, not individual heroism.

It can start in a 1:1 by setting expectations about accountability and ownership. In standups, a simple question like "Who will handle the review?" or a gentle nudge to prioritize reviews can create healthy habits over time.

If I’m working with a team and notice a lot of WIP in the review column, I explicitly ask them to prioritize it for the day rather than jumping into new work. It works, but you need to understand the board and the remaining tasks.

Processes and habits matter too. Set guidelines like time limits for reviews or limits on how many tickets can be reviewed at once. Leadership must model responsiveness, urge collaboration, and create safety so people aren’t afraid to remove impediments and own their work.

## The Real Work

Finishing the code is the the first part. More work comes afterward, the follow-ups, the reviews, the small nudges that make sure what you built actually reaches production. Done is not a task moving across a board. It is the moment when your code quietly works for real people, without anyone needing to check if it broke.

Engineering is rarely a solo act. It is more like a relay, where every handoff matters, and those nudges are just part of keeping the baton moving. When the team finds that rhythm, the process feels almost invisible, but when it is missing, you notice immediately. That is the subtle work that makes engineering truly done, not just finished.
