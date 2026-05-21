export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code } = req.body;

  // 날짜 기준 인증 코드 자동 계산
  // 기준일: 2026-05-26 (c, j)
  // c → d → e → f → g 순 (하루마다 +1)
  // j → i → h → g → f 순 (하루마다 -1)
  const BASE_DATE = new Date('2026-05-26T00:00:00+09:00');
  const NOW       = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const DIFF      = Math.floor((NOW - BASE_DATE) / (1000 * 60 * 60 * 24));

  const C_BASE = 'c'.charCodeAt(0); // 99
  const J_BASE = 'j'.charCodeAt(0); // 106

  const c_char = String.fromCharCode(C_BASE + DIFF);  // c, d, e, f, g ...
  const j_char = String.fromCharCode(J_BASE - DIFF);  // j, i, h, g, f ...

  const VALID_CODE = `H${c_char}b2026${c_char}${j_char}!`;

  if (code === VALID_CODE) {
    return res.status(200).json({ ok: true });
  } else {
    return res.status(401).json({ ok: false, message: '인증 코드가 올바르지 않습니다.' });
  }
}