# rdpjs
node-rdpjs fork with NLA authentication by Mesh Central(https://github.com/Ylianst/MeshCentral)

----
## Example of bitmap.
```
bitmap:  {
  destTop: 576,
  destLeft: 512,
  destBottom: 599,
  destRight: 575,
  width: 64,
  height: 24,
  bitsPerPixel: 32,
  isCompress: 1,
  data: <Buffer 10 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 f2 11 03 ... 1032 more bytes>
}
```

-----
## node-rdpjs issue
```
ubuntu@traqez-ubuntu-agentserver-1:~/services/versionmgmt$ node test.js 
[node-rdpjs] INFO:      screen 800x600
[node-rdpjs] INFO:      english keyboard layout
[node-rdpjs] INFO:      connect to 168.62.61.20:3389
[node-rdpjs] ERROR:     NODE_RDP_PROTOCOL_X224_NEG_FAILURE()
Error
    at new ProtocolError (/home/ubuntu/services/versionmgmt/node_modules/node-rdpjs/lib/core/error.js:40:8)
    at Client.recvConnectionConfirm (/home/ubuntu/services/versionmgmt/node_modules/node-rdpjs/lib/protocol/x224.js:221:9)
    at TPKT.<anonymous> (/home/ubuntu/services/versionmgmt/node_modules/node-rdpjs/lib/protocol/x224.js:202:8)
    at Object.onceWrapper (node:events:642:26)
    at TPKT.emit (node:events:527:28)
    at TPKT.recvData (/home/ubuntu/services/versionmgmt/node_modules/node-rdpjs/lib/protocol/tpkt.js:110:7)
    at BufferLayer.<anonymous> (/home/ubuntu/services/versionmgmt/node_modules/node-rdpjs/lib/protocol/tpkt.js:101:8)
    at Object.onceWrapper (node:events:642:26)
    at BufferLayer.emit (node:events:527:28)
    at BufferLayer.recv (/home/ubuntu/services/versionmgmt/node_modules/node-rdpjs/lib/core/layer.js:92:8)
```
In order to fix the above issue we need to disable NLA authentication which is not recommended. 

A fork of node-rdp which is `node-rdpjs2` at: https://github.com/Siyer2/node-rdpjs also throws the same error. However node-rdpjs even though nla authentication is enabled, is not working or probably taking too long to connect.

**Error:** by `node-rdpjs-2`,
```
ubuntu@traqez-ubuntu-agentserver-1:~/services/node-rdpjs$ node test.js 
{"name":"node-rdpjs","hostname":"traqez-ubuntu-agentserver-1","pid":77093,"level":40,"msg":"NODE_RDP_PROTOCOL_X224_NEG_FAILURE(Failure code:5 (see https://msdn.microsoft.com/en-us/library/cc240507.aspx))\nError: Failure code:5 (see https://msdn.microsoft.com/en-us/library/cc240507.aspx)\n    at new ProtocolError (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/core/error.js:40:8)\n    at Client.recvConnectionConfirm (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/x224.js:221:9)\n    at TPKT.<anonymous> (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/x224.js:202:8)\n    at Object.onceWrapper (node:events:642:26)\n    at TPKT.emit (node:events:527:28)\n    at TPKT.recvData (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/tpkt.js:110:7)\n    at BufferLayer.<anonymous> (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/tpkt.js:101:8)\n    at Object.onceWrapper (node:events:642:26)\n    at BufferLayer.emit (node:events:527:28)\n    at BufferLayer.recv (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/core/layer.js:91:8)","time":"2023-07-07T03:37:18.225Z","v":0}
error:  ProtocolError: Failure code:5 (see https://msdn.microsoft.com/en-us/library/cc240507.aspx)
    at new ProtocolError (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/core/error.js:40:8)
    at Client.recvConnectionConfirm (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/x224.js:221:9)
    at TPKT.<anonymous> (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/x224.js:202:8)
    at Object.onceWrapper (node:events:642:26)
    at TPKT.emit (node:events:527:28)
    at TPKT.recvData (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/tpkt.js:110:7)
    at BufferLayer.<anonymous> (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/protocol/tpkt.js:101:8)
    at Object.onceWrapper (node:events:642:26)
    at BufferLayer.emit (node:events:527:28)
    at BufferLayer.recv (/home/ubuntu/services/node-rdpjs/node_modules/node-rdpjs-2/lib/core/layer.js:91:8) {
  code: 'NODE_RDP_PROTOCOL_X224_NEG_FAILURE'
}
```

To disable NLA authentication, run:
```
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v UserAuthentication /t REG_DWORD /d 0 /f
```
------
## Refer: 
- https://github.com/citronneur/node-rdpjs/issues/22#issuecomment-308664156
- https://github.com/citronneur/node-rdpjs/issues/22
- https://github.com/citronneur/node-rdpjs/issues/47
- https://github.com/Siyer2/node-rdpjs
- https://github.com/citronneur/node-rdpjs
- https://github.com/Ylianst/MeshCentral



