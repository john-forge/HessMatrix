import json, datetime, re, sys

ORDER = ["remember-1","remember-2","remember-3","remember-4",
         "understand-1","understand-2","understand-3","understand-4",
         "apply-1","apply-2","apply-3","apply-4",
         "analyze-1","analyze-2","analyze-3","analyze-4",
         "evaluate-1","evaluate-2","evaluate-3","evaluate-4",
         "create-1","create-2","create-3","create-4"]
EXPECT_NULL = {"remember-2","remember-3","remember-4","evaluate-1","evaluate-2"}

# load new
NEW = {}
for f in ["_new_c.json","_new_c2.json","_new_c3.json"]:
    NEW.update(json.load(open(f)))
print("new total:", len(NEW))

# validate
errs=[]
for code,m in NEW.items():
    cells=m["cells"]
    if set(cells.keys())!=set(ORDER): errs.append(f"{code}: bad cell keys")
    for k,v in cells.items():
        if k in EXPECT_NULL:
            if v is not None: errs.append(f"{code}.{k}: should be null")
            continue
        if m["subject"]=="ela" and k=="create-1":
            continue
        if v is None: errs.append(f"{code}.{k}: unexpected null")
        else:
            for fld in ["objective","observableCheck","sampleTask","materials"]:
                if fld not in v or not v[fld]: errs.append(f"{code}.{k}: missing {fld}")
            if not isinstance(v["materials"],list) or not v["materials"]:
                errs.append(f"{code}.{k}: materials not nonempty list")
    blob=json.dumps(m,ensure_ascii=False)
    if "—" in blob or "—" in blob: errs.append(f"{code}: em-dash present")
if errs:
    print("VALIDATION ERRORS:"); print("\n".join(errs)); sys.exit(1)
print("validation OK")

# load data store, ensure no overwrite of existing
data=json.load(open("standards_hess_data.json"))
overlap=set(NEW)&set(data["byStandard"])
if overlap: print("WARN overlap, skipping existing:",overlap)
added=0
for code,m in NEW.items():
    if code in data["byStandard"]: continue
    data["byStandard"][code]=m; added+=1

data["_meta"]["totalCompleted"]=len(data["byStandard"])
data["_meta"]["lastUpdated"]=datetime.datetime.now(datetime.timezone.utc).isoformat()
json.dump(data,open("standards_hess_data.json","w"),indent=2,ensure_ascii=False)
print("added:",added,"totalCompleted:",data["_meta"]["totalCompleted"])

# update HTML script block - targeted replacement of that script tag's inner JSON only
html=open("forge_app.html").read()
START_TAG='<script id="forge-standards-hess-data" type="application/json">'
si=html.index(START_TAG)
inner_start=si+len(START_TAG)
inner_end=html.index('</script>',inner_start)
new_inner=json.dumps(data,ensure_ascii=False)
new_html=html[:inner_start]+new_inner+html[inner_end:]
# sanity: only the inner region changed
assert new_html[:inner_start]==html[:inner_start]
assert new_html[inner_start+len(new_inner):]==html[inner_end:]
open("forge_app.html","w").write(new_html)
print("HTML updated; new inner len:",len(new_inner))

# verify both parse
d2=json.load(open("standards_hess_data.json"))
h=open("forge_app.html").read()
b=h.index(START_TAG)+len(START_TAG); e=h.index('</script>',b)
hd=json.loads(h[b:e])
print("verify data store count:",len(d2["byStandard"]))
print("verify html block count:",len(hd["byStandard"]))
print("match:", len(d2["byStandard"])==len(hd["byStandard"])==d2["_meta"]["totalCompleted"])
