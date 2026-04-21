import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home() {
  const [msg, setMsg] = useState("");
  const [target, setTarget] = useState("匿名訪客");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ig')) setTarget(params.get('ig'));
  }, []);

  const send = async () => {
    if(!msg) return alert("請輸入留言內容");
    const { error } = await supabase.from('messages').insert([
      { content: msg, ig_username: target, device_info: navigator.userAgent }
    ]);
    if (!error) { alert("留言已匿名送出！"); setMsg(""); }
    else { alert("送出失敗，請檢查資料庫設定"); }
  };

  return (
    <div style={{ backgroundColor: '#fff5f7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff4d94', marginBottom: '5px' }}>匿名留言板</h2>
        <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>給管理員的一句話 (匿名傳送)</p>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="在此輸入留言..." style={{ width: '100%', height: '120px', border: '1px solid #f0f0f0', borderRadius: '15px', padding: '15px', fontSize: '16px', outline: 'none', backgroundColor: '#fafafa' }} />
        <button onClick={send} style={{ width: '100%', background: '#ff4d94', color: '#fff', border: 'none', padding: '15px', borderRadius: '30px', marginTop: '20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>發送留言</button>
      </div>
    </div>
  );
}
