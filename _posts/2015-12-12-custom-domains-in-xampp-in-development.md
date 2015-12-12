---
layout: post
title: Create custom domains for development in XAMPP
keywords: servers, domains, development, xampp, codegaze
description: Create custom domains for development in XAMPP. It's easy.
post_description: It's easy.
keywords: XAMPP,APACHE,DEVELOPMENT
---

If you are developing sites the you 've come to a place where you are furstrated with constantly having to change things when you move to production such as changing urls to get the thing work. 

We spent three hours of our lives with a friend of mine to reconfigure a Wordpress site from a XAMPP server to production server. Another example I can think of is the Laravel's public folder, I don't want to go to ```localhost/site/public``` each time, a mywebsite.com would be fine.

The best thing you could do is configure your local setup as your production server. To do this we need to edit our hosts file and our httpd-vhosts.conf file.


## Hosts File

Just go to your ```C:\Windows\System32\drivers\etc```, edit(as administrator) your hosts file and add your preffered domain. For this example I used ```yourdomain.io```. Remember, my driver is 'C:\', yours might be something else. 

When you do this open your command and type ```ipconfig /flushdns``` to flush your local dns settings.

{% highlight html %}

# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
# 127.0.0.1       localhost
# ::1             localhost
127.0.0.1      yourdomain.io

{% endhighlight %}

By doing this you can access any site in your local development by using yourdomain.io/site but this isn't enough. We must configure something in our apache server to be more specific.

## httpd-vhosts.conf File

Navigate to 'your XAMPP install folder\apache\conf\extra\', for me is 'C:\xampp\apache\conf\extra\' and edit your ```httpd-vhosts.conf``` file. Just copy/paste one of the example in this file and use the ones you want. Remember to uncomment each line by removing the '##' before the line and we are set to go!

{% highlight html %}
# Virtual Hosts
#
# Required modules: mod_log_config

# If you want to maintain multiple domains/hostnames on your
# machine you can setup VirtualHost containers for them. Most configurations
# use only name-based virtual hosts so the server doesn't need to worry about
# IP addresses. This is indicated by the asterisks in the directives below.
#
# Please see the documentation at 
# <URL:http://httpd.apache.org/docs/2.4/vhosts/>
# for further details before you try to setup virtual hosts.
#
# You may use the command line option '-S' to verify your virtual host
# configuration.

#
# Use name-based virtual hosting.
#
##NameVirtualHost *:80
#
# VirtualHost example:
# Almost any Apache directive may go into a VirtualHost container.
# The first VirtualHost section is used for all requests that do not
# match a ##ServerName or ##ServerAlias in any <VirtualHost> block.
#
##<VirtualHost *:80>
    ##ServerAdmin webmaster@dummy-host.example.com
    ##DocumentRoot "C:/xampp/htdocs/dummy-host.example.com"
    ##ServerName dummy-host.example.com
    ##ServerAlias www.dummy-host.example.com
    ##ErrorLog "logs/dummy-host.example.com-error.log"
    ##CustomLog "logs/dummy-host.example.com-access.log" common
##</VirtualHost>

##<VirtualHost *:80>
    ##ServerAdmin webmaster@dummy-host2.example.com
    ##DocumentRoot "C:/xampp/htdocs/dummy-host2.example.com"
    ##ServerName dummy-host2.example.com
    ##ErrorLog "logs/dummy-host2.example.com-error.log"
    ##CustomLog "logs/dummy-host2.example.com-access.log" common
##</VirtualHost>

<VirtualHost *:80>
    ServerAdmin something@yourdomain.io
    DocumentRoot "C:/xampp/htdocs/yoursite"
    ServerName yourdomain.io
    ServerAlias www.yourdomain.io
</VirtualHost>


{% endhighlight %}


Just in case start and stop your apache service. Next thing you got to do is navigate to your url by typing www.yourdomain.io in your browser.


<div class="happy-hour">

  <ul>
    <li>Drink: Wine</li>
    <li>Music: <a href="https://www.youtube.com/watch?v=EyiiwNHAC8M" target="_blank">Kurt Vile - Full Performance (Live on KEXP 10/19/2015)</a></li>
  </ul>
</div>

