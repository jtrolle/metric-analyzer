
`yarn install`

`yarn start`

### Data sample
```
  {
    "files": 576,				# number of files
    "inodes": 7422,				# number of inodes
    "recv": 0,					# network > bytes received (bytes)
    "send": 0,					# network > bytes sended (bytes)
    "used": 261951488, 			# memory usage > used (bytes)
    "buff": 29339648,			# memory usage > buff (bytes)
    "cach": 84221952,			# memory usage > cach (bytes)
    "free": 16367108096,		# memory usage > free (bytes)
    "usr": 0.109, 				# total cpu usage > usr (percentage)
    "sys": 0.494,				# total cpu usage > sys (percentage)
    "idl": 99.358,				# total cpu usage > idl (percentage)
    "wai": 0.038,				# total cpu usage > wai (percentage)
    "hiq": 0,					# total cpu usage > hiq (percentage)
    "siq": 0.002,				# total cpu usage > siq (percentage)
    "time": "16-03 10:08:28",	# system time (DD-MM HH:MM:SS)
    "read": 40697.201,			# read bytes on disk
    "writ": 19128.464,			# write bytes on disk
    "1m": 0.02,					# load average > for last minute (percentage)
    "5m": 0.04,					# load average > for last 5 minutes (percentage)
    "15m": 0.05					# load average > for last 15 minutes (percentage)
  },
```