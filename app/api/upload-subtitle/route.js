import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const audioFile = formData.get('audio');
  const subtitle = formData.get('subtitle');
  const videoId = formData.get('video_id');
  const language = formData.get('language');
  const startTime = parseFloat(formData.get('start_time'));
  const endTime = parseFloat(formData.get('end_time'));
  const sequence = parseInt(formData.get('sequence'), 10);

  // 检查所需字段
  if (!audioFile || !subtitle || !videoId || !language || isNaN(startTime) || isNaN(endTime) || isNaN(sequence)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 将音频文件保存到 Cloudflare R2 或其他存储（此部分代码视具体情况而定）
  // const audioUrl = await saveAudioFile(audioFile);

  // 连接到 Cloudflare D1 数据库
  const db = globalThis.env.MASLUZ_D1;

  // 插入字幕数据到数据库
  try {
    const query = `
      INSERT INTO subtitles (video_id, language, sequence, start_time, end_time, text)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.prepare(query).bind(videoId, language, sequence, startTime, endTime, subtitle).run();

    return NextResponse.json({ message: 'Subtitle uploaded successfully!' });
  } catch (error) {
    console.error('Error inserting subtitle:', error);
    return NextResponse.json({ error: 'Failed to upload subtitle' }, { status: 500 });
  }
}
