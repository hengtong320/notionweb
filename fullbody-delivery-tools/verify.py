"""Run the existing live interaction suite unchanged, with enough cache for its 19.5MB HTML.

Only the test harness changes. No application, anatomy, security policy or assertions
are modified. A dedicated DevTools session retains the document response bytes.
"""
from pathlib import Path
import subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
s=(ROOT/'fullbody-atlas-tools/verify.py').read_text()
needle=" if not LIVE:page.route('http**://**/*',lambda r:r.abort())"
assert s.count(needle)==1
replacement=""" if LIVE and BROWSER=='chromium':
  import base64
  capture=page.context.new_cdp_session(page)
  capture.send('Network.enable',{'maxTotalBufferSize':128*1024*1024,'maxResourceBufferSize':64*1024*1024})
  document_requests=[]
  capture.on('Network.responseReceived',lambda event:document_requests.append(event['requestId']) if event.get('type')=='Document' else None)
  report['documentVerification']='Dedicated CDP response cache, 64 MiB per document'
 def published_body():
  if BROWSER!='chromium':return response.body()
  if not document_requests:raise RuntimeError('No main document response captured')
  data=capture.send('Network.getResponseBody',{'requestId':document_requests[-1]})
  return base64.b64decode(data['body']) if data.get('base64Encoded') else data['body'].encode('utf-8')
 if not LIVE:page.route('http**://**/*',lambda r:r.abort())"""
s=s.replace(needle,replacement)
assert s.count('hashlib.sha256(response.body()).hexdigest()')==1
s=s.replace('hashlib.sha256(response.body()).hexdigest()','hashlib.sha256(published_body()).hexdigest()')
target=Path(__file__).with_name('generated-live-verify.py');target.write_text(s)
subprocess.run([sys.executable,str(target)],check=True)
