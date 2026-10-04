import fs from 'node:fs';
const base='productions/nhung-phat-minh-thay-doi-the-gioi';
const failures=[
  {
    "id": "I090",
    "error": "image generation failed: http 429 Too Many Requests: Some(\"{\\\"error\\\":{\\\"type\\\":\\\"usage_limit_reached\\\",\\\"message\\\":\\\"The usage limit has been reached\\\",\\\"plan_type\\\":\\\"plus\\\",\\\"resets_at\\\":1791105869,\\\"eligible_promo\\\":null,\\\"limit_window_minutes\\\":null,\\\"resets_in_seconds\\\":12006}}\")",
    "observedAt": "2026-10-04T06:04:22.725Z"
  },
  {
    "id": "I091",
    "error": "image generation failed: http 429 Too Many Requests: Some(\"{\\\"error\\\":{\\\"type\\\":\\\"usage_limit_reached\\\",\\\"message\\\":\\\"The usage limit has been reached\\\",\\\"plan_type\\\":\\\"plus\\\",\\\"resets_at\\\":1791105870,\\\"eligible_promo\\\":null,\\\"limit_window_minutes\\\":null,\\\"resets_in_seconds\\\":12006}}\")",
    "observedAt": "2026-10-04T06:04:23.458Z"
  },
  {
    "id": "I092",
    "error": "image generation failed: http 429 Too Many Requests: Some(\"{\\\"error\\\":{\\\"type\\\":\\\"usage_limit_reached\\\",\\\"message\\\":\\\"The usage limit has been reached\\\",\\\"plan_type\\\":\\\"plus\\\",\\\"resets_at\\\":1791105870,\\\"eligible_promo\\\":null,\\\"limit_window_minutes\\\":null,\\\"resets_in_seconds\\\":12005}}\")",
    "observedAt": "2026-10-04T06:04:24.203Z"
  },
  {
    "id": "I093",
    "error": "image generation failed: http 429 Too Many Requests: Some(\"{\\\"error\\\":{\\\"type\\\":\\\"usage_limit_reached\\\",\\\"message\\\":\\\"The usage limit has been reached\\\",\\\"plan_type\\\":\\\"plus\\\",\\\"resets_at\\\":1791105870,\\\"eligible_promo\\\":null,\\\"limit_window_minutes\\\":null,\\\"resets_in_seconds\\\":12004}}\")",
    "observedAt": "2026-10-04T06:04:25.102Z"
  }
];
const path=base+'/manifest.json',job=JSON.parse(fs.readFileSync(path,'utf8'));
const retryAfter='2026-10-04T09:24:30.000Z';
job.blockers=[{stage:'images',type:'usage_limit_reached',httpStatus:429,reason:'Built-in image generation quota reached; 89 images saved, 271 remain. First pending I090.',observedAt:failures[0].observedAt,retryAfter,retryAfterLocal:'2026-10-04 16:24:30 Asia/Ho_Chi_Minh',failedSceneIds:failures.map(f=>f.id),errors:failures}];
job.stages.images.scopeStatus='blocked';
job.deliverableStatus={documents:'complete',storyboard:'complete',images:'blocked',generatedImages:89,remainingImages:271,firstPendingScene:'I090',visualReview:'skipped-at-user-request',audio:'not-requested',video:'not-requested'};
fs.writeFileSync(path,JSON.stringify(job,null,2)+'\n');
fs.appendFileSync(base+'/generation_log.jsonl',JSON.stringify({event:'generation-blocked',at:new Date().toISOString(),generated:89,pending:271,firstPending:'I090',retryAfter,failures})+'\n');
console.log(JSON.stringify({generated:89,pending:271,firstPending:'I090',retryAfter}));

