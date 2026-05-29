const belts=['White Belt','Yellow Stripe','Yellow Belt','Green Stripe','Green Belt','Blue Stripe','Blue Belt','Red Stripe','Red Belt','Black Belt'];
const el=id=>document.getElementById(id);
Promise.all([
  fetch('data/students.json').then(r=>r.json()),
  fetch('data/payments.json').then(r=>r.json()),
  fetch('data/schedule.json').then(r=>r.json()),
  fetch('data/poomsae.json').then(r=>r.json())
]).then(([students,payments,schedule,poomsae])=>{
  el('studentCount').textContent=students.length;
  const ready=students.filter(s=>s.attended>=15||s.score>85).length;
  el('readyCount').textContent=ready;
  const bal=payments.filter(p=>p.status!=='Paid').reduce((a,b)=>a+b.amount,0);
  el('balanceTotal').textContent='RWF '+bal.toLocaleString();
  el('beltRoadmap').innerHTML=belts.map((b,i)=>`<div class='belt-step ${i===1?'active':''}'><div class='strap'></div><b>${b}</b><span>Lessons • Poomsae • Approval</span></div>`).join('');
  el('studentCards').innerHTML=students.map(s=>`<div class='student-card'><div class='student-top'><div><h4>${s.name}</h4><div class='muted'>${s.belt} → ${s.nextBelt}</div></div><div class='readiness' style='--score:${s.score}%' data-score='${s.score}%'></div></div><div class='meter'><i style='width:${s.score}%'></i></div><small>${s.attended}/${s.required} lessons • ${s.poomsae}/${s.poomsaeRequired} poomsae</small></div>`).join('');
  const lead=students[0];
  el('passport').innerHTML=`<div class='passport-cover'><img src='assets/logo.svg'><h3>${lead.name}</h3><p>${lead.belt}</p><p>ID ${lead.id}</p><p>Next: ${lead.nextBelt}</p><p>${lead.required-lead.attended} lessons remaining</p></div>`;
  el('attendanceBoard').innerHTML=students.map((s,i)=>`<div class='att-row'><span>${s.name}</span><span>${s.attended}/${s.required}</span><span class='status ${i%3===0?'present':i%3===1?'late':'absent'}'>${i%3===0?'Present':i%3===1?'Late':'Absent'}</span></div>`).join('');
  el('paymentBoard').innerHTML=payments.map(p=>`<div class='att-row'><span>${p.item}<br><small>${p.student}</small></span><span>RWF ${p.amount.toLocaleString()}</span><span class='status ${p.status==='Paid'?'present':p.status==='Pending'?'late':'absent'}'>${p.status}</span></div>`).join('');
  el('scheduleBoard').innerHTML=schedule.slice(0,12).map(c=>`<div class='slot ${c.type}'><b>${c.label}</b><div>${c.day}</div><div>${c.time}</div><small>${c.coach}</small></div>`).join('');
  el('poomsaeLibrary').innerHTML=poomsae.map(p=>`<div class='video'><div><b>${p.title}</b><p>${p.focus}</p></div><div class='play'>▶</div></div>`).join('');
  el('parentPhone').innerHTML=`<div class='phone-top'><span>Parent App</span><span>🥋</span></div><div class='phone-body'><div class='child-card'><h3>${lead.name}</h3><p>${lead.belt}</p><p>${lead.attended}/${lead.required} lessons completed</p></div><div class='momo-card'><small>Outstanding Balance</small><b>RWF ${bal.toLocaleString()}</b><div class='mtn'>Pay with MTN MoMo</div></div><div class='phone-nav'><div class='nav-active'>Home</div><div>Schedule</div><div>Progress</div><div>Pay</div></div></div>`;
}).catch(err=>{
  document.body.insertAdjacentHTML('beforeend',`<pre style="color:white;background:#111;padding:16px">App failed to load: ${err.message}</pre>`);
});
