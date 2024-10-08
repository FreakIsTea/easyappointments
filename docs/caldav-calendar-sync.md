# CalDAV Calendar Sync

This page will guide you through the local configuration of Baikal, an Open Source DAV server that can be used to test
the CalDAV integration of Foppen Visitors.

> Note: This guide refers to the available Docker development configuration using docker-compose.yml

## Initial Setup

By default, Baikal is configured to run on localhost:9000, so it can be accessed by opening the browser to this address.

The first time the app is executed, it will display a small initial-configuration form that has to be submitted for
Baikal to work.

### First Configuration Page

- The right time zone value needs to be selected for synchronization to match the information Foppen Visitors sends.
- The "WebDAV authentication type" needs to be set to "Basic"
- The default username is "admin", so the password for this development account could also be "admin" or something
  similar (easy to remember)

### Second Configuration Page

- The default values can be submitted unless MySQL use is preferred (although totally optional).

### Test User

After the configuration is completed and Baikal works go to the "Users and resources" page and create a test user that
will be used to sync with.

## Enabling Sync

After making sure that the local Baikal server works, Foppen Visitors will be able to connect to it and sync the
appointment data.

Baikal supports multiple user accounts, but for simplicity this guide will refer to the default account created during
the initial setup.

### Credentials

While trying to enable the CalDAV sync from the Foppen Visitors calendar page, use the following credentials after
clicking on "Enable Sync" > "CalDAV".

- URL: http://localhost:9000/dav.php
- Username: <from-previous-step>
- Password: <from-previous-step>

*This document applies to Foppen Visitors v1.4.3.*

[Back](readme.md)
