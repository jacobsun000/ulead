'use client';
import { useEffect, useState } from 'react';
export default function SyncStatus() {
  const [state,setState] = useState(null);
  useEffect(() => {
    let cancelled=false;
    const load=async () => {
      try { const r=await fetch('/api/admin/sync/'); if(!r.ok) throw new Error(); const rows=await r.json(); if(!cancelled) setState(rows); }
      catch { if(!cancelled) setState([]); }
    };
    load(); const interval=setInterval(load,60000);
    return () => {cancelled=true;clearInterval(interval);};
  },[]);
  return <div className="w-11/12 max-w-6xl mb-6 rounded bg-white p-4">
    <h2 className="font-bold">中美同步状态</h2>
    <p className="text-sm">每 10 分钟同步。美国页面缓存最多再延迟 5 分钟。</p>
    {state === null ? <p>加载中…</p> : state.length === 0 ? <p>尚无同步记录，或暂时无法读取状态。</p> : state.map(row => <p key={row.name} className="text-sm">
      {{'public-content':'官网内容',inquiries:'美国咨询',worker:'同步任务'}[row.name] || row.name}：{row.last_error ? '同步失败，等待重试' : row.last_success ? new Date(row.last_success).toLocaleString('zh-CN') : '尚未同步'}
    </p>)}
  </div>;
}
