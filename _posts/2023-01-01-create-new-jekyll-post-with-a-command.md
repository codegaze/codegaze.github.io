---
layout: post
title: Create a New Jekyll Post with a Simple Shell Command
description: If you are lazy like me you need something to automate a new post for Jekyll
categories: ["Jekyll", "Coding"]
---

Let's build a shell command to automate the creation of a new post in Jekyll.

This will be a short one.

Jekyll has its quirks, and I always wondered why they don't have a simple command to create a new post. I used to copy/paste the previous one, but you know how things are... If you can automate something boring in a few minutes, just do it.

## Creating the Script
We first need to create a simple bash script to do the job for us.

So, create a new file. I call mine `newjekyllpost.sh` and add the following parts to it:

```bash
#!/bin/bash
filename=`date +%Y-%m-%d-new-post.md`

cat > $filename <<EOF
---
layout: post
title: A title
description: A description
categories: ["tag"]
social_image: add here
---
EOF
```

Let's rubberduck this.

The second line is a variable called `filename`. This will be used for our file name with today's date and the following format:
```
YYYY-MM-DD-new-post.md #
```

The third line will create the file with the contents we like. I chose to add the YAML front matter with the most used content for my posts. If I don't want something, I remove it.

And that's it. Our script is that simple. Let's now try to execute it.

## Making the Script Executable

If you try to run it, you will get an error about permissions. There is one more step, which is to change the file's permissions.

```
chmod u+x ./newjekyllpost.sh
```

After that, running `./newjekyllpost.sh` will create a file in the specific folder with our contents.

## Adding an Alias

Let's do one more last thing to make our lives easier.

Right now, we have our script in a specific folder, so we need to write the path each time, which is also boring. Adding an alias for the script will work like magic.

Move the script to any path you want. I keep a `scripts` folder inside my `Users` folder.

Open the profile your shell is using. I'm using ZSH, so I have this line in my `.zshrc` file:

```
alias njp="~/scripts/newjekyllpost.sh"
```

Every time I run `njp` in a folder, the script creates a new file. You can choose any alias you want, of course.

Run `source pathoftheprofilefile` to reload the new changes, and we are done.

## Improving the Script

As I was writing this, I though there is one more thing we could do to improve the script. If there are argguments to the script use them to postfix the filename.

So our first part of the script becomes:

```
if [ $# -gt 0 ]
then
  filename=`date +%Y-%m-%d-`
  filename+=`echo "$@" | sed -e 's/ /-/g'`.md
else
  filename=`date +%Y-%m-%d-new-post.md`
fi
```

In the "bash" language what that means is:

If I have arguments add the date in the filename. Then join with a space all the arguments as string with `"$@"` and then replace the spaces with `-` which is done by the `sed` part.

If I have no arguments, business as usual.

If we run `njp this is my new post` at 2022-12-30 the file will be create will have the following name:

```
2022-12-30-this-is-my-new-post.md
```

Just remember, all of this can be achieved with any language. The logic is the same. I just chose to do it in a bash script because, why not?
