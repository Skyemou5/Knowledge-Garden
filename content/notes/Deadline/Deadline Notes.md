

---
title: "Deadline Notes"
tags: [houdini, rendering]
---

# Deadline

render farm manager

machine => tc-render1



# repository
- a separate machine
- stores configuration
- sends files to other machines


https://www.youtube.com/watch?v=v083eMXSwXw
https://timvanhelsdingen.com/vfx-folderstructure/

$JOB is important for using the render farm

make deadline work with a different houdini version

custom deadline entry for houdini
houdini plugin and env vars on each machine


---
- Render farm
	- Amazon account
	- Update deadline
	- https://docs.thinkboxsoftware.com/products/deadline/10.1/1_User%20Manual/manual/app-houdini.html#app-houdini-integrated-submission-script-label
		- Houdini integrated submission script setup
		- HQueue??
		- https://www.awsthinkbox.com/blog/common-render-farm-errors common errors
		- how to start workers??
		- startup machines if they are off??
		- Hserver?
		- update blender
		- set up client machines for job submission
		- ACES color management
		- local houdini env file needs deadline path
		- Any way to remote in from linux?
		
```
HOUDINI_MENU_PATH = "$HOUDINI_MENU_PATH;c:/Users/<user>/AppData/Deadline10/submitters/HoudiniSubmitter;&"
```

https://www.youtube.com/watch?v=v083eMXSwXw


---

! Apparently nothing should have changed licensing-wise if we have floating licenses?

! Push for redshift !

---
## Upgrading The Farm

https://www.awsthinkbox.com/blog/deadline-auto-upgrade-system



---

https://www.youtube.com/watch?v=v083eMXSwXw

IT Tasks
- [x] install Houdini 18.5 on TC-render
- [x] update blender on all machines
- [x] ACES on all machines
- [x] Fusion/Davinci resolve installed
- [ ] Houdini env file entry for deadline plugin



https://forums.thinkboxsoftware.com/t/houdini-17-support/24131 



- tried to remote start worker and got this error   

A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. 161.28.108.139:53041

---

# Important things to explain to teachers

- Deadline will help with VFX and simulations
- We can use Deadline with Harmony

---

# Server items

- How to install to all machines
- How to uninstall to all machines
- How to add/remove files to all machines
- How to edit files across all machines
- How to change env vars on all machines

---
Sccm configuration manager


- ! Renderman licenses? 


---

https://www.sidefx.com/forum/topic/78777/

Rend3r! database password

pbRg79t4ZeHx secret password -> user = admin

@NO1pN3s
https://youtu.be/KkfQOSX8wd4

---

```
  

The configured Client Certificate ('C:\DeadlineDatabase10\certs\Deadline10Client.pfx') does not exist.

at Deadline.Configuration.RepositoryConnectionSettings.d(a dgj, String dgk, String dgl, X509Certificate2& dgm)

at Deadline.Configuration.RepositoryConnectionSettings.b(X509Certificate2& dgh)

at Deadline.StorageDB.RepositoryConnect.RepositoryStorageManager.ConnectToRepository(RepositoryConnectionSettings connSettings, Boolean skipVersionCheck, DataControllerUpdateClient updateClient, HttpClient httpClient)

at Deadline.Controllers.DataController.ConnectToRepository(RepositoryConnectionSettings connectionSettings)

at Deadline.Controllers.DataController.SetupConnectionSettings(RepositoryConnectionSettings connSettings)

at Deadline.Controllers.DataController.Initialize(RepositoryConnectionSettings connSettings)

at Deadline.Controllers.DataController..ctor(RepositoryConnectionSettings connSettings)

at Deadline.Applications.DeadlineApplicationManager.CreateDataController(RepositoryConnectionSettings connSettings)

at Deadline.Applications.DeadlineApplicationManager.Connect(RepositoryConnectionSettings connSettings, Boolean updateScriptManager)

at Deadline.Monitor.MonitorManager.Connect(RepositoryConnectionSettings connectionSettings, Boolean updateScriptManager)
```