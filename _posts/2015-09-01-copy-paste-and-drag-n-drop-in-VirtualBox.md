---
layout: post
title: VirtualBox Copy/Paste & Drag 'n' Drop
description: How to enable Drag 'n' Drop & Copy/Paste between guest OS & Linux host
post_description: How to enable Drag 'n' Drop & Copy/Paste between guest OS & Linux host.
categories: ["Workflow"]
---

You are working with VirtualBox and you want to share clipboard and files between your guest machine and your Linux host?

It's easy...

_Or not?_

First of all I want to say that I am using VirtualBox 5.0.2 and a Xubuntu 15.04 image, so any problems I have might be a version fault.

**Note:** Before doing anything, take a snapshot of your machine.

### Installing the Guest Additions

In order to enable any interaction between the host and the machine and vise versa we need to install the Guest Additions.

1. Run `sudo apt-get update`
2. Run `sudo apt-get upgrade`
3. Run `sudo apt-get install dkms`
4. Make some coffee or tea.
5. Drink it while browsing the internet!
6. When the installation ends run `sudo reboot`.
7. Go to Devices > Insert Guest Additions CD Image
8. From the opened File Manager copy the path.
9. Open your console and write `cd /path-you-copied/`.
10. Run `sudo sh ./VBoxLinuxAdditions.run`
11. Run `sudo reboot`

### Enable communication between Host and Guest

1. Go to your VirtualBox Manager select your machine and click settings.
2. From the first selection General, select the Advanced tab and select Bidirectional to Shared Clipboard and Drag 'n' Drop.
3. Restart your machine.

### Create a shared folder

For my configuration drag 'n' drop didn't work in any folder and raised an error which suspended my machine. So I created a shared folder and used this to share any files I wanted.

1. Go to your VirtualBox Manager select your machine and click settings.
2. Select `Shared Folders` and add the folder you want to share between the host and the guest.
3. Check Auto-mount and Make permanent.
4. Log off and on again.

### Give your user privileges

In order to give your user access to any shared folder run

`sudo adduser yourusername vboxsf`

Log off and on again. Your shared folders will be in `/media/`

---

If I find a anything for the drag 'n' drop part I will make another post or add the solution here. If anyone has a valid solution for this feel free to comment!
