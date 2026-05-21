export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code } = req.body;
  const VALID_CODE = 'Hcb2026cj!';

  if (code === VALID_CODE) {
    return res.status(200).json({ ok: true });
  } else {
    return res.status(401).json({ ok: false, message: '인증 코드가 올바르지 않습니다.' });
  }
}